/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TypeIcon } from '@/components/blocks/TypeIcon';
import { quoteDetailsAttachmentsEachPaperProps } from '@/components/content/QuoteDetails/styles/attachmentsEachPaperProps';
import { State } from '@/data/constants/quotes';
import { useQuoteDetails } from '@/data/Content/QuoteDetails';
import { ContentContext } from '@/data/context/content';
import type { FileAttachment } from '@/data/types/Quote';
import { getFileSize } from '@/utils/getFileSize';
import { Delete } from '@mui/icons-material';
import { IconButton, Paper, Stack, Typography } from '@mui/material';
import { useContext, type FC } from 'react';

type Props = {
	attachment: FileAttachment;
};
export const QuoteDetailsAttachmentEach: FC<Props> = ({ attachment }) => {
	const { deleteAttachment, quoteById } = useContext(ContentContext) as ReturnType<
		typeof useQuoteDetails
	>;
	return (
		<Paper {...quoteDetailsAttachmentsEachPaperProps}>
			<Stack direction="row" justifyContent="space-between">
				<Stack direction="row" spacing={1} alignItems="center">
					<TypeIcon name={attachment.name as string} />
					<Stack>
						<Typography>{attachment.name}</Typography>
						<Typography>{getFileSize(attachment.size)}</Typography>
					</Stack>
				</Stack>
				{quoteById?.status === State.READY ? (
					<Stack>
						<IconButton onClick={deleteAttachment(attachment.id as number)} color="primary">
							<Delete />
						</IconButton>
					</Stack>
				) : null}
			</Stack>
		</Paper>
	);
};
