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
import { compareProductsTableStackSX } from '@/components/content/CompareProducts/styles/Table/stack';
import { compareProductsTableNameSX } from '@/components/content/CompareProducts/styles/Table/name';
import { ContentContext } from '@/data/context/content';
import { DataElement } from '@/components/content/CompareProducts/parts/Table';
import { useCompareProducts } from '@/data/Content/CompareProducts';
import { HeaderContext } from '@tanstack/react-table';

export const CompareProductsTableHeaderProduct: FC<HeaderContext<DataElement, unknown>> = ({
	column,
}) => {
	const { id } = column;
	const { productsById, imageSrc, removeCompareProduct } = useContext(ContentContext) as Omit<
		ReturnType<typeof useCompareProducts>,
		'columns' | 'data' | 'productById' | 'prodWidths' | 'nProds'
	>;
	const product = productsById[id].product;
	return product ? (
		<Stack sx={compareProductsTableStackSX} justifyContent="flex-start">
			<IconButton
				size="large"
				id={`product-compare-${product.partNumber?.toLowerCase()}-close-button`}
				data-testid={`product-compare-${product.partNumber?.toLowerCase()}-close-button`}
				sx={compareProductsTableCloseButtonSX}
				onClick={() => removeCompareProduct(id)}
			>
				<CloseIcon />
			</IconButton>
			{imageSrc[id] ? (
				<CompareProductsTableThumbnail {...imageSrc[id]} />
			) : (
				<CompareProductsTableThumbnail {...product} />
			)}
			<Typography sx={compareProductsTableNameSX}>{product.name}</Typography>
			<CompareProductsTablePrice product={{ ...product }} />
		</Stack>
	) : null;
};
