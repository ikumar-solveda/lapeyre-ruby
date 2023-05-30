/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	OverlayCancelButtonSX,
	OverlayConfirmButtonSX,
	OverlaySX,
} from '@/components/blocks/ConfirmationOverlay/style';
import { Box, Button, Grid } from '@mui/material';
import { kebabCase } from 'lodash';
import { FC } from 'react';

type Props = {
	cancelLabel: string;
	confirmLabel: string;
	confirm: () => void;
	cancel: () => void;
	show: boolean;
};

export const ConfirmationOverlay: FC<Props> = ({
	show,
	confirm,
	cancel,
	confirmLabel,
	cancelLabel,
}) =>
	show ? (
		<Box sx={OverlaySX}>
			<Grid container justifyContent="flex-start" alignItems="flex-end" spacing={2} height="100%">
				<Grid item>
					<Button
						sx={OverlayConfirmButtonSX}
						data-testid={`${kebabCase(confirmLabel)}`}
						variant="outlined"
						fullWidth
						onClick={confirm}
					>
						{confirmLabel}
					</Button>
				</Grid>
				<Grid item>
					<Button
						sx={OverlayCancelButtonSX}
						data-testid={`${kebabCase(cancelLabel)}`}
						variant="outlined"
						fullWidth
						onClick={cancel as () => void}
					>
						{cancelLabel}
					</Button>
				</Grid>
			</Grid>
		</Box>
	) : null;
