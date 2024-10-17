/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Accordion } from '@/components/blocks/Accordion';
import { orderItemTableV2IconColorSX } from '@/components/content/OrderItemTableV2/styles/iconColor';
import { orderTableSectionAccordionSX } from '@/components/content/OrderTable/styles/sectionAccordion';
import { orderTableStackSX } from '@/components/content/OrderTable/styles/tableStack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Paper, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, Fragment, ReactNode } from 'react';

type OrderTableSectionProps = {
	id: string;
	label: NonNullable<ReactNode>;
	table: NonNullable<ReactNode>;
};

export const OrderTableSection: FC<OrderTableSectionProps> = ({ id, label, table }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	return isMobile ? (
		<Accordion
			id={id}
			label={label}
			sx={orderTableSectionAccordionSX}
			expandIcon={
				<Fragment>
					<RemoveCircleOutlineIcon
						data-testid={`expanded-icon-true-${id}`}
						sx={orderItemTableV2IconColorSX}
					/>
					<AddCircleOutlineIcon
						data-testid={`expanded-icon-false-${id}`}
						sx={orderItemTableV2IconColorSX}
					/>
				</Fragment>
			}
		>
			{table}
		</Accordion>
	) : (
		<Stack component={Paper} sx={orderTableStackSX}>
			{label}
			{table}
		</Stack>
	);
};
