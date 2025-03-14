/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EmptyContent } from '@/components/blocks/EmptyContent';
import { OneClick } from '@/components/blocks/OneClick';
import { quoteCreateEditAvatarSX } from '@/components/content/QuoteCreateEdit/styles/avatar';
import { quoteCreateEditInputStack } from '@/components/content/QuoteCreateEdit/styles/inputStack';
import { quoteCreateEditTextDisplayPaperSX } from '@/components/content/QuoteCreateEdit/styles/textDisplayPaper';
import { quoteCreateEditTextSpacingSX } from '@/components/content/QuoteCreateEdit/styles/textSpacing';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import { DATE_TIME_FORMAT_OPTION } from '@/data/constants/dateTime';
import { MAX_LENGTH_COMMENTS_REQUESTS } from '@/data/constants/quotes';
import { ContentContext } from '@/data/context/content';
import { Comment } from '@/data/types/Quote';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Paper, Stack, TextField, Typography } from '@mui/material';
import { type FC, useContext } from 'react';

export const QuoteCreateEditComments: FC = () => {
	const nls = useLocalization('QuoteSections');
	const localization = useLocalization('Quotes');
	const nlsComments = useLocalization('QuoteComments');

	const {
		newComment,
		handleCommentChange: handleChange,
		commentsData: comments,
		onAddComment,
	} = useContext(ContentContext) as ReturnType<typeof useQuoteCreateEdit>;
	const formatter = useDateTimeFormat(DATE_TIME_FORMAT_OPTION);
	return (
		<Stack spacing={2}>
			<Typography variant="h6">{nls.Comments.t()}</Typography>
			<Paper sx={quoteCreateEditTextDisplayPaperSX}>
				{!comments?.count ? (
					<EmptyContent title={nlsComments.NoComments.t()} altId="quote-create-edit-comments-id" />
				) : (
					comments?.contents?.map((comment: Comment) => (
						<Stack direction="row" key={comment.id} sx={quoteCreateEditTextSpacingSX} spacing={1}>
							<Avatar sx={quoteCreateEditAvatarSX(comment.avatarColor)}>{comment.initials}</Avatar>
							<Stack>
								<Typography variant="body2">
									{comment.createdBy?.firstName} {comment.createdBy?.lastName}
								</Typography>
								<Typography variant="caption">
									{formatter.format(new Date(comment.createdAt as string))}
								</Typography>
								<Typography>{comment.comment}</Typography>
							</Stack>
						</Stack>
					))
				)}
			</Paper>
			<Stack {...quoteCreateEditInputStack}>
				<TextField
					margin="normal"
					fullWidth
					name="comment"
					value={newComment}
					placeholder={localization.LeaveComment.t()}
					onChange={handleChange}
					inputProps={{
						maxLength: MAX_LENGTH_COMMENTS_REQUESTS,
					}}
					id="quote-create-edit-comments-input"
					data-testid="quote-create-edit-comments-input"
				/>
				<OneClick
					color="primary"
					onClick={onAddComment}
					disabled={!newComment.trim()}
					wrapper="icon"
					id="quote-create-edit-comments-send-button"
					data-testid="quote-create-edit-comments-send-button"
				>
					<SendIcon fontSize="large" />
				</OneClick>
			</Stack>
		</Stack>
	);
};
