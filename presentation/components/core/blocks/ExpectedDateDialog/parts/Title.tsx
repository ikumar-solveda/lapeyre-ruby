/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { ExpectedDateDialogContextValueType } from '@/data/types/ScheduleForLater';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Stack } from '@mui/material';
import { type FC, useContext } from 'react';

export const ExpectedDateDialogTitle: FC = () => {
	const localization = useLocalization('ExpectedDateDialog');
	const { isDialogForCart } = useContext(ContentContext) as ExpectedDateDialogContextValueType;
	return (
		<Stack direction="row" alignItems="center" gap={1}>
			{isDialogForCart ? <LocalShippingOutlinedIcon /> : <AccessTimeIcon />}
			{isDialogForCart ? localization.Edit.t() : localization.ScheduleForLater.t()}
		</Stack>
	);
};
