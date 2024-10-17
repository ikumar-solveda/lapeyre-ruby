/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Swatch } from '@/components/blocks/Swatch';
import { DataElement } from '@/components/content/CompareProducts/parts/Table';
import { useCompareProductsV2 } from '@/data/Content/CompareProductsV2';
import { ContentContext } from '@/data/context/content';
import { ResponseProductAttribute } from '@/data/types/Product';
import { Stack, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext } from 'react';

export const CompareProductsTableAttributeValueDisplay: FC<CellContext<DataElement, unknown>> = ({
	getValue,
	column: { id: partNumber },
}) => {
	const attr = getValue() as ResponseProductAttribute;
	const { productsByPartNumber, attrValueDisplay, changeThumbnail } = useContext(
		ContentContext
	) as Omit<ReturnType<typeof useCompareProductsV2>, 'columns' | 'data' | 'prodWidths' | 'nProds'>;
	const product = productsByPartNumber[partNumber].product;
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
