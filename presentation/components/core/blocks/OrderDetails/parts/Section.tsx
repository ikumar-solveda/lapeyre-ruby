/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Fragment, useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Divider,
	Stack,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useLocalization } from '@/data/Localization';
import { orderDetailSubsectionSX } from '@/components/blocks/OrderDetails/styles/subsection';
import { accordionSummarySX } from '@/components/blocks/OrderDetails/styles/accordionSummary';

type Props = {
	heading?: JSX.Element;
	details: JSX.Element | JSX.Element[];
	isStatic?: boolean;
	id: string;
};

export const OrderDetailsSection: React.FC<Props> = ({ heading, details, isStatic, id }) => {
	const detailsArray = Array.isArray(details) ? details : [details];
	const [expanded, setExpanded] = useState<boolean>(true);
	const onChange = (_e: React.SyntheticEvent, value: boolean) => setExpanded(value);
	const labels = useLocalization('OrderShippingInfo').Labels;

	return (
		<Stack>
			<Accordion
				elevation={4}
				id="order-details-group"
				data-testid="order-details-group"
				defaultExpanded={true}
				{...(isStatic ? { expanded: true } : { onChange })}
			>
				<AccordionSummary
					aria-controls={`${id}-content`}
					id={`${id}-header`}
					sx={accordionSummarySX}
					expandIcon={
						<>
							{isStatic ? null : !expanded ? (
								<>
									<Button
										data-testid="order-show-group-details"
										id="order-show-group-details"
										size="small"
										sx={orderDetailSubsectionSX}
									>
										<Typography variant="body2">{labels.ShowGroupDetails.t()}</Typography>
									</Button>
									<ExpandMoreIcon />
								</>
							) : (
								<>
									<Button
										data-testid="order-hide-group-details"
										id="order-hide-group-details"
										size="small"
										sx={orderDetailSubsectionSX}
									>
										<Typography variant="body2">{labels.HideGroupDetails.t()}</Typography>
									</Button>
									<ExpandLessIcon />
								</>
							)}
						</>
					}
				>
					{heading ? <>{heading}</> : null}
				</AccordionSummary>
				<Divider />
				<AccordionDetails sx={{ p: 2 }}>
					<Stack spacing={1}>
						{detailsArray.filter(Boolean).map((detail, index) => (
							<Fragment key={index}>{detail}</Fragment>
						))}
					</Stack>
				</AccordionDetails>
			</Accordion>
		</Stack>
	);
};
