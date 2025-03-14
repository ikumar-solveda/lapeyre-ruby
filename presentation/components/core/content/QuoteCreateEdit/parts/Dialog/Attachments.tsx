/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024, 2025.
 */
import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { QuoteCreateEditFileUpload } from '@/components/content/QuoteCreateEdit/parts/FileUpload';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/utils/floatingPoint';
import { CloudUploadOutlined } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { useContext, useMemo, type FC } from 'react';

export const QuoteCreateEditDialogAttachments: FC = () => {
	const localization = useLocalization('Quotes');
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
			open={showFileUploadDialog}
			onClose={closeAndClearFileUploadDialog}
			title={
				<Stack direction="row" spacing={2} alignItems="center">
					<CloudUploadOutlined />
					<Typography variant="h6">{localization.UploadFile.t()}</Typography>
				</Stack>
			}
			content={<QuoteCreateEditFileUpload hint={localization.FileUploadSize.t()} />}
			actions={
				<OneClick
					id="upload-attachments-button"
					data-testid="upload-attachments-button"
					disabled={disabled}
					variant="contained"
					onClick={onUploadAttachments(quoteById?.id as string)}
				>
					{disabledStatus ? localization.Uploading.t() : localization.Upload.t()}
				</OneClick>
			}
		/>
	);
};
