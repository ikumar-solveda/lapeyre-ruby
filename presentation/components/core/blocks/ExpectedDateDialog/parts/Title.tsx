/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { ExpectedDateDialogContextValueType } from '@/data/types/ScheduleForLater';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Divider, IconButton, Stack, Typography } from '@mui/material';
import { type FC, useContext } from 'react';

export const ExpectedDateDialogTitle: FC = () => {
	const localization = useLocalization('ExpectedDateDialog');
	const { onDialog, isDialogForCart } = useContext(
		ContentContext
	) as ExpectedDateDialogContextValueType;
	return (
		<Stack spacing={1}>
			<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
				<Stack direction="row" alignItems="center" spacing={1}>
					{isDialogForCart ? <LocalShippingOutlinedIcon /> : <AccessTimeIcon />}
					<Typography variant="h6">
						{isDialogForCart ? localization.Edit.t() : localization.ScheduleForLater.t()}
					</Typography>
				</Stack>
				<IconButton edge="end" color="inherit" onClick={onDialog as any}>
					<CloseIcon />
				</IconButton>
			</Stack>
			<Divider />
		</Stack>
	);
};
