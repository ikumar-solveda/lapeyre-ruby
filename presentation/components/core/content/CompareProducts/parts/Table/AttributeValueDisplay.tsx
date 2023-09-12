/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { ResponseProductAttribute } from '@/data/types/Product';
import { Swatch } from '@/components/blocks/Swatch';
import { Stack, Typography } from '@mui/material';
import { ContentContext } from '@/data/context/content';
import { DataElement } from '@/components/content/CompareProducts/parts/Table';
import { CellContext } from '@tanstack/react-table';
import { useCompareProducts } from '@/data/Content/CompareProducts';

export const CompareProductsTableAttributeValueDisplay: FC<CellContext<DataElement, unknown>> = ({
	getValue,
	column: { id: columnId },
}) => {
	const attr = getValue() as ResponseProductAttribute;
	const { productsById, attrValueDisplay, changeThumbnail } = useContext(ContentContext) as Omit<
		ReturnType<typeof useCompareProducts>,
		'columns' | 'data' | 'productById' | 'prodWidths' | 'nProds'
	>;
	const product = productsById[columnId].product;
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
