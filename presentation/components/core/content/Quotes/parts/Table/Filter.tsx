/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { quotesTableActionsSX } from '@/components/content/Quotes/styles/Table/actions';
import { quotesTableFilterLabelSX } from '@/components/content/Quotes/styles/Table/filterLabel';
import { quotesTableFilterMenuHeightSX } from '@/components/content/Quotes/styles/Table/filterMenuHeight';
import { State, StateLabels } from '@/data/constants/quotes';
import type { useQuotes } from '@/data/Content/Quotes';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Checkbox, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { type FC, useContext } from 'react';

export const QuotesTableFilter: FC = () => {
	const quotesTableNLS = useLocalization('QuotesTable');
	const nls = useLocalization('QuoteStates');
	const quotesContent = useContext(ContentContext) as ReturnType<typeof useQuotes>;
	const { statuses, onStatus } = quotesContent;
	return (
		<FormControl fullWidth sx={quotesTableActionsSX}>
			<Select
				displayEmpty
				id="filter-by-statuses"
				data-testid="filter-by-statuses"
				multiple
				value={statuses}
				onChange={onStatus}
				renderValue={(selected: string[]) =>
					selected.length ? (
						selected.map((s: string) => StateLabels[s]).join(', ')
					) : (
						<Typography sx={quotesTableFilterLabelSX}>{quotesTableNLS.Filter.t()}</Typography>
					)
				}
				MenuProps={{
					PaperProps: {
						sx: quotesTableFilterMenuHeightSX,
					},
				}}
			>
				{Object.entries(State).map(([_status, index]) => (
					<MenuItem key={index} value={index.toString()}>
						<Checkbox checked={!!statuses.find((s: string) => s === index.toString())} />
						{nls[StateLabels[`${index}`] as keyof typeof nls]?.t()}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
