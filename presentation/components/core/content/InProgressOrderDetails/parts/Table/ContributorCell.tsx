/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { OrderItem } from '@/data/types/Order';
import { Stack, Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useContext, type FC } from 'react';

export const InProgressOrderDetailsTableContributorCell: FC<CellContext<OrderItem, unknown>> = ({
	row,
}) => {
	const { data } = useContext(ContentContext) as ReturnType<typeof useInProgressOrderDetails>;
	const nls = useLocalization('InProgressOrderDetails');
	const { xitem_firstName = '', xitem_lastName = '', xitem_memberId } = row.original;
	return (
		<TableCellResponsiveContent label={nls.Table.contributors.t()}>
			<Stack>
				<Stack>
					<Typography>
						{nls.Contributor.t({ firstName: xitem_firstName, lastName: xitem_lastName })}
					</Typography>
				</Stack>
				<Stack>
					<Typography variant="caption">
						{xitem_memberId === data?.buyerId ? nls.AdminCaption.t() : nls.ContributorCaption.t()}
					</Typography>
				</Stack>
			</Stack>
		</TableCellResponsiveContent>
	);
};
