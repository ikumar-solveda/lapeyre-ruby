/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { quoteDetailsAccordionDetailsSX } from '@/components/content/QuoteDetails/styles/accordionDetails';
import { quoteDetailsAccordionIconSX } from '@/components/content/QuoteDetails/styles/accordionIcon';
import { quoteDetailsAccordionSummarySX } from '@/components/content/QuoteDetails/styles/accordionSummary';
import { quoteDetailsSubsectionSX } from '@/components/content/QuoteDetails/styles/subsection';
import { useLocalization } from '@/data/Localization';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Divider,
	Stack,
	Typography,
} from '@mui/material';
import { type FC, type PropsWithChildren, type SyntheticEvent, useCallback, useState } from 'react';

type Props = {
	title: string;
};
export const QuoteDetailsAccordion: FC<PropsWithChildren<Props>> = ({ title, children }) => {
	const nls = useLocalization('QuoteSections');
	const [expanded, setExpanded] = useState<boolean>(true);
	const onChange = useCallback((_e: SyntheticEvent, value: boolean) => setExpanded(value), []);
	return (
		<Stack spacing={2}>
			<Accordion elevation={4} defaultExpanded={true} onChange={onChange}>
				<AccordionSummary
					sx={quoteDetailsAccordionSummarySX}
					expandIcon={
						<Stack direction="row" alignItems="center">
							<Button sx={quoteDetailsSubsectionSX}>
								<Typography variant="body2">
									{expanded ? nls.HideGroupDetails.t() : nls.ShowGroupDetails.t()}
								</Typography>
							</Button>
							{expanded ? (
								<ExpandLess sx={quoteDetailsAccordionIconSX} />
							) : (
								<ExpandMore sx={quoteDetailsAccordionIconSX} />
							)}
						</Stack>
					}
				>
					<Typography variant="h6">{title}</Typography>
				</AccordionSummary>
				<Divider />
				<AccordionDetails sx={quoteDetailsAccordionDetailsSX}>{children}</AccordionDetails>
			</Accordion>
		</Stack>
	);
};
