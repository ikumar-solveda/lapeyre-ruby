/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { checkOutChevronRightBoxSX } from '@/components/content/CheckOut/styles/chevronRightBox';
import { ChevronRight } from '@mui/icons-material';
import { Box } from '@mui/material';
import { FC } from 'react';

/** @deprecated */
export const CheckOutChevronRightBox: FC = () => (
	<Box display="inline-flex" alignItems="center" sx={checkOutChevronRightBoxSX}>
		<ChevronRight />
	</Box>
);
