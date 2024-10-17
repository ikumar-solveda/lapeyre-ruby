/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2024.
 */

import { productDetailsBoxSX } from '@/components/blocks/ProductDetails/styles/box';
import { productDetailsBoxStackSX } from '@/components/blocks/ProductDetails/styles/boxStack';
import { productDetailsCheckIconSX } from '@/components/blocks/ProductDetails/styles/checkIcon';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, BoxProps, Stack } from '@mui/material';
import { FC } from 'react';

type Props = BoxProps & {
	isSelected?: boolean;
	children: JSX.Element | JSX.Element[] | null;
	[key: string]: any;
};

export const ProductDetailsInventoryBox: FC<Props> = ({
	isSelected = false,
	children,
	...props
}) => (
	<Box sx={productDetailsBoxSX(isSelected)} {...props}>
		{isSelected ? <CheckCircleIcon sx={productDetailsCheckIconSX} /> : null}
		<Stack alignItems="center" justifyContent="center" sx={productDetailsBoxStackSX}>
			{children}
		</Stack>
	</Box>
);
