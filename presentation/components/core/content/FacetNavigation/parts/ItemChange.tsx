/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FacetNavigationEntry } from '@/components/content/FacetNavigation/parts/Entry';
import { FacetNavigationPrice } from '@/components/content/FacetNavigation/parts/Price';
import { facetNavigationAccordionSX } from '@/components/content/FacetNavigation/styles/accordion';
import { facetNavigationAccordionSummarySX } from '@/components/content/FacetNavigation/styles/accordionSummary';
import { facetNavigationGridItemSX } from '@/components/content/FacetNavigation/styles/gridItem';
import { useFacetNavigation } from '@/data/Content/FacetNavigation';
import { useLocalization } from '@/data/Localization';
import { FACET_PRICE_PREFIX } from '@/data/constants/facet';
import { ContentContext } from '@/data/context/content';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Breakpoint,
	Button,
	Grid,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, SyntheticEvent, useCallback, useContext, useState } from 'react';

const mobileBreakpoint: Breakpoint = 'md';

export const FacetNavigationItemChange: FC = () => {
	const productFilterNLS = useLocalization('ProductFilter');
	const { toggleFacetLimit, facets } = useContext(ContentContext) as ReturnType<
		typeof useFacetNavigation
	>;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down(mobileBreakpoint));
	const [activeFacetId, setActiveFacetId] = useState<string>(() => '');
	const handleAccordionChange = useCallback(
		(facetValue: string) => (_event: SyntheticEvent<Element, Event>, isExpanded: boolean) => {
			isMobile && setActiveFacetId(isExpanded ? facetValue : '');
		},
		[isMobile]
	);

	return (
		<>
			{facets.map((facetItem) => (
				<Accordion
					id={`productFilter-facet-${facetItem.name}`}
					data-testid={`productFilter-facet-${facetItem.name}`}
					defaultExpanded={!isMobile}
					key={facetItem.value}
					expanded={!isMobile || activeFacetId === facetItem.value}
					onChange={handleAccordionChange(facetItem.value)}
					square={true}
					sx={facetNavigationAccordionSX}
				>
					<AccordionSummary
						aria-controls={`${facetItem.value}-content`}
						id={`${facetItem.value}-header`}
						data-testid={`${facetItem.value}-header`}
						sx={facetNavigationAccordionSummarySX}
						expandIcon={isMobile ? <ExpandMoreIcon /> : null}
					>
						<Typography variant="body2">
							{facetItem.value.startsWith(FACET_PRICE_PREFIX)
								? productFilterNLS.Labels.price.t()
								: facetItem.extendedData?.fname ?? facetItem.name}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{facetItem.value.startsWith(FACET_PRICE_PREFIX) ? (
							<FacetNavigationPrice />
						) : (
							<Stack justifyContent="flex-start" alignItems="flex-start">
								<Grid container>
									{facetItem.entry?.map((entry: any) => (
										<Grid item key={entry.value} sx={facetNavigationGridItemSX(!entry.image)}>
											<FacetNavigationEntry entry={entry} />
										</Grid>
									))}
								</Grid>
								{facetItem.entry && (facetItem.showMore || facetItem.showLess) ? (
									<Button
										variant="inline"
										data-testid={`productFilter_${facetItem.name}_show_more`}
										id={`productFilter_${facetItem.name}_show_more`}
										onClick={toggleFacetLimit(facetItem.value)}
									>
										{facetItem.showMore
											? productFilterNLS.Actions.showMore.t()
											: productFilterNLS.Actions.showLess.t()}
									</Button>
								) : null}
							</Stack>
						)}
					</AccordionDetails>
				</Accordion>
			))}
		</>
	);
};
