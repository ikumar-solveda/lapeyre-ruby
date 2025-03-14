/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { AddToQuoteDialog } from '@/components/blocks/AddToQuoteDialog';
import { B2B } from '@/components/blocks/B2B';
import { PBCIfEnabled } from '@/components/blocks/PBCFlow';
import { PBC_RFQ } from '@/data/constants/pbc';
import { useAddToQuote } from '@/data/Content/AddToQuote';
import type { useBundleDetailsTable } from '@/data/Content/BundleDetailsTable';
import type { useProductDetails } from '@/data/Content/ProductDetails';
import type { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { isKitOrBundleType } from '@/utils/productIsA';
import { Button } from '@mui/material';
import { type FC, useContext, useMemo } from 'react';

type Props = {
	standalone?: boolean;
};

export const ProductDetailsAddToQuote: FC<Props> = ({ standalone = false }) => {
	const localization = useLocalization('productDetail');
	const detailsValue = useContext(ContentContext) as ReturnType<typeof useProductDetails> &
		ReturnType<typeof useBundleDetailsTable> &
		ReturnType<typeof useSkuListTable>;
	const { getSelectionPartNumbers } = detailsValue;
	const param = useMemo(() => getSelectionPartNumbers(), [getSelectionPartNumbers]);
	const addToQuoteValue = useAddToQuote();
	const { handleOpen, entitled } = addToQuoteValue;
	const { selection, product, loginStatus, isSkuListTableDisplayed } = detailsValue;
	const isKitOrBundle = isKitOrBundleType[product?.type as string];
	const sku = !isKitOrBundle ? selection?.sku : product;
	const buyable = !isKitOrBundle ? selection?.buyable : true;
	const { prices } = useMemo(() => getProductDisplayInfo(sku, product), [sku, product]);
	const otherDisabled = !buyable || !prices?.offer;
	const disabledButton = isSkuListTableDisplayed ? product?.items?.length === 0 : otherDisabled;
	const dtId = useMemo(
		() => `product-add-to-quote${standalone ? '-standalone' : ''}`,
		[standalone]
	);
	return loginStatus && entitled ? (
		<PBCIfEnabled name={PBC_RFQ}>
			<B2B>
				<Button
					data-testid={dtId}
					id={dtId}
					variant="outlined"
					onClick={handleOpen(param)}
					disabled={disabledButton}
				>
					{localization.addToQuote.t()}
				</Button>
				<ContentProvider value={addToQuoteValue}>
					<AddToQuoteDialog />
				</ContentProvider>
			</B2B>
		</PBCIfEnabled>
	) : null;
};
