/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { useProduct } from '@/data/Content/Product';
import { useLocalization } from '@/data/Localization';
import { useProductInfoState } from '@/data/state/useProductInfoState';
import { ProductAttribute, ProductType } from '@/data/types/Product';
import { getAttrsByIdentifier, mapProductDetailsData } from '@/data/utils/mapProductDetailsData';
import { isEmpty } from 'lodash';
import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';

const filterUniqueSkus = (allSkus: ProductType[], attributeState: Record<string, string>) => {
	const keys = Object.keys(attributeState);
	const skus = allSkus.filter((sku) => {
		const values = getAttrsByIdentifier(sku.definingAttributes);
		return keys.every((k) => attributeState[k] === values[k]);
	});
	return skus;
};

export const useAttributeFilter = (partNumber: string) => {
	const productDetailNLS = useLocalization('productDetail');
	const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
	const { product: inputCE } = useProduct({ id: partNumber });
	const { product: root } = useProduct({
		id: inputCE?.parentCatalogEntryID,
		isCEId: true,
		condition: inputCE?.type === 'item',
	});
	const { product } = useMemo(() => mapProductDetailsData(inputCE, root), [inputCE, root]);
	const {
		actions: { update },
	} = useProductInfoState();
	const [isActiveAttrId, setIsActiveAttrId] = useState<string>(EMPTY_STRING);

	const sortedItems = useMemo(
		() =>
			product?.items?.sort((a, b) =>
				a.partNumber.localeCompare(b.partNumber, 'en', { numeric: true })
			) ?? [],
		[product]
	);

	const clickAccordion =
		(attribute: ProductAttribute, isMobile: boolean) => (_event: MouseEvent) => {
			if (isMobile) {
				if (isActiveAttrId === attribute.identifier) {
					setIsActiveAttrId(EMPTY_STRING);
				} else {
					setIsActiveAttrId(attribute.identifier);
				}
			}
		};

	const onAttributeChange =
		(attributeIdentifier: string) => (event: ChangeEvent<HTMLInputElement>) => {
			const valueIdentifier = event.target.value;
			if (valueIdentifier !== productDetailNLS.any.t()) {
				selectedAttributes[attributeIdentifier] = valueIdentifier;
			} else {
				delete selectedAttributes[attributeIdentifier];
			}

			const empty = isEmpty(selectedAttributes);
			const skus = empty ? [...sortedItems] : filterUniqueSkus(sortedItems, selectedAttributes);
			const current = empty ? null : skus[0];

			update({ filteredSkus: skus, displayedProdOrSku: current });
			setSelectedAttributes(() => ({ ...selectedAttributes }));
		};

	return {
		product,
		isActiveAttrId,
		clickAccordion,
		onAttributeChange,
		selectedAttributes,
	};
};
