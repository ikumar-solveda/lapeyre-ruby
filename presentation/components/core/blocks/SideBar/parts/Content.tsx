/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { sidebarAccordionSummarySX } from '@/components/blocks/SideBar/styles/accordionSummary';
import { sidebarPaperSX } from '@/components/blocks/SideBar/styles/paper';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Accordion, AccordionSummary, Paper, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type Props = {
	title: string;
	href?: string;
	scrollable?: boolean;
	isMobile: boolean;
	toggleOpen: () => void;
};

export const SidebarContent: FC<PropsWithChildren<Props>> = ({
	title,
	href,
	isMobile,
	toggleOpen,
	scrollable = false,
	children,
}) => (
	<Paper sx={sidebarPaperSX({ isMobile, scrollable })}>
		<Accordion expanded={true} square={true} id="sidebar-content" data-testid="sidebar-content">
			<AccordionSummary
				sx={sidebarAccordionSummarySX({ isMobile })}
				expandIcon={isMobile ? <ExpandLessIcon /> : null}
				onClick={toggleOpen}
				aria-controls="facets-content"
				id="facets-header"
				data-testid="facets-header"
			>
				{href ? (
					<Linkable
						id={`account-sidebar-${title.toLowerCase()}`}
						data-testid={`account-sidebar-${title.toLowerCase()}`}
						href={href}
					>
						<Typography variant="subtitle1">{title}</Typography>
					</Linkable>
				) : (
					<Typography variant="subtitle1">{title}</Typography>
				)}
			</AccordionSummary>
			{children}
		</Accordion>
	</Paper>
);
