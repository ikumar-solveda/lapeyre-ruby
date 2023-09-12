/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { headerSearchSX } from '@/components/content/Header/styles/search';
import { useSearchNavigation } from '@/data/Content/SearchNavigation';
import { useLocalization } from '@/data/Localization';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, IconButton, InputAdornment, TextField } from '@mui/material';
import { FC, useMemo } from 'react';

type Option = {
	label: string;
	href?: string;
	identifier: string;
};

export const HeaderSearch: FC<{ mobile?: boolean }> = ({ mobile }) => {
	const { searchValue, suggest, onInputChange, onSubmit } = useSearchNavigation();
	const SearchNLS = useLocalization('SearchBar');
	const uniqueId = `type-ahead-site-search-${mobile ? 'mobile' : 'desktop'}`;
	const options = useMemo<Option[]>(
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

	return (
		<Autocomplete
			freeSolo
			disableClearable
			onChange={(_, item) => onSubmit(typeof item === 'string' ? { label: item } : item)}
			onInputChange={onInputChange}
			groupBy={({ identifier }) => identifier}
			options={options}
			sx={headerSearchSX({ isMobile: mobile })}
			id={uniqueId}
			renderInput={({ inputProps, ...params }) => (
				<TextField
					inputProps={{ ...inputProps, 'data-testid': uniqueId }}
					{...params}
					InputProps={{
						...params.InputProps,
						placeholder: SearchNLS.SearchField.t(),
						slotProps: {
							input: { role: undefined, 'aria-expanded': undefined },
						},
						size: 'small',
						type: 'search',
						onKeyDown: (e) => {
							if (e.code === 'Enter' && e.currentTarget.value) {
								onSubmit({ label: e.currentTarget.value });
							}
						},
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label={SearchNLS.SearchField.t()}
									onClick={() => onSubmit({ label: searchValue })}
									edge="end"
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
