/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { ProductType } from '@/data/types/Product';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { useCompareCollector } from '@/data/Content/CompareCollector';

type ProductCardCompareBoxProps = {
	product: ProductType;
};

export const ProductCardCompareBox: FC<ProductCardCompareBoxProps> = ({ product }) => {
	const { type, partNumber } = product;
	const { compareEnabled, compareState, onChange } = useContext(ContentContext) as ReturnType<
		typeof useCompareCollector
	>;
	const localization = useLocalization('compare');
	const visibility =
		type === 'product' || type === 'item' || type === 'variant' ? 'visible' : 'hidden';

	return compareEnabled ? (
		<Stack sx={{ visibility }}>
			<FormControlLabel
				control={
					<Checkbox
						data-testid={`product-compare-${partNumber?.toLowerCase()}-checkbox`}
						id={`product-compare-${partNumber?.toLowerCase()}-checkbox`}
						disabled={!!(!compareState.checked[product.id] && compareState.disabled)}
						checked={!!compareState.checked[product.id]}
						onChange={(e) => onChange(e, product)}
					/>
				}
				label={<Typography variant="caption">{localization.compare.t()}</Typography>}
			/>
		</Stack>
	) : null;
};
