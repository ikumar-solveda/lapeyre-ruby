/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Stack, Button } from '@mui/material';
import { FC } from 'react';

type Props = {
	onCancel?: () => void;
	submitLabel: string;
	cancelLabel?: string;
	disableSubmit?: boolean;
};
export const CheckOutFormActionsFooter: FC<Props> = ({
	onCancel,
	submitLabel,
	cancelLabel,
	disableSubmit,
}) => (
	<Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
		{onCancel ? (
			<Button
				data-testid="form-cancel"
				id="form-cancel"
				variant="contained"
				onClick={onCancel}
				color="secondary"
			>
				{cancelLabel ? cancelLabel : null}
			</Button>
		) : null}
		<Button
			data-testid="form-save"
			id="form-save"
			color="primary"
			variant="contained"
			type="submit"
			disabled={disableSubmit}
		>
			{submitLabel}
		</Button>
	</Stack>
);
