/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { inProgressOrderDetailsTableToggleAttributesIconSX } from '@/components/content/InProgressOrderDetails/styles/Table/toggleAttributesIcon';
import { useLocalization } from '@/data/Localization';
import type { OrderItem } from '@/data/types/Order';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton, Tooltip } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useMemo, type FC } from 'react';

export const InProgressOrderDetailsTableCollapsibleCell: FC<CellContext<OrderItem, unknown>> = ({
	row,
}) => {
	const nls = useLocalization('InProgressOrderDetails');
	const open = row.getIsExpanded();
	const label = useMemo(() => (open ? nls.Table.hide.t() : nls.Table.show.t()), [nls, open]);
	return (
		<TableCellResponsiveContent label={label}>
			<Tooltip title={label}>
				<IconButton
					aria-label={label}
					aria-expanded={row.getIsExpanded()}
					color="primary"
					onClick={row.getToggleExpandedHandler()}
				>
					<KeyboardArrowRightIcon sx={inProgressOrderDetailsTableToggleAttributesIconSX(open)} />
				</IconButton>
			</Tooltip>
		</TableCellResponsiveContent>
	);
};
