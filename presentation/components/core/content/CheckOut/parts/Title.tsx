/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { checkOutTitleButtonSX } from '@/components/content/CheckOut/styles/titleButton';
import { Box, Button, Typography } from '@mui/material';
import { FC, MouseEventHandler } from 'react';

type Props = {
	title: string;
	onClick?: MouseEventHandler<HTMLElement>;
};

export const CheckOutTitle: FC<Props> = ({ title, onClick }) =>
	onClick ? (
		<Button
			data-testid={`checkout-title-clickable-${title}`}
			id={`checkout-title-clickable-${title}`}
			variant="text"
			onClick={onClick}
			sx={checkOutTitleButtonSX}
		>
			<Typography variant="h4" component="p">
				{title}
			</Typography>
		</Button>
	) : (
		<Box display="flex" flexDirection="row" alignItems="center">
			<Typography variant="h4" component="p">
				{title}
			</Typography>
		</Box>
	);
