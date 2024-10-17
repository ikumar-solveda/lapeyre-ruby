/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DataElement } from '@/components/content/CompareProducts/parts/Table';
import { CompareProductsTablePrice } from '@/components/content/CompareProducts/parts/Table/Price';
import { CompareProductsTableThumbnail } from '@/components/content/CompareProducts/parts/Table/Thumbnail';
import { compareProductsTableCloseButtonSX } from '@/components/content/CompareProducts/styles/Table/closeButton';
import { compareProductsTableNameSX } from '@/components/content/CompareProducts/styles/Table/name';
import { compareProductsTableStackSX } from '@/components/content/CompareProducts/styles/Table/stack';
import { useCompareProductsV2 } from '@/data/Content/CompareProductsV2';
import { ContentContext } from '@/data/context/content';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, Typography } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { FC, useContext } from 'react';

export const CompareProductsTableHeaderProduct: FC<HeaderContext<DataElement, unknown>> = ({
	column,
}) => {
	const { id: partNumber } = column;
	const { productsByPartNumber, imageSrc, removeCompareProduct } = useContext(
		ContentContext
	) as Omit<ReturnType<typeof useCompareProductsV2>, 'columns' | 'data' | 'prodWidths' | 'nProds'>;
	const product = productsByPartNumber[partNumber].product;
	return product ? (
		<Stack sx={compareProductsTableStackSX} justifyContent="flex-start">
			<IconButton
				size="large"
				id={`product-compare-${product.partNumber?.toLowerCase()}-close-button`}
				data-testid={`product-compare-${product.partNumber?.toLowerCase()}-close-button`}
				sx={compareProductsTableCloseButtonSX}
				onClick={() => removeCompareProduct(partNumber)}
			>
				<CloseIcon />
			</IconButton>
			{imageSrc[partNumber] ? (
				<CompareProductsTableThumbnail {...imageSrc[partNumber]} />
			) : (
				<CompareProductsTableThumbnail {...product} />
			)}
			<Typography sx={compareProductsTableNameSX}>{product.name}</Typography>
			<CompareProductsTablePrice product={{ ...product }} />
		</Stack>
	) : null;
};
