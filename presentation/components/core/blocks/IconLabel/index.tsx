/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { iconSX } from '@/components/blocks/IconLabel/styles/icon';
import { Box } from '@mui/material';
import { forwardRef, PropsWithRef } from 'react';

interface IconLabelProps {
	icon: JSX.Element;
	label: string | JSX.Element;
}

export const IconLabel = forwardRef<HTMLElement, PropsWithRef<IconLabelProps>>(
	({ icon, label }, ref) => (
		<Box display="flex" flexDirection="row" alignItems="center" flexWrap="wrap" ref={ref}>
			<Box pr={2}>
				<Box sx={iconSX}>{icon}</Box>
			</Box>
			<Box pr={2} py={1}>
				{label}
			</Box>
		</Box>
	)
);
