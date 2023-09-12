/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { requisitionListsAccordionDetailsSX } from '@/components/content/RequisitionLists/styles/accordionDetails';
import { requisitionListsAccordionSummarySX } from '@/components/content/RequisitionLists/styles/accordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Stack } from '@mui/material';

type Props = {
	header: JSX.Element;
	details: JSX.Element | JSX.Element[];
	id: string;
	expanded?: boolean;
	toggleExpand?: () => void;
};

export const RequisitionListsAccordionParts: React.FC<Props> = ({
	header,
	details,
	id,
	expanded,
	toggleExpand,
}) => (
	<Accordion
		id={`requisition-lists-${id}`}
		data-testid={`requisition-lists-${id}`}
		expanded={expanded}
		onChange={toggleExpand}
	>
		<AccordionSummary
			aria-controls={`${id}-content`}
			id={`${id}-header`}
			data-testid={`${id}-header`}
			sx={requisitionListsAccordionSummarySX}
			expandIcon={<ExpandMoreIcon />}
		>
			{header ? <>{header}</> : null}
		</AccordionSummary>
		<Divider />
		<AccordionDetails sx={requisitionListsAccordionDetailsSX}>
			<Stack spacing={1}>{details}</Stack>
		</AccordionDetails>
	</Accordion>
);
