/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import type { useAddToQuote } from '@/data/Content/AddToQuote';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { FIELD_LENGTHS } from '@/data/constants/quotes';
import { REGEX } from '@/data/constants/regex';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { Stack, TextField, Typography } from '@mui/material';
import { type FC, useContext } from 'react';

export const AddToQuoteDialogCreateNewQuote: FC = () => {
	const localization = useLocalization('Quotes');
	const addToQuotesValue = useContext(ContentContext) as ReturnType<typeof useAddToQuote>;
	const {
		details,
		handleDetailsChange: handleChange,
		orgVal = EMPTY_STRING,
		contractVal = EMPTY_STRING,
	} = addToQuotesValue;
	return (
		<ContentProvider value={addToQuotesValue}>
			<Stack spacing={2}>
				<TextField
					margin="normal"
					required
					name="organization"
					label={
						<Typography component="span" variant="body2">
							{localization.Organization.t()}
						</Typography>
					}
					value={orgVal}
					disabled
					id="add-to-quote-dialog-create-new-quote-organization"
					data-testid="add-to-quote-dialog-create-new-quote-organization"
				/>
				<TextField
					margin="normal"
					required
					name="contract"
					label={
						<Typography component="span" variant="body2">
							{localization.Contract.t()}
						</Typography>
					}
					value={contractVal}
					disabled
					id="add-to-quote-dialog-create-new-quote-contract"
					data-testid="add-to-quote-dialog-create-new-quote-contract"
				/>
				<TextField
					margin="normal"
					required
					name="title"
					label={
						<Typography component="span" variant="body2">
							{localization.QuoteTitle.t()}
						</Typography>
					}
					error={!!(details.dirty && !details.title.trim())}
					placeholder={`(${localization.QuoteTitle.t()})`}
					onChange={handleChange}
					InputLabelProps={{ shrink: true }}
					value={details.title}
					inputProps={{
						maxLength: FIELD_LENGTHS.title,
						pattern: REGEX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.source,
					}}
					id="add-to-quote-dialog-create-new-quote-title"
					data-testid="add-to-quote-dialog-create-new-quote-title"
				/>
				<TextField
					margin="normal"
					required
					name="description"
					label={
						<Typography component="span" variant="body2">
							{localization.QuoteDescription.t()}
						</Typography>
					}
					error={!!(details.dirty && !details.description.trim())}
					placeholder={`(${localization.AddDescription.t()})`}
					onChange={handleChange}
					InputLabelProps={{ shrink: true }}
					value={details.description}
					inputProps={{
						maxLength: FIELD_LENGTHS.description,
						pattern: REGEX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.source,
					}}
					id="add-to-quote-dialog-create-new-quote-description"
					data-testid="add-to-quote-dialog-create-new-quote-description"
				/>
			</Stack>
		</ContentProvider>
	);
};
