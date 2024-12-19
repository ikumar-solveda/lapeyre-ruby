/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { productDetailsQuantityInputSX } from '@/components/blocks/ProductDetails/styles/quantityInput';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const ProductDetailsQuantity: FC = () => {
	const localization = useLocalization('productDetail');
	const {
		selection: { quantity },
		onQuantity,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	return (
		<Stack spacing={1}>
			<Typography variant="body2">{localization.Quantity.t()}</Typography>
			<NumberInput
				onChange={onQuantity}
				value={quantity}
				min={1}
				sx={productDetailsQuantityInputSX(`${quantity}`.length)}
				showControls
				disallowEmptyOnBlur={true}
				data-testid="sku-quantity"
				id="sku-quantity"
			/>
		</Stack>
	);
};
