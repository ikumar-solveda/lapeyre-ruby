/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	facetNavigationFacetEntryFormControlLabelSX,
	facetNavigationFacetEntrySwatchSX,
} from '@/components/content/FacetNavigation/styles/facetEntry/formControlLabel';
import { useFacetNavigation } from '@/data/Content/FacetNavigation';
import { ContentContext } from '@/data/context/content';
import { Swatch } from '@/components/blocks/Swatch';
import { ProductFacetEntry } from '@/data/types/Product';
import { Checkbox, FormControlLabel } from '@mui/material';
import { FC, useCallback, useContext } from 'react';

type Props = {
	entry: ProductFacetEntry;
};

export const FacetNavigationEntry: FC<Props> = ({ entry }) => {
	const { selectedFacet, onFacetSelectChange } = useContext(ContentContext) as ReturnType<
		typeof useFacetNavigation
	>;
	const onChange = useCallback(
		(event: any) => onFacetSelectChange(event, entry),
		[entry, onFacetSelectChange]
	);
	return entry.image ? (
		<Swatch
			aria-label={entry.label}
			image={entry.image}
			onClick={onChange}
			size="large"
			selected={selectedFacet !== undefined ? selectedFacet.indexOf(entry.value) > -1 : undefined}
			data-testid={`product-filter-${entry.value.toLowerCase()}-swatch`}
			id={`product-filter-${entry.value.toLowerCase()}-swatch`}
			sx={facetNavigationFacetEntrySwatchSX}
		/>
	) : (
		<FormControlLabel
			sx={facetNavigationFacetEntryFormControlLabelSX}
			control={
				<Checkbox
					checked={
						selectedFacet !== undefined ? selectedFacet.indexOf(entry.value) > -1 : undefined
					}
					onChange={onChange}
				/>
			}
			label={`${entry.label} (${entry.count})`}
		/>
	);
};
