/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { productCardCompareCheckboxSX } from '@/components/blocks/ProductCard/styles/compareCheckbox';
import { productCardCompareStackSX } from '@/components/blocks/ProductCard/styles/compareStack';
import { useCompareCollectorV2 } from '@/data/Content/CompareCollectorV2';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { ProductType } from '@/data/types/Product';
import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { ChangeEvent, FC, useCallback, useContext } from 'react';

type ProductCardCompareBoxProps = {
	product: ProductType;
};

export const ProductCardCompareBox: FC<ProductCardCompareBoxProps> = ({ product }) => {
	const { type, partNumber } = product;
	const { compareEnabled, compareState, onChange } = useContext(ContentContext) as ReturnType<
		typeof useCompareCollectorV2
	>;
	const localization = useLocalization('compare');
	const onCheck = useCallback(
		(product: ProductType) => (e: ChangeEvent<HTMLInputElement>) => onChange(e, product),
		[onChange]
	);

	return compareEnabled ? (
		<Stack
			sx={productCardCompareStackSX(type === 'product' || type === 'item' || type === 'variant')}
		>
			<FormControlLabel
				control={
					<Checkbox
						data-testid={`product-compare-${partNumber?.toLowerCase()}-checkbox`}
						id={`product-compare-${partNumber?.toLowerCase()}-checkbox`}
						disabled={!!(!compareState.checked[product.partNumber] && compareState.disabled)}
						checked={!!compareState.checked[product.partNumber]}
						onChange={onCheck(product)}
						sx={productCardCompareCheckboxSX}
					/>
				}
				label={<Typography variant="caption">{localization.compare.t()}</Typography>}
			/>
		</Stack>
	) : null;
};
