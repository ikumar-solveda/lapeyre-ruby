/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FacetNavigationPrice } from '@/components/content/FacetNavigation/parts/Price';
import { facetNavigationAccordionSX } from '@/components/content/FacetNavigation/styles/accordion';
import { facetNavigationAccordionSummarySX } from '@/components/content/FacetNavigation/styles/accordionSummary';
import { useFacetNavigation } from '@/data/Content/FacetNavigation';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Breakpoint,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, SyntheticEvent, useCallback, useContext, useState } from 'react';

const mobileBreakpoint: Breakpoint = 'md';

export const FacetNavigationPriceChange: FC = () => {
	const productFilterNLS = useLocalization('ProductFilter');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down(mobileBreakpoint));
	const [activeFacetId, setActiveFacetId] = useState<string>(() => '');
	const { facets, filteredParams } = useContext(ContentContext) as ReturnType<
		typeof useFacetNavigation
	>;
	const { minPrice = -1, maxPrice = -1 } = filteredParams;
	const handleAccordionChange = useCallback(
		(facetValue: string) => (_event: SyntheticEvent<Element, Event>, isExpanded: boolean) => {
			isMobile && setActiveFacetId(isExpanded ? facetValue : '');
		},
		[isMobile]
	);

	return facets.length === 0 && minPrice > -1 && maxPrice > -1 ? (
		<Accordion
			data-testid={`productFilter-facet-price`}
			id={`productFilter-facet-price`}
			defaultExpanded={!isMobile}
			expanded={!isMobile || activeFacetId === 'price'}
			onChange={handleAccordionChange('price')}
			square={true}
			sx={facetNavigationAccordionSX}
		>
			<AccordionSummary
				sx={facetNavigationAccordionSummarySX}
				expandIcon={isMobile ? <ExpandMoreIcon /> : null}
			>
				{productFilterNLS.Labels.price.t()}
			</AccordionSummary>
			<AccordionDetails>
				<FacetNavigationPrice />
			</AccordionDetails>
		</Accordion>
	) : null;
};
