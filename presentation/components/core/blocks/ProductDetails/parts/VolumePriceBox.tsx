/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { productDetailsVolumePriceBoxSX } from '@/components/blocks/ProductDetails/styles/volumePriceBox';
import { productDetailsVolumePriceBoxStackSX } from '@/components/blocks/ProductDetails/styles/volumePriceBoxStack';
import { Box, BoxProps, Stack } from '@mui/material';
import { FC } from 'react';

type Props = BoxProps & {
	children: JSX.Element | JSX.Element[] | null;
	[key: string]: any;
};

export const ProductDetailsVolumePriceBox: FC<Props> = ({ children, ...props }) => (
	<Box sx={productDetailsVolumePriceBoxSX} {...props}>
		<Stack alignItems="center" justifyContent="center" sx={productDetailsVolumePriceBoxStackSX}>
			{children}
		</Stack>
	</Box>
);
