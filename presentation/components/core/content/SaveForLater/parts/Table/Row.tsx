/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { TableData } from '@/components/content/SaveForLater';
import { SaveForLaterTableActions } from '@/components/content/SaveForLater/parts/Table/Actions';
import { SaveForLaterTableItemDetails } from '@/components/content/SaveForLater/parts/Table/ItemDetails';
import { SaveForLaterTableItemDetailsCompact } from '@/components/content/SaveForLater/parts/Table/ItemDetailsCompact';
import { SaveForLaterTableMoveToCart } from '@/components/content/SaveForLater/parts/Table/MoveToCart';
import { SaveForLaterTablePrice } from '@/components/content/SaveForLater/parts/Table/Price';
import { saveForLaterTableCellSX } from '@/components/content/SaveForLater/styles/tableCell';
import { useSaveForLaterTableRow } from '@/data/Content/SaveForLaterTableRow';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { Switch } from '@/utils/switch';
import { Row } from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export const SaveForLaterTableRow: FC<{ row: Row<TableData> }> = ({ row }) => {
	const { partNumber } = row.original.itemDetails;
	const { product, color, loading, isValidating } = useSaveForLaterTableRow(partNumber);
	const { view, isSaveForLaterList } = useContext(ContentContext) as {
		view: string;
		isSaveForLaterList: boolean;
	};
	const rowValues = useMemo(
		() => ({
			...row.original,
			product,
			color,
			loading,
			isValidating,
			isSaveForLaterList,
		}),
		[row.original, product, color, loading, isValidating, isSaveForLaterList]
	);

	return (
		<ContentProvider value={rowValues}>
			<TableRow
				id={`save-for-later-table-row-${row.id}`}
				data-testid={`save-for-later-table-row-${row.id}`}
			>
				{row.getVisibleCells().map((cell) => (
					<TableCell
						key={`save-for-later-table-cell-${cell.id}`} // cell.id is {row.id}_{column.id}
						id={`save-for-later-table-cell-${cell.id}`}
						data-testid={`save-for-later-table-cell-${cell.id}`}
						sx={saveForLaterTableCellSX}
					>
						{Switch(cell.column.id)
							.case('itemDetails', () =>
								view === 'compact' ? (
									<SaveForLaterTableItemDetailsCompact />
								) : (
									<SaveForLaterTableItemDetails />
								)
							)
							.case('moveToCart', () => <SaveForLaterTableMoveToCart />)
							.case('price', () => <SaveForLaterTablePrice />)
							.case('actions', () => <SaveForLaterTableActions />)
							.defaultTo(() => null)}
					</TableCell>
				))}
			</TableRow>
		</ContentProvider>
	);
};
