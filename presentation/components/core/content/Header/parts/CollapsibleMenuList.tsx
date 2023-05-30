/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { HeaderNavBarMenuList } from '@/components/content/Header/parts/NavBarMenuList';
import { headerNavBarDropMenuItemSX } from '@/components/content/Header/styles/navBar/dropMenuItem';
import { LinkWrap } from '@/components/blocks/Linkable';
import { PageLink } from '@/data/Navigation';
import { Accordion, AccordionDetails, AccordionSummary, Link, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FC } from 'react';

export const CollapsibleMenuList: FC<{
	tree?: PageLink[];
}> = ({ tree }) =>
	tree && tree.length > 0 ? (
		<Stack direction="column">
			{tree.map(({ label, url, children }) => (
				<Accordion square={true} disableGutters={true} elevation={0} key={`${label}${url}`}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
