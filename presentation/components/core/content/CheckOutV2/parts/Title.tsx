/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { checkOutV2TitleButtonSX } from '@/components/content/CheckOutV2/styles/titleButton';
import { Box, Button, Typography } from '@mui/material';
import { FC, MouseEventHandler } from 'react';

type Props = {
	title: string;
	onClick?: MouseEventHandler<HTMLElement>;
};

export const CheckOutV2Title: FC<Props> = ({ title, onClick }) =>
	onClick ? (
		<Button
			data-testid={`checkout-title-clickable-${title}`}
			id={`checkout-title-clickable-${title}`}
			variant="text"
			onClick={onClick}
			sx={checkOutV2TitleButtonSX}
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
