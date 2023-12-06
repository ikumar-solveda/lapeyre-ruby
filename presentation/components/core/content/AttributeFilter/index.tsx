/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Sidebar } from '@/components/blocks/SideBar';
import { AttributeFilterRadioGroup } from '@/components/content/AttributeFilter/parts/RadioGroup';
import { attributeFilterAccordionSX } from '@/components/content/AttributeFilter/styles/accordion';
import { useAttributeFilter } from '@/data/Content/AttributeFilter';
import { EMPTY_PRODUCT } from '@/data/Content/SkuListTable';
import { useLocalization } from '@/data/Localization';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { ProductAttribute } from '@/data/types/Product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Breakpoint,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';

export const AttributeFilter: FC<{ id: ID }> = ({ id }) => {
	const mobileBreakpoint: Breakpoint = 'md';
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down(mobileBreakpoint));
	const values = useAttributeFilter(id.toString());
	const { product = EMPTY_PRODUCT, isActiveAttrId, clickAccordion } = values;
	const productDetailNLS = useLocalization('productDetail');

	return product?.partNumber ? (
		<ContentProvider value={values}>
			<Sidebar
				title={productDetailNLS.attributeFilter.t()}
				mobileBreakpoint={mobileBreakpoint}
				scrollable={true}
			>
				{product.definingAttributes.map((attribute: ProductAttribute) => (
					<Accordion
						data-testid={`product-attribute-filter-${attribute.identifier}`}
						id={`product-attribute-filter-${attribute.identifier}`}
						key={attribute.identifier}
						defaultExpanded={!isMobile}
						expanded={!isMobile || isActiveAttrId === attribute.identifier}
						square={true}
						sx={attributeFilterAccordionSX}
						onClick={clickAccordion(attribute, isMobile)}
					>
						<AccordionSummary expandIcon={isMobile ? <ExpandMoreIcon /> : null}>
							<Typography variant="body2">{attribute.name}</Typography>
						</AccordionSummary>
						<AccordionDetails
							data-testid={`product-attribute-filter-${attribute.identifier}-accordion-details`}
						>
							<AttributeFilterRadioGroup attribute={attribute} />
						</AccordionDetails>
					</Accordion>
				))}
			</Sidebar>
		</ContentProvider>
	) : null;
};
