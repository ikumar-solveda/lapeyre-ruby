/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { productDetailsWebShareSX } from '@/components/blocks/ProductDetails/styles/webShare';
import { useWebShare } from '@/data/Content/WebShare';
import { useLocalization } from '@/data/Localization';
import { ProductType } from '@/data/types/Product';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import { IconButton } from '@mui/material';
import { useCallback } from 'react';

export const ProductDetailsWebShare = ({ sku }: { sku: ProductType }) => {
	const productDetailsNLS = useLocalization('productDetail');
	const { share, shareEnabled } = useWebShare();
	const onClick = useCallback(() => {
		share(sku);
	}, [sku, share]);

	return shareEnabled ? (
		<IconButton
			id="product-details-web-share"
			data-testid="product-details-web-share"
			onClick={onClick}
			sx={productDetailsWebShareSX}
			title={productDetailsNLS.WebShareTitle.t({ productName: sku.name })}
		>
			<IosShareOutlinedIcon />
		</IconButton>
	) : null;
};
