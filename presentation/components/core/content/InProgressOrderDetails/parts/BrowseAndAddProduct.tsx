/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { InProgressOrderDetailsSetAsCurrentOrder } from '@/components/content/InProgressOrderDetails/parts/SetAsCurrentOrder';
import { inProgressOrderDetailsBrowseAndAddProductAutocompleteSX } from '@/components/content/InProgressOrderDetails/styles/BrowseAndAddProduct/autocomplete';
import { PART_NUMBER_MAX_LENGTH } from '@/data/constants/order';
import type { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { useContext, type FC } from 'react';

export const InProgressOrderDetailsBrowseAndAddProduct: FC = () => {
	const nls = useLocalization('InProgressOrderDetails');
	const { options, onSearchInputChange, onAddProduct, getOptionLabel, searchTerm } = useContext(
		ContentContext
	) as ReturnType<typeof useInProgressOrderDetails>;

	return (
		<Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
			<Autocomplete
				forcePopupIcon={false}
				clearOnBlur={false}
				id="inprogress-order-details-browse-and-add-search"
				onInputChange={onSearchInputChange}
				options={options}
				disablePortal
				onChange={onAddProduct}
				getOptionLabel={getOptionLabel}
				noOptionsText={searchTerm ? nls.AutoComplete.NotFound.t() : nls.AutoComplete.Search.t()}
				sx={inProgressOrderDetailsBrowseAndAddProductAutocompleteSX}
				renderInput={({ inputProps, ...params }) => (
					<TextField
						{...params}
						inputProps={{ ...inputProps, maxLength: PART_NUMBER_MAX_LENGTH }}
						placeholder={nls.AutoComplete.Placeholder.t()}
					/>
				)}
			/>
			<InProgressOrderDetailsSetAsCurrentOrder />
		</Stack>
	);
};
