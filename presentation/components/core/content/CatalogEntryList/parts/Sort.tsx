/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { FormControl, Select } from '@mui/material';
import { FC, useContext } from 'react';

export const CatalogEntryListSort: FC = () => {
	const { sortOptions, selectedSortOption, onSortOptionChange } = useContext(
		ContentContext
	) as ReturnType<typeof useCatalogEntryList>;
	const listSettingsNLS = useLocalization('CommerceEnvironment').listSettings;
	const ProductGrid = useLocalization('ProductGrid').Labels;

	return (
		<FormControl variant="outlined">
			<Select
				data-testid="list-sort-option"
				inputProps={{ 'aria-label': ProductGrid.sortBy.t() }}
				id={`productGrid_select`}
				value={selectedSortOption}
				native
				onChange={onSortOptionChange}
				fullWidth
			>
				{sortOptions?.map((option) => (
					<option
						value={option.value}
						key={option.value}
						id={`productGrid_option_${option.value}`}
						data-testid={`productGrid_option_${option.value}`}
					>
						{listSettingsNLS[option.translationKey].t()}
					</option>
				))}
			</Select>
		</FormControl>
	);
};
