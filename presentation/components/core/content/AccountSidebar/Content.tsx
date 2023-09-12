/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { accountSidebarSectionSX } from '@/components/content/AccountSidebar/styles/section';
import { accountSidebarSectionTitleSX } from '@/components/content/AccountSidebar/styles/sectionTitle';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { AccountTools } from '@/utils/useAccountTools';
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Tooltip,
	Typography,
} from '@mui/material';
import { FC, Fragment } from 'react';

/**
 * CustomAccountSidebarProps component
 * displays user's account links
 */
export const AccountSidebarContent: FC<{
	tools: AccountTools;
}> = ({ tools }) => {
	const root = useLocalization('AccountLinksGridView');
	const localization = useLocalization('AccountLinks');
	const router = useNextRouter();
	const { path } = router.query;
	const current = Array.isArray(path) ? path.join('/') : path;

	return (
		<List component="nav" sx={accountSidebarSectionSX} aria-label={root.Title.t()}>
			{tools
				.map(({ title, tools }, sectionIndex) => (
					<Fragment key={sectionIndex}>
						<ListItem sx={accountSidebarSectionTitleSX}>
							<Typography variant="overline">{title}</Typography>
						</ListItem>
						{tools.map(({ href, title }, index) =>
							current?.endsWith(href) ? (
								// the account tools href currently is one level
								<ListItemButton key={href} selected={true}>
									<ListItemText primary={title} />
								</ListItemButton>
							) : href ? (
								<Linkable
									data-testid={`account-sidebar-${href.split('/').filter(Boolean).join('-')}`}
									id={`account-sidebar-${href.split('/').filter(Boolean).join('-')}`}
									key={href}
									href={href}
								>
									<ListItemButton selected={current?.includes(href)}>
										<ListItemText primary={title} />
									</ListItemButton>
								</Linkable>
							) : (
								<Tooltip
									title={localization.DisabledMessage.t()}
									key={`${sectionIndex}${index}`}
									placement="right"
								>
									<Box>
										<ListItemButton disabled>
											<ListItemText primary={title} />
										</ListItemButton>
									</Box>
								</Tooltip>
							)
						)}
					</Fragment>
				))
				.flatMap((Element, index) => [<Divider key={`divider${index}`} />, Element])}
		</List>
	);
};
