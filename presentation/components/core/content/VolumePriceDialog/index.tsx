/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { VolumePriceDialogTable } from '@/components/content/VolumePriceDialog/parts/Table';
import { volumePriceDialogCloseButtonSX } from '@/components/content/VolumePriceDialog/styles/button';
import { useLocalization } from '@/data/Localization';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';

type Props = {
	open: boolean;
	onDialog: () => void;
	partNumber: string;
};

export const VolumePriceDialog: FC<Props> = ({ open, onDialog, partNumber }) => {
	const localization = useLocalization('VolumePricingDialog');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Dialog disableEscapeKeyDown maxWidth="xs" fullWidth={isMobile} open={open} onClose={onDialog}>
			<DialogTitle>{localization.title.t()}</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					{partNumber ? (
						<Typography variant="overline">
							{localization.skuLabel.t({ value: partNumber })}
						</Typography>
					) : null}
					<VolumePriceDialogTable />
					<Button variant="contained" sx={volumePriceDialogCloseButtonSX} onClick={onDialog}>
						{localization.close.t()}
					</Button>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
