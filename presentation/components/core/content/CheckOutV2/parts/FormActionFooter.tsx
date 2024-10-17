/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Button, Stack } from '@mui/material';
import { FC } from 'react';

type Props = {
	onCancel?: () => void;
	submitLabel: string;
	cancelLabel?: string;
	disableSubmit?: boolean;
};
export const CheckOutV2FormActionsFooter: FC<Props> = ({
	onCancel,
	submitLabel,
	cancelLabel,
	disableSubmit,
}) => (
	<Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
		{onCancel ? (
			<Button
				data-testid="back-to-shipping-details"
				id="back-to-shipping-details"
				variant="contained"
				onClick={onCancel}
				color="secondary"
			>
				{cancelLabel ? cancelLabel : null}
			</Button>
		) : null}
		<Button
			data-testid="confirm-and-review-button"
			id="confirm-and-review-button"
			color="primary"
			variant="contained"
			type="submit"
			disabled={disableSubmit}
		>
			{submitLabel}
		</Button>
	</Stack>
);
