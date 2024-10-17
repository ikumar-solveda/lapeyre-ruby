/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { googleMapsAutoCompleteActionsStack } from '@/components/blocks/GoogleMapsAutocomplete/styles/actionsStack';
import { googleMapsAutoCompleteRootSX } from '@/components/blocks/GoogleMapsAutocomplete/styles/root';
import { GoogleMapsAutocompleteWithResize } from '@/components/blocks/GoogleMapsAutocompleteWithResize';
import { Linkable } from '@/components/blocks/Linkable';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { useStoreList } from '@/data/Content/StoreList';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { GOOGLE_MAPS_SEARCH_FIELD_ID } from '@/data/constants/googleMaps';
import { ContentContext } from '@/data/context/content';
import { useGoogleMapsAPILocale } from '@/data/state/useGoogleMapsAPILocale';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Stack, TextField } from '@mui/material';
import { FC, useContext } from 'react';

type Props = {
	placeholder: string;
	clearLabel: string;
	searchLabel: string;
};
export const GoogleMapsAutocomplete: FC<Props> = ({ placeholder, clearLabel, searchLabel }) => {
	const { findNearStore, onLoad, onPlaceChanged, searchFieldRef, clearSearch, locator } =
		useContext(ContentContext) as ReturnType<typeof useStoreList>;
	const { loadedLocale } = useGoogleMapsAPILocale();
	const { localeName: locale } = useStoreLocale();

	return locale && locale === loadedLocale.locale ? (
		<>
			<GoogleMapsAutocompleteWithResize
				onLoad={onLoad}
				onPlaceChanged={onPlaceChanged}
				searchTextFieldRef={searchFieldRef}
				sx={googleMapsAutoCompleteRootSX}
			>
				<TextField
					fullWidth
					autoFocus
					autoComplete="off"
					placeholder={placeholder}
					name="searchTerm"
					inputRef={searchFieldRef}
					data-testid={GOOGLE_MAPS_SEARCH_FIELD_ID}
					id={GOOGLE_MAPS_SEARCH_FIELD_ID}
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</GoogleMapsAutocompleteWithResize>
			<Stack {...googleMapsAutoCompleteActionsStack}>
				<Linkable type="inline" onClick={findNearStore}>
					{searchLabel}
				</Linkable>
				{locator?.storeList?.length > 0 && !locator.noSearch ? (
					<Linkable
						type="inline"
						onClick={clearSearch}
						data-testid="gmaps-clear-search"
						id="gmaps-clear-search"
					>
						{clearLabel}
					</Linkable>
				) : null}
			</Stack>
		</>
	) : (
		<ProgressIndicator />
	);
};
