/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { FooterGDPRDialogTabs } from '@/components/content/Footer/parts/GDPRDialog/Tabs';
import { useModalPrivacyPolicy } from '@/data/Content/ModalPrivacyPolicy';
import { ProcessedContent } from '@/data/types/Marketing';
import { PrivacyPolicy } from '@/data/types/PrivacyPolicy';
import { Dialog } from '@mui/material';
import { FC, MouseEvent, useCallback, useState } from 'react';

type Props = {
	data: ProcessedContent[] | undefined;
	onSubmit: ReturnType<typeof useModalPrivacyPolicy>['onSubmit'];
};

export const GDPRDialog: FC<Props> = ({ data, onSubmit: onSubmitPolicy }) => {
	const [openDialog, setOpenDialog] = useState<boolean>(true);

	const onSubmit = useCallback(
		(policy: PrivacyPolicy = {}) =>
			async (_event: MouseEvent<HTMLButtonElement>) => {
				await onSubmitPolicy(policy);
				setOpenDialog(false);
			},
		[onSubmitPolicy]
	);

	return (
		<Dialog open={openDialog} fullWidth>
			<FooterGDPRDialogTabs content={data} onSubmit={onSubmit} />
		</Dialog>
	);
};
