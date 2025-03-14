/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024, 2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { VolumePriceDialogTable } from '@/components/content/VolumePriceDialog/parts/Table';
import { volumePriceDialogCloseButtonSX } from '@/components/content/VolumePriceDialog/styles/button';
import { useLocalization } from '@/data/Localization';
import { Button, Stack, Typography } from '@mui/material';
import type { FC } from 'react';

type Props = {
	open: boolean;
	onDialog: () => void;
	partNumber: string;
};

export const VolumePriceDialog: FC<Props> = ({ open, onDialog, partNumber }) => {
	const localization = useLocalization('VolumePricingDialog');

	return (
		<Dialog
			open={open}
			onClose={onDialog}
			title={localization.title.t()}
			content={
				<Stack spacing={2}>
					{partNumber ? (
						<Typography variant="overline">
							{localization.skuLabel.t({ value: partNumber })}
						</Typography>
					) : null}
					<VolumePriceDialogTable />
				</Stack>
			}
			actions={
				<Button variant="contained" sx={volumePriceDialogCloseButtonSX} onClick={onDialog}>
					{localization.close.t()}
				</Button>
			}
		/>
	);
};
