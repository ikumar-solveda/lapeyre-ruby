/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { quoteCreateEditInputStack } from '@/components/content/QuoteCreateEdit/styles/inputStack';
import { quoteCreateEditTextDisplayPaperSX } from '@/components/content/QuoteCreateEdit/styles/textDisplayPaper';
import { quoteCreateEditTextSpacingSX } from '@/components/content/QuoteCreateEdit/styles/textSpacing';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { useLocalization } from '@/data/Localization';
import { MAX_LENGTH_COMMENTS_REQUESTS } from '@/data/constants/quotes';
import { ContentContext } from '@/data/context/content';
import SendIcon from '@mui/icons-material/Send';
import { Paper, Stack, TextField, Typography } from '@mui/material';
import type { FC } from 'react';
import { useContext } from 'react';

export const QuoteCreateEditRequests: FC = () => {
	const nls = useLocalization('QuoteSections');
	const localization = useLocalization('Quotes');
	const {
		quoteById,
		handleRequestChange: handleChange,
		newRequest: request,
		onAddRequest,
	} = useContext(ContentContext) as ReturnType<typeof useQuoteCreateEdit>;
	return (
		<Stack spacing={2}>
			<Typography variant="h6">{nls.Requests.t()}</Typography>
			<Paper sx={quoteCreateEditTextDisplayPaperSX}>
				{quoteById?.additionalSpecification?.map((req, index: number) => (
					<Typography sx={quoteCreateEditTextSpacingSX} key={index}>
						{req.description}
					</Typography>
				))}
			</Paper>
			<Stack {...quoteCreateEditInputStack}>
				<TextField
					margin="normal"
					fullWidth
					name="request"
					placeholder={localization.AddRequest.t()}
					value={request}
					onChange={handleChange}
					inputProps={{
						maxLength: MAX_LENGTH_COMMENTS_REQUESTS,
					}}
				/>
				<OneClick color="primary" onClick={onAddRequest} disabled={!request.trim()} wrapper="icon">
					<SendIcon fontSize="large" />
				</OneClick>
			</Stack>
		</Stack>
	);
};
