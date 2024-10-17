/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { orderDetailsV2AccordionSummarySX } from '@/components/blocks/OrderDetailsV2/styles/accordionSummary';
import { orderDetailsV2SectionDetailsSX } from '@/components/blocks/OrderDetailsV2/styles/sectionDetails';
import { orderDetailV2SubsectionSX } from '@/components/blocks/OrderDetailsV2/styles/subsection';
import { useLocalization } from '@/data/Localization';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionProps,
	AccordionSummary,
	Button,
	Divider,
	Stack,
	Typography,
} from '@mui/material';
import { Fragment, ReactNode, useMemo, useState } from 'react';

type Props = {
	heading: ReactNode;
	details: JSX.Element | JSX.Element[];
	isStatic?: boolean;
	accordionProps?: AccordionProps;
	id: string;
};

export const OrderDetailsV2Section: React.FC<Props> = ({
	heading,
	details,
	isStatic,
	id,
	accordionProps: myAccordionProps = {},
}) => {
	const detailsArray = Array.isArray(details) ? details : [details];
	const [expanded, setExpanded] = useState<boolean>(true);
	const onChange = (_e: React.SyntheticEvent, value: boolean) => setExpanded(value);
	const orderShippingInfoNLS = useLocalization('OrderShippingInfo');
	const accordionProps = useMemo(
		() => ({
			elevation: 4,
			defaultExpanded: true,
			...(isStatic ? { expanded: true } : { onChange }),
			...myAccordionProps,
		}),
		[myAccordionProps, isStatic]
	);
	return (
		<Accordion
			id={`order-details-group-${id}`}
			data-testid={`order-details-group-${id}`}
			{...accordionProps}
		>
			<AccordionSummary
				aria-controls={`order-details-group-details-${id}`}
				id={`order-details-group-summary-${id}`}
				data-testid={`order-details-group-summary-${id}`}
				sx={orderDetailsV2AccordionSummarySX}
				expandIcon={
					<>
						{isStatic ? null : !expanded ? (
							<>
								<Button
									data-testid={`order-show-group-details-${id}`}
									id={`order-show-group-details-${id}`}
									size="small"
									sx={orderDetailV2SubsectionSX}
								>
									<Typography variant="body2">
										{orderShippingInfoNLS.Labels.ShowGroupDetails.t()}
									</Typography>
								</Button>
								<ExpandMoreIcon />
							</>
						) : (
							<>
								<Button
									data-testid={`order-hide-group-details-${id}`}
									id={`order-hide-group-details-${id}`}
									size="small"
									sx={orderDetailV2SubsectionSX}
								>
									<Typography variant="body2">
										{orderShippingInfoNLS.Labels.HideGroupDetails.t()}
									</Typography>
								</Button>
								<ExpandLessIcon />
							</>
						)}
					</>
				}
			>
				{heading}
			</AccordionSummary>
			<Divider />
			<AccordionDetails
				sx={orderDetailsV2SectionDetailsSX}
				id={`order-details-group-details-${id}`}
				data-testid={`order-details-group-details-${id}`}
			>
				<Stack spacing={1} useFlexGap>
					{detailsArray.filter(Boolean).map((detail, index) => (
						<Fragment key={index}>{detail}</Fragment>
					))}
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
