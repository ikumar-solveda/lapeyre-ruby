/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ExpectedDateDialogMessage } from '@/components/blocks/ExpectedDateDialog/parts/Message';
import { ExpectedDateDialogTitle } from '@/components/blocks/ExpectedDateDialog/parts/Title';
import {
	ConfirmationDialog,
	ConfirmationDialogText,
} from '@/components/content/ConfirmationDialog';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { ExpectedDateDialogContextValueType } from '@/data/types/ScheduleForLater';
import { type FC, useContext, useMemo } from 'react';

export const ExpectedDateDialog: FC = () => {
	const { onConfirm, onDialog } = useContext(ContentContext) as ExpectedDateDialogContextValueType;
	const localization = useLocalization('ExpectedDateDialog');
	const confirmationText = useMemo<ConfirmationDialogText>(
		() => ({
			title: <ExpectedDateDialogTitle />,
			message: <ExpectedDateDialogMessage />,
			ok: localization.Save.t(),
			cancel: localization.Cancel.t(),
		}),
		[localization]
	);

	return (
		<ConfirmationDialog
			open={true}
			onCancel={onDialog as () => Promise<unknown>}
			onConfirm={onConfirm}
			text={confirmationText}
		/>
	);
};
