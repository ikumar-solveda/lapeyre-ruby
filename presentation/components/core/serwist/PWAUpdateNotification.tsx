/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { PWAUpdateContext } from '@/data/context/PWAUpdate';
import { useLocalization } from '@/data/Localization';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { useCallback, useContext } from 'react';

/**
 * Optional component to show a notification when a new version of the PWA is available.
 * This component should be used inside a PWAUpdateProvider.
 */
export const PWAUpdateNotification = () => {
	const { showNotification, confirm } = useContext(PWAUpdateContext);
	const updateNLS = useLocalization('PWAUpdate');
	const reload = useCallback(() => confirm(true), [confirm]);
	return (
		<Snackbar open={showNotification} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
			<SnackbarContent
				message={updateNLS.Message.t()}
				action={
					<Button variant="text" onClick={reload}>
						{updateNLS.Refresh.t()}
					</Button>
				}
			/>
		</Snackbar>
	);
};
