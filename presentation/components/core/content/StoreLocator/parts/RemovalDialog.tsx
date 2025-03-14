/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024, 2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { storeLocatorRemovalDialogButtonSX } from '@/components/content/StoreLocator/styles/removalDialogButton';
import { useLocalization } from '@/data/Localization';
import { Button, Stack, Typography } from '@mui/material';
import { type FC } from 'react';

type Props = {
	open: boolean;
	onDialog: () => void;
};

export const StoreLocatorRemovalDialog: FC<Props> = ({ open, onDialog }) => {
	const nls = useLocalization('StoreLocator');

	return (
		<Dialog
			open={open}
			title={nls.removalDialog.title.t()}
			content={
				<Stack spacing={2}>
					<Typography>{nls.removalDialog.text.t()}</Typography>
				</Stack>
			}
			onClose={onDialog}
			actions={
				<Button variant="contained" sx={storeLocatorRemovalDialogButtonSX} onClick={onDialog}>
					{nls.removalDialog.close.t()}
				</Button>
			}
		/>
	);
};
