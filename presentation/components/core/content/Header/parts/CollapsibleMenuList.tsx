/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { LinkWrap } from '@/components/blocks/Linkable';
import { HeaderNavBarMenuList } from '@/components/content/Header/parts/NavBarMenuList';
import { headerNavBarDropMenuItemSX } from '@/components/content/Header/styles/navBar/dropMenuItem';
import { navItemAccordionContainerSX } from '@/components/content/Header/styles/navBar/navItemAccordionContainer';
import { PageLink } from '@/data/Navigation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Link, Stack } from '@mui/material';
import { FC } from 'react';

export const CollapsibleMenuList: FC<{
	tree?: PageLink[];
}> = ({ tree }) =>
	tree && tree.length > 0 ? (
		<Stack direction="column">
			{tree.map(({ label, url, children }) => (
				<Accordion square={true} disableGutters={true} elevation={0} key={`${label}${url}`}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} sx={navItemAccordionContainerSX}>
						{
							<LinkWrap href={url}>
								<Link
									component="a"
									sx={headerNavBarDropMenuItemSX({
										isParent: children.length > 0,
									})}
								>
									{label}
								</Link>
							</LinkWrap>
						}
					</AccordionSummary>
					<AccordionDetails>
						<HeaderNavBarMenuList tree={children} display="vertical" />
					</AccordionDetails>
				</Accordion>
			))}
		</Stack>
	) : null;
