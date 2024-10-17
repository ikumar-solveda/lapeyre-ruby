/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { accordionExpandIconSX } from '@/components/blocks/Accordion/styles/expandIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	AccordionDetails,
	AccordionProps,
	AccordionSummary,
	Accordion as MatAccordion,
	Typography,
} from '@mui/material';
import { FC, PropsWithChildren, ReactNode } from 'react';

interface Props extends AccordionProps {
	id: string;
	label?: ReactNode;
	expandIcon?: ReactNode;
}

export const Accordion: FC<PropsWithChildren<Props>> = ({
	id,
	label,
	expandIcon,
	children,
	...restProps
}) => (
	<MatAccordion id={`accordion-${id}`} data-testid={`accordion-${id}`} {...restProps}>
		<AccordionSummary
			aria-controls={`accordion-details-${id}`}
			id={`accordion-summary-${id}`}
			data-testid={`accordion-summary-${id}`}
			expandIcon={expandIcon ? expandIcon : <ExpandMoreIcon sx={accordionExpandIconSX} />}
		>
			{label ? (
				typeof label === 'string' ? (
					<Typography variant="h4">{label}</Typography>
				) : (
					label
				)
			) : null}
		</AccordionSummary>
		<AccordionDetails id={`accordion-details-${id}`} data-testid={`accordion-details-${id}`}>
			{children}
		</AccordionDetails>
	</MatAccordion>
);
