/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { useCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Typography, Chip, Button, Stack } from '@mui/material';
import { catalogEntryListFacetChipsSX } from '@/components/content/CatalogEntryList/styles/facetChips';
import { FC, useContext } from 'react';

export const CatalogEntryListFacetChips: FC = () => {
	const {
		onDeleteAll,
		onFacetDelete,
		onPriceSelectionDelete,
		selectedFacet,
		facetEntries,
		filteredParams,
	} = useContext(ContentContext) as ReturnType<typeof useCatalogEntryList>;
	const productGridNLS = useLocalization('ProductGrid');
	const { minPrice = -1, maxPrice = -1 } = filteredParams;
	return selectedFacet.length > 0 || (minPrice > -1 && maxPrice > -1) ? (
		<Stack
			direction="row"
			spacing={1}
			alignItems="baseline"
			justifyContent="flex-start"
			flexWrap="wrap"
			gap={1}
			sx={catalogEntryListFacetChipsSX}
		>
			<Typography variant="body1">{productGridNLS.Labels.filteredBy.t()}</Typography>
			{selectedFacet.map((facetValue) => (
				<Chip
					key={facetValue}
					size="medium"
					label={facetEntries.find((entry) => entry.value === facetValue)?.label}
					onClick={onFacetDelete(facetValue)}
					onDelete={onFacetDelete(facetValue)}
					data-testid={`catalog-entry-list-${facetValue}-selected-facet-chip`}
					id={`catalog-entry-list-${facetValue}-selected-facet-chip`}
				/>
			))}
			{minPrice > -1 && maxPrice > -1 ? (
				<Chip
					size="medium"
					label={<PriceDisplay min={minPrice} max={maxPrice} />}
					onClick={onPriceSelectionDelete}
					onDelete={onPriceSelectionDelete}
					data-testid="catalog-entry-list-formatted-price-chip"
					id="catalog-entry-list-formatted-price-chip"
				/>
			) : null}
			<Button id="clear-all-facets" data-testid="clear-all-facets" onClick={onDeleteAll}>
				{productGridNLS.Actions.clearAll.t()}
			</Button>
		</Stack>
	) : null;
};
