/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { OneClick } from '@/components/blocks/OneClick';
import { QuoteCreateEditFileUpload } from '@/components/content/QuoteCreateEdit/parts/FileUpload';
import { quoteCreateEditDialogActionsSX } from '@/components/content/QuoteCreateEdit/styles/dialogActions';
import { quoteCreateEditDialogCloseIconSX } from '@/components/content/QuoteCreateEdit/styles/dialogCloseIcon';
import { quoteCreateEditDialogContentSX } from '@/components/content/QuoteCreateEdit/styles/dialogContent';
import { quoteCreateEditDialogPaperProps } from '@/components/content/QuoteCreateEdit/styles/dialogPaperProps';
import { quoteCreateEditDialogTitleSX } from '@/components/content/QuoteCreateEdit/styles/dialogTitle';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/utils/floatingPoint';
import { Close, CloudUploadOutlined } from '@mui/icons-material';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useMemo, type FC } from 'react';

export const QuoteCreateEditDialogAttachments: FC = () => {
	const localization = useLocalization('Quotes');
	const small = useMediaQuery(useTheme().breakpoints.down('md'));
	const {
		quoteById,
		dataFileStatus,
		showFileUploadDialog,
		closeAndClearFileUploadDialog,
		onUploadAttachments,
		file,
	} = useContext(ContentContext) as ReturnType<typeof useQuoteCreateEdit>;
	const disabledStatus = useMemo(() => {
		const status = dFix(dataFileStatus?.contents?.at(0)?.status ?? -1, 0);
		return status === 0 || status === 1;
	}, [dataFileStatus]);
	const disabled = useMemo(
		() => disabledStatus || !file.files || file.files.length === 0,
		[disabledStatus, file]
	);
	return (
		<Dialog
			disableEscapeKeyDown
			maxWidth="sm"
			fullWidth
			fullScreen={small}
			open={showFileUploadDialog}
			onClose={closeAndClearFileUploadDialog}
			PaperProps={quoteCreateEditDialogPaperProps}
		>
			<DialogTitle sx={quoteCreateEditDialogTitleSX}>
				<Stack gap={2} direction="row" justifyContent="space-between">
					<Stack direction="row" gap={1} alignItems="center">
						<CloudUploadOutlined />
						<Typography variant="h6">{localization.UploadFile.t()}</Typography>
					</Stack>
					<IconButton
						id="close-file-upload-dialog"
						data-testid="close-file-upload-dialog"
						onClick={closeAndClearFileUploadDialog}
						sx={quoteCreateEditDialogCloseIconSX}
						title={localization.CloseDialog.t()}
					>
						<Close />
					</IconButton>
				</Stack>
			</DialogTitle>

			<DialogContent dividers sx={quoteCreateEditDialogContentSX}>
				<QuoteCreateEditFileUpload hint={localization.FileUploadSize.t()} />
			</DialogContent>
			<DialogActions sx={quoteCreateEditDialogActionsSX({ singleButton: true })}>
				<OneClick
					id="upload-attachments-button"
					data-testid="upload-attachments-button"
					disabled={disabled}
					variant="contained"
					onClick={onUploadAttachments(quoteById?.id as string)}
				>
					{disabledStatus ? localization.Uploading.t() : localization.Upload.t()}
				</OneClick>
			</DialogActions>
		</Dialog>
	);
};
