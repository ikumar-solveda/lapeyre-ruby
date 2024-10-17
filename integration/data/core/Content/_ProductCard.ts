/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import {
	BASE_ADD_2_CART_BODY,
	addToCartFetcherV2 as addToCartFetcher,
	useCartSWRKey,
} from '@/data/Content/Cart';
import { useCategory } from '@/data/Content/Category';
import { personMutatorKeyMatcher } from '@/data/Content/Login';
import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useLoginRedirectRequired } from '@/data/Content/_LoginRedirectRequired';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { productFetcher } from '@/data/Content/_Product';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ONE_QUANTITY } from '@/data/constants/saveForLaterList';
import { EventsContext } from '@/data/context/events';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ProductAttributeValue, ProductType } from '@/data/types/Product';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getContractIdParamFromContext } from '@/data/utils/getContractIdParamFromContext';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { getParentCategoryFromSlashPath } from '@/data/utils/getParentCategoryFromSlashPath';
import { expand, shrink } from '@/data/utils/keyUtil';
import { getAttrsByIdentifier, mapProductDetailsData } from '@/data/utils/mapProductDetailsData';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { MouseEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

const DATA_KEY = 'FullProductLookup';

const findSkuBySwatch = (
	root: ProductType | undefined,
	swatch: ProductAttributeValue | undefined
) => {
	const found =
		swatch && root
			? root.items?.find(({ attributes }) =>
					attributes.find(({ values }) => values.find(({ id }) => id === swatch.id))
			  )
			: undefined;
	return found;
};

export const useProductCard = (product: ProductType) => {
	const { onAddToCart: onAddToCartEvent } = useContext(EventsContext);
	const success = useLocalization('success-message');
	const router = useNextRouter();
	const { settings } = useSettings();
	const {
		langId,
		storeId,
		defaultCurrency: currency,
		defaultCatalogId: catalogId,
	} = getClientSideCommon(settings, router);
	const { user } = useUser();
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const isGenericUser = user?.isGeneric ?? false;
	const { loginStatus, redirectToLoginIfNeed: loginRequired } = useLoginRedirectRequired();
	const requestParams = useExtraRequestParameters();
	const [swatch, setSwatch] = useState<ProductAttributeValue>();
	const [root, setRoot] = useState<ProductType | undefined>(product.items ? product : undefined);
	const { ga4, ua } = useMemo(() => getGTMConfig(settings), [settings]);
	const { showSuccessMessage, notifyError } = useNotifications();
	const { category } = useCategory(
		ga4 || ua ? getParentCategoryFromSlashPath(product.parentCatalogGroupID) : ''
	);

	const { data } = useSWR(
		!root?.items && storeId && product.partNumber && (product.hasSingleSKU || swatch)
			? [
					shrink({
						storeId,
						currency,
						catalogId,
						langId,
						...getContractIdParamFromContext(user?.context),
						...getCurrencyParamFromContext(user?.context),
						partNumber: product.partNumber,
					}),
					DATA_KEY,
			  ]
			: null,
		async ([props]) => productFetcher(true)(expand(props), requestParams)
	);
	const sku = useMemo(() => {
		if (swatch) {
			return findSkuBySwatch(root, swatch);
		} else if (product.items) {
			const { selection } = mapProductDetailsData(product, undefined);
			return selection?.sku;
		}
	}, [product, root, swatch]);

	const onSwatch = useCallback(
		async (event: MouseEvent<HTMLElement>, _swatch: ProductAttributeValue) => {
			event.stopPropagation();
			setSwatch(_swatch);
		},
		[]
	);

	const onAddToCart = useCallback(
		(sku: ProductType) => async (event: MouseEvent<HTMLElement>) => {
			event.preventDefault();
			event.stopPropagation();
			if (await loginRequired()) {
				return;
			}
			const orderItem = [{ partNumber: sku.partNumber, quantity: ONE_QUANTITY }];
			const attrsByIdentifier = getAttrsByIdentifier(sku.attributes);
			const data = { ...BASE_ADD_2_CART_BODY, orderItem };
			try {
				await addToCartFetcher(isGenericUser)(settings.storeId, {}, data, requestParams);
				if (isGenericUser) {
					await mutate(personMutatorKeyMatcher(EMPTY_STRING)); // current page
					await mutate(personMutatorKeyMatcher(DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC), undefined);
				}
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
				await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined);
				showSuccessMessage(success.ITEM_TO_CART.t([sku.name ?? '']), true);
				onAddToCartEvent({
					gtm: {
						selection: { sku, quantity: 1, attrsByIdentifier, buyable: true },
						category,
						quantity: 1,
						orgName: '', // TODO: specify selected org-name
						orgId: '', // TODO: specify selected org
						storeName: settings.storeName,
						settings,
					},
				});
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			loginRequired,
			isGenericUser,
			settings,
			requestParams,
			currentCartSWRKey,
			showSuccessMessage,
			success,
			onAddToCartEvent,
			category,
			notifyError,
		]
	);

	useEffect(() => {
		// we will cache the parent product once it's fetched so ignore any null-ish responses
		if (data) {
			const parent = extractContentsArray(data)[0];
			setRoot(parent);
		}
	}, [data]);

	return { onSwatch, sku, onAddToCart, loginStatus };
};
