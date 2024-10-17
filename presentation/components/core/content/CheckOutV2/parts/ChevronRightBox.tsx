/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { checkOutV2ChevronRightBoxSX } from '@/components/content/CheckOutV2/styles/chevronRightBox';
import { ChevronRight } from '@mui/icons-material';
import { Box } from '@mui/material';
import { FC } from 'react';

export const CheckOutV2ChevronRightBox: FC = () => (
	<Box display="inline-flex" alignItems="center" sx={checkOutV2ChevronRightBoxSX}>
		<ChevronRight />
	</Box>
);
