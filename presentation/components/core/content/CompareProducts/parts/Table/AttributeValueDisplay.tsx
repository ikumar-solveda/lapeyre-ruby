/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { ProductType, ResponseProductAttribute } from '@/data/types/Product';
import { Swatch } from '@/components/blocks/Swatch';
import { Stack, Typography } from '@mui/material';
import { ContentContext } from '@/data/context/content';

type CompareProductsTableAttributeValueDisplayProps = {
	attr: ResponseProductAttribute;
	product: ProductType;
};

export const CompareProductsTableAttributeValueDisplay: FC<
	CompareProductsTableAttributeValueDisplayProps
> = ({ attr, product }) => {
	const { attrValueDisplay, changeThumbnail } = useContext(ContentContext) as {
		attrValueDisplay: (attr: ResponseProductAttribute) => Record<string, string[]>;
		changeThumbnail: (product: ProductType, swatchId: string) => void;
	};
	const { imageValues, textValues } = attrValueDisplay(attr);

	return imageValues.length ? (
		<Stack direction="row" justifyContent="center" spacing={1}>
			{product.colorSwatches.map((v, i) => (
				<Swatch
					id={`product-compare-${product.partNumber?.toLowerCase()}-swatch-${v.value}`}
					data-testid={`product-compare-${product.partNumber?.toLowerCase()}-swatch-${v.value}`}
					sx={{ backgroundImage: `url("${v.image1path}")` }}
					key={`${v.identifier}_${i}`}
					onClick={() => changeThumbnail(product, v.id)}
				/>
			))}
		</Stack>
	) : (
		<>
			{textValues.map((v, i) => (
				<Typography key={i}>{v}</Typography>
			))}
		</>
	);
};
