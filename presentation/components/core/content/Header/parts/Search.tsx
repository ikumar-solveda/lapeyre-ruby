/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { headerSearchSX } from '@/components/content/Header/styles/search';
import { useSearchNavigation } from '@/data/Content/SearchNavigation';
import { useLocalization } from '@/data/Localization';
import { SuggestOption } from '@/data/types/Search';
import { comparator } from '@/utils/search';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, IconButton, InputAdornment, TextField } from '@mui/material';
import { uniqWith } from 'lodash';
import { FC, useMemo } from 'react';

export const HeaderSearch: FC<{ mobile?: boolean }> = ({ mobile }) => {
	const { searchValue, suggest, onInputChange, onSubmit } = useSearchNavigation();
	const SearchNLS = useLocalization('SearchBar');
	const uniqueId = `type-ahead-site-search-${mobile ? 'mobile' : 'desktop'}`;
	const options = useMemo<SuggestOption[]>(
		() =>
			suggest
				.map(({ identifier, entry }) =>
					identifier && entry
						? entry?.map(({ label, href }) => ({ label, href, identifier })) || []
						: []
				)
				.flat(1),
		[suggest]
	);

	const uniqueLabelOptions = useMemo<SuggestOption[]>(
		() => uniqWith(options, comparator),
		[options]
	);

	return (
		<Autocomplete
			freeSolo
			disableClearable
			onChange={(_, item) => onSubmit(typeof item === 'string' ? { label: item } : item)}
			onInputChange={onInputChange}
			options={uniqueLabelOptions}
			groupBy={(option) => option.identifier}
			filterOptions={(options) => options}
			sx={{
				...headerSearchSX({ isMobile: mobile }),
				width: '100%',
			}}
			id={uniqueId}
			renderInput={({ inputProps, ...params }) => (
				<TextField
					required
					inputProps={{ ...inputProps, 'data-testid': uniqueId }}
					{...params}
					InputProps={{
						...params.InputProps,
						placeholder: SearchNLS.SearchField.t(),
						slotProps: {
							input: { role: undefined, 'aria-expanded': undefined },
						},
						size: 'small',
						type: 'input',
						onKeyDown: (e) => {
							if (e.code === 'Enter' && e.currentTarget.value) {
								onSubmit({ label: e.currentTarget.value });
							}
						},
						endAdornment: (
							<InputAdornment position="start">
								<IconButton
									aria-label={SearchNLS.SearchField.t()}
									onClick={() => onSubmit({ label: searchValue })}
									edge="start"
								>
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			)}
		/>
	);
};
