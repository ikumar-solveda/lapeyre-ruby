/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { InProgressOrdersDialogCopy } from '@/components/content/InProgressOrders/parts/Dialog/Copy';
import { InProgressOrdersDialogCreate } from '@/components/content/InProgressOrders/parts/Dialog/Create';
import { InProgressOrdersDialogRemove } from '@/components/content/InProgressOrders/parts/Dialog/Remove';
import { DIALOG_STATES } from '@/data/constants/inProgressOrders';
import { ContentContext } from '@/data/context/content';
import { InProgressOrdersContextValues } from '@/data/types/InProgressOrders';
import { Switch } from '@/utils/switch';
import { useContext, type FC } from 'react';

export const InProgressOrdersDialog: FC = () => {
	const { dialogState } = useContext(ContentContext) as InProgressOrdersContextValues;
	return Switch(dialogState)
		.case(DIALOG_STATES.CREATE, () => <InProgressOrdersDialogCreate />)
		.case(DIALOG_STATES.COPY, () => <InProgressOrdersDialogCopy />)
		.case(DIALOG_STATES.DELETE, () => <InProgressOrdersDialogRemove />)
		.defaultTo(() => null);
};
