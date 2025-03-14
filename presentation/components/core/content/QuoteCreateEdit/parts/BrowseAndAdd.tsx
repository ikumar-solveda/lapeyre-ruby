/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { EmptyContent } from '@/components/blocks/EmptyContent';
import { quickOrderFieldSX } from '@/components/content/QuickOrder/styles/field';
import { QuoteBrowseAndAddTable } from '@/components/content/QuoteBrowseAndAddTable';
import { PART_NUMBER_MAX_LENGTH } from '@/data/constants/order';
import { useQuoteBrowseAndAdd } from '@/data/Content/QuoteBrowseAndAdd';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { QuoteItem } from '@/data/types/Quote';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { useContext, type FC } from 'react';

export const QuoteCreateEditBrowseAndAdd: FC = () => {
	const { quoteById } = useContext(ContentContext) as ReturnType<typeof useQuoteCreateEdit>;
	const quoteBrowseAndAdd = useContext(ContentContext) as ReturnType<typeof useQuoteBrowseAndAdd>;
	const { onSearchInputChange, listData, options, getOptionLabel, onAddToList } = quoteBrowseAndAdd;
	const localization = useLocalization('Quotes');

	return (
		<Stack spacing={2}>
			<Autocomplete
				forcePopupIcon={false}
				clearOnBlur={false}
				id="browse-and-add-search"
				onInputChange={onSearchInputChange}
				options={options}
				disablePortal
				onChange={onAddToList}
				getOptionLabel={getOptionLabel}
				noOptionsText={false}
				sx={quickOrderFieldSX}
				renderInput={({ inputProps, ...params }) => (
					<TextField
						inputProps={{
							...inputProps,
							maxLength: PART_NUMBER_MAX_LENGTH,
						}}
						{...params}
						placeholder={localization.SearchBySkuName.t()}
					/>
				)}
			/>
			<Stack spacing={2}>
				{!listData?.length ? (
					<EmptyContent
						title={localization.GettingStarted.t()}
						description={localization.SearchProducts.t()}
						altId="quote-create-edit-products-id"
					/>
				) : (
					<QuoteBrowseAndAddTable
						quoteBrowseAndAdd={quoteBrowseAndAdd}
						quoteData={quoteById as QuoteItem}
					/>
				)}
			</Stack>
		</Stack>
	);
};
