/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EmptyContent } from '@/components/blocks/EmptyContent';
import { OneClick } from '@/components/blocks/OneClick';
import { QuoteDetailsAccordion } from '@/components/content/QuoteDetails/parts/Accordion';
import { quoteDetailsAvatarSX } from '@/components/content/QuoteDetails/styles/avatar';
import { quoteDetailsInputStack } from '@/components/content/QuoteDetails/styles/inputStack';
import { quoteDetailsTextDisplayPaperSX } from '@/components/content/QuoteDetails/styles/textDisplayPaper';
import { quoteDetailsTextSpacingSX } from '@/components/content/QuoteDetails/styles/textSpacing';
import { DATE_TIME_FORMAT_OPTION } from '@/data/constants/dateTime';
import { MAX_LENGTH_COMMENTS_REQUESTS, State } from '@/data/constants/quotes';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import type { useQuoteDetails } from '@/data/Content/QuoteDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Comment } from '@/data/types/Quote';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Paper, Stack, TextField, Typography } from '@mui/material';
import { useContext, type FC } from 'react';

export const QuoteDetailsComments: FC = () => {
	const nls = useLocalization('QuoteSections');
	const nls2 = useLocalization('Quotes');
	const nlsComments = useLocalization('QuoteComments');
	const {
		quoteById,
		commentsData: comments,
		onAddComment,
		newComment,
		handleCommentChange: handleChange,
	} = useContext(ContentContext) as ReturnType<typeof useQuoteDetails>;
	const formatter = useDateTimeFormat(DATE_TIME_FORMAT_OPTION);
	return (
		<QuoteDetailsAccordion title={nls.Comments.t()}>
			<Stack spacing={2}>
				<Paper sx={quoteDetailsTextDisplayPaperSX}>
					{!comments?.count ? (
						<EmptyContent
							title={nlsComments.NoComments.t()}
							description={
								quoteById?.status === State.DRAFT ? nlsComments.NoCommentsHelp.t() : undefined
							}
							altId="quote-details-comments-id"
						/>
					) : (
						comments?.contents?.map((comment: Comment) => (
							<Stack direction="row" key={comment.id} sx={quoteDetailsTextSpacingSX} spacing={1}>
								<Avatar sx={quoteDetailsAvatarSX(comment.avatarColor)}>{comment.initials}</Avatar>
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
				<Stack {...quoteDetailsInputStack}>
					<TextField
						margin="normal"
						fullWidth
						name="comment"
						value={newComment}
						placeholder={nls2.LeaveComment.t()}
						onChange={handleChange}
						inputProps={{
							maxLength: MAX_LENGTH_COMMENTS_REQUESTS,
						}}
					/>
					<OneClick
						color="primary"
						onClick={onAddComment}
						disabled={!newComment.trim()}
						wrapper="icon"
					>
						<SendIcon fontSize="large" />
					</OneClick>
				</Stack>
			</Stack>
		</QuoteDetailsAccordion>
	);
};
