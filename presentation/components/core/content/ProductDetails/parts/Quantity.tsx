/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { productDetailsQuantitySX } from '@/components/content/ProductDetails/styles/quantity';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
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
				sx={productDetailsQuantitySX}
				showControls
				disallowEmptyOnBlur={true}
			/>
		</Stack>
	);
};
