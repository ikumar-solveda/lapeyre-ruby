/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { quoteCreateEditDetailsFieldSX } from '@/components/content/QuoteCreateEdit/styles/detailsField';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { FIELD_LENGTHS } from '@/data/constants/quotes';
import { REGEX } from '@/data/constants/regex';
import { ContentContext } from '@/data/context/content';
import { Stack, TextField, Typography } from '@mui/material';
import { type FC, useContext } from 'react';

export const QuoteCreateEditDetails: FC = () => {
	const localization = useLocalization('Quotes');
	const {
		quoteById,
		details,
		handleDetailsChange: handleChange,
		orgVal = EMPTY_STRING,
		contractVal = EMPTY_STRING,
	} = useContext(ContentContext) as ReturnType<typeof useQuoteCreateEdit>;

	return (
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
				sx={quoteCreateEditDetailsFieldSX}
				id="quote-create-edit-details-organization"
				data-testid="quote-create-edit-details-organization"
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
				value={quoteById?.contract?.name ?? contractVal}
				disabled
				sx={quoteCreateEditDetailsFieldSX}
				id="quote-create-edit-details-contract"
				data-testid="quote-create-edit-details-contract"
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
				value={details.title}
				onChange={handleChange}
				InputLabelProps={{ shrink: true }}
				inputProps={{
					maxLength: FIELD_LENGTHS.title,
					pattern: REGEX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.source,
				}}
				sx={quoteCreateEditDetailsFieldSX}
				id="quote-create-edit-details-title"
				data-testid="quote-create-edit-details-title"
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
				value={details.description}
				onChange={handleChange}
				InputLabelProps={{ shrink: true }}
				inputProps={{
					maxLength: FIELD_LENGTHS.description,
					pattern: REGEX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.source,
				}}
				sx={quoteCreateEditDetailsFieldSX}
				id="quote-create-edit-details-description"
				data-testid="quote-create-edit-details-description"
			/>
		</Stack>
	);
};
