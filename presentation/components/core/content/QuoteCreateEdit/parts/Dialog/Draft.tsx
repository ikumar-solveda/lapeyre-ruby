/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { OneClick } from '@/components/blocks/OneClick';
import { quoteCreateEditDialogCloseIconSX } from '@/components/content/QuoteCreateEdit/styles/dialogCloseIcon';
import { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
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

export const QuoteCreateEditDialogDraft: FC = () => {
	const nls = useLocalization('Quotes');
	const actionNls = useLocalization('QuoteActions');
	const small = useMediaQuery(useTheme().breakpoints.down('md'));
	const { activeStep, onDraft, showDraftDialog, closeDraftDialog, quoteById } = useContext(
		ContentContext
	) as ReturnType<typeof useQuoteCreateEdit>;

	return (
		<Dialog
			disableEscapeKeyDown
			maxWidth="sm"
			fullWidth
			fullScreen={small}
			open={showDraftDialog}
			onClose={closeDraftDialog}
		>
			<DialogTitle>
				<Stack spacing={2}>
					<Stack direction="row" spacing={2}>
						<Error color="secondary" />
						<Typography variant="h6">
							{activeStep === 0 && !quoteById ? actionNls.Draft.t() : actionNls.Save.t()}
						</Typography>
					</Stack>
					<Divider />
				</Stack>
			</DialogTitle>
			<DialogContent>
				<IconButton
					aria-label="close"
					onClick={closeDraftDialog}
					sx={quoteCreateEditDialogCloseIconSX}
				>
					<Close />
				</IconButton>
				<Stack spacing={2}>
					<Typography>{nls.DraftDialogMsg.t()}</Typography>
					{activeStep === 0 ? <Typography>{nls.DraftDialogMsg2.t()} </Typography> : null}
					<Divider />
				</Stack>
			</DialogContent>
			<DialogActions>
				<OneClick color="secondary" variant="outlined" onClick={closeDraftDialog}>
					{actionNls.Cancel.t()}
				</OneClick>
				<OneClick variant="contained" onClick={onDraft}>
					{actionNls.Save.t()}
				</OneClick>
			</DialogActions>
		</Dialog>
	);
};
