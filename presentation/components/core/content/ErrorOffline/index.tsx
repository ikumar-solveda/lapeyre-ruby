/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { buttonSX } from '@/components/content/ErrorOffline/styles/button';
import { errorOfflineContainerSX } from '@/components/content/ErrorOffline/styles/container';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { CloudOffOutlined } from '@mui/icons-material';
import { Button, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import { FC, useCallback } from 'react';

export const ErrorOffline: FC<{ id: ID }> = () => {
	const offlineNLS = useLocalization('ErrorOffline');
	const refresh = useCallback(() => window.location.reload(), []);
	const theme = useTheme();
	const { contentSpacing } = theme.dimensions;

	return (
		<Paper sx={errorOfflineContainerSX}>
			<Stack gap={contentSpacing} direction="row" alignItems="start">
				<IconButton color="primary">
					<CloudOffOutlined fontSize="large" />
				</IconButton>
				<Stack>
					<Typography variant="subtitle1">{offlineNLS.Title.t()}</Typography>
					<Typography component="div">{offlineNLS.Message.t()}</Typography>
					<Button variant="text" color="primary" onClick={refresh} sx={buttonSX}>
						{offlineNLS.Retry.t()}
					</Button>
				</Stack>
			</Stack>
		</Paper>
	);
};
