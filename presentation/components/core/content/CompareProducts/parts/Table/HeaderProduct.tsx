/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CompareProductsTableThumbnail } from '@/components/content/CompareProducts/parts/Table/Thumbnail';
import { CompareProductsTablePrice } from '@/components/content/CompareProducts/parts/Table/Price';
import { compareProductsTableCloseButtonSX } from '@/components/content/CompareProducts/styles/Table/closeButton';
import { ProductType, ResponseProductType } from '@/data/types/Product';
import { compareProductsTableStackSX } from '@/components/content/CompareProducts/styles/Table/stack';
import { compareProductsTableNameSX } from '@/components/content/CompareProducts/styles/Table/name';
import { ContentContext } from '@/data/context/content';

type CompareProductsTableHeaderProductProps = {
	product: ProductType;
	imageSrc: ResponseProductType;
};

export const CompareProductsTableHeaderProduct: FC<CompareProductsTableHeaderProductProps> = ({
	product,
	imageSrc,
}) => {
	const { removeCompareProduct } = useContext(ContentContext) as {
		removeCompareProduct: (id: string) => void;
	};
	return product ? (
		<Stack sx={compareProductsTableStackSX} justifyContent="flex-start">
			<IconButton
				size="large"
				id={`product-compare-${product.partNumber?.toLowerCase()}-close-button`}
				data-testid={`product-compare-${product.partNumber?.toLowerCase()}-close-button`}
				sx={compareProductsTableCloseButtonSX}
				onClick={() => removeCompareProduct(product.id)}
			>
				<CloseIcon />
			</IconButton>
			{imageSrc ? (
				<CompareProductsTableThumbnail {...imageSrc} />
			) : (
				<CompareProductsTableThumbnail {...product} />
			)}
			<Typography sx={compareProductsTableNameSX}>{product.name}</Typography>
			<CompareProductsTablePrice {...{ product }} />
		</Stack>
	) : null;
};
