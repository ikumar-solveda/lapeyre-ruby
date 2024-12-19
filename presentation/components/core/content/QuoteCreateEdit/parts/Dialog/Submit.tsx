/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { quoteCreateEditDialogCloseIconSX } from '@/components/content/QuoteCreateEdit/styles/dialogCloseIcon';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Close, Error } from '@mui/icons-material';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, type FC } from 'react';

export const QuoteCreateEditDialogSubmit: FC = () => {
	const nls = useLocalization('Quotes');
	const actionNls = useLocalization('QuoteActions');
	const small = useMediaQuery(useTheme().breakpoints.down('md'));
	const { activeStep, showSubmitDialog, closeSubmitDialog, onSubmit } = useContext(
		ContentContext
	) as ReturnType<typeof useQuoteCreateEdit>;

	return (
		<Dialog
			disableEscapeKeyDown
			maxWidth="sm"
			fullWidth
			fullScreen={small}
			open={showSubmitDialog}
			onClose={closeSubmitDialog}
		>
			<DialogTitle>
				<Stack spacing={2}>
					<Stack direction="row" spacing={2}>
						<Error color="secondary" />
						<Typography variant="h6">{actionNls.Submit.t()}</Typography>
					</Stack>
					<Divider />
				</Stack>
			</DialogTitle>
			<DialogContent>
				<IconButton
					aria-label="close"
					onClick={closeSubmitDialog}
					sx={quoteCreateEditDialogCloseIconSX}
				>
					<Close />
				</IconButton>
				<Stack spacing={2}>
					<Typography>{nls.RFQSubmitMsg.t()}</Typography>
					{activeStep === 0 ? <Typography>{nls.RFQSubmitMsg2.t()} </Typography> : null}
					<Divider />
				</Stack>
			</DialogContent>
			<DialogActions>
				<OneClick color="secondary" variant="outlined" onClick={closeSubmitDialog}>
					{actionNls.Cancel.t()}
				</OneClick>
				<OneClick variant="contained" onClick={onSubmit}>
					{actionNls.Submit.t()}
				</OneClick>
			</DialogActions>
		</Dialog>
	);
};
