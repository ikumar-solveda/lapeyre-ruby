/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024, 2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Error } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { useContext, type FC } from 'react';

export const QuoteCreateEditDialogSubmit: FC = () => {
	const nls = useLocalization('Quotes');
	const actionNls = useLocalization('QuoteActions');
	const { showSubmitDialog, closeSubmitDialog, onSubmit } = useContext(
		ContentContext
	) as ReturnType<typeof useQuoteCreateEdit>;

	return (
		<Dialog
			open={showSubmitDialog}
			title={
				<Stack direction="row" spacing={2}>
					<Error color="secondary" />
					<Typography variant="h6">{actionNls.Submit.t()}</Typography>
				</Stack>
			}
			content={
				<Stack spacing={2}>
					<Typography>{nls.RFQSubmitMsg.t()}</Typography>
					<Typography>{nls.RFQSubmitMsg2.t()} </Typography>
				</Stack>
			}
			actions={
				<>
					<OneClick
						id="quote-create-edit-dialog-submit-cancel-button"
						data-testid="quote-create-edit-dialog-submit-cancel-button"
						color="secondary"
						variant="outlined"
						onClick={closeSubmitDialog}
					>
						{actionNls.Cancel.t()}
					</OneClick>
					<OneClick
						id="quote-create-edit-dialog-submit-submit-button"
						data-testid="quote-create-edit-dialog-submit-submit-button"
						variant="contained"
						onClick={onSubmit}
					>
						{actionNls.Submit.t()}
					</OneClick>
				</>
			}
			onClose={closeSubmitDialog}
		/>
	);
};
