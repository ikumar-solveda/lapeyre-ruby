/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { HeaderNavBarMenuList } from '@/components/content/Header/parts/NavBarMenuList';
import { headerNavBarDropMenuItemSX } from '@/components/content/Header/styles/navBar/dropMenuItem';
import { navItemAccordionContainerSX } from '@/components/content/Header/styles/navBar/navItemAccordionContainer';
import { PageLink } from '@/data/Navigation';
import { getHref_Breadcrumb } from '@/utils/getHref_Breadcrumb';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack } from '@mui/material';
import { FC } from 'react';

export const CollapsibleMenuList: FC<{
	tree?: PageLink[];
}> = ({ tree }) =>
	tree && tree.length > 0 ? (
		<Stack direction="column">
			{tree.map(({ label, url, children, trail }) => (
				<Accordion square={true} disableGutters={true} elevation={0} key={`${label}${url}`}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} sx={navItemAccordionContainerSX}>
						{
							<Linkable
								href={getHref_Breadcrumb(url, trail)}
								component="a"
								sx={headerNavBarDropMenuItemSX({
									isParent: children.length > 0,
								})}
							>
								{label}
							</Linkable>
						}
					</AccordionSummary>
					<AccordionDetails>
						<HeaderNavBarMenuList tree={children} display="vertical" />
					</AccordionDetails>
				</Accordion>
			))}
		</Stack>
	) : null;
