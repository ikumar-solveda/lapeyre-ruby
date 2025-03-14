/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { inProgressOrderDetailsTableToolbarStack } from '@/components/content/InProgressOrderDetails/styles/Table/toolbarStack';
import { AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE } from '@/data/constants/inProgressOrders';
import type { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Stack, Toolbar, Typography } from '@mui/material';
import { RowSelectionState } from '@tanstack/react-table';
import { type FC, useContext, useMemo } from 'react';

export const InProgressOrderDetailsTableToolbar: FC<{
	rowSelection: RowSelectionState;
}> = ({ rowSelection }) => {
	const { onDelete, data } = useContext(ContentContext) as ReturnType<
		typeof useInProgressOrderDetails
	>;
	const nls = useLocalization('InProgressOrderDetails');
	const selectedItems = useMemo(
		() =>
			data?.orderItem
				?.filter((_, index) => rowSelection[index])
				.map(({ orderItemId }) => orderItemId) ?? [],
		[data?.orderItem, rowSelection]
	);

	return (
		<Toolbar
			id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-toolbar`}
			data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-toolbar`}
		>
			<Stack {...inProgressOrderDetailsTableToolbarStack}>
				{selectedItems.length ? (
					<>
						<Typography variant="subtitle1">
							{nls.nProductsSel.t({ n: selectedItems.length })}
						</Typography>
						<OneClick
							id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-toolbar-group-delete`}
							data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-toolbar-group-delete`}
							variant="outlined"
							onClick={onDelete(selectedItems)}
						>
							{nls.deleteSelected.t()}
						</OneClick>
					</>
				) : null}
			</Stack>
		</Toolbar>
	);
};
