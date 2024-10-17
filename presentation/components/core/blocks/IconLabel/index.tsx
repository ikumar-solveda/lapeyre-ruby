/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { iconSX } from '@/components/blocks/IconLabel/styles/icon';
import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { forwardRef, PropsWithRef } from 'react';

interface IconLabelProps {
	icon: JSX.Element;
	label: string | JSX.Element;
	sx?: SxProps<Theme>;
	labelSX?: SxProps<Theme>;
}

export const IconLabel = forwardRef<HTMLElement, PropsWithRef<IconLabelProps>>(
	({ icon, label, sx = {} }, ref) => (
		<Box display="flex" flexDirection="row" alignItems="center" flexWrap="wrap" ref={ref} sx={sx}>
			<Box pr={2}>
				<Box sx={iconSX}>{icon}</Box>
			</Box>
			<Box pr={2} py={1}>
				{label}
			</Box>
		</Box>
	)
);
