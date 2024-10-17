/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Accordion } from '@/components/blocks/Accordion';
import { SaveForLaterTable } from '@/components/content/SaveForLater/parts/Table';
import { SaveForLaterTableDeleteAll } from '@/components/content/SaveForLater/parts/Table/DeleteAll';
import { SaveForLaterTableMoveAll } from '@/components/content/SaveForLater/parts/Table/MoveAll';
import { saveForLaterActionButtonsPaddingSX } from '@/components/content/SaveForLater/styles/actionButtonsPadding';
import { saveForLaterActionButtonsStack } from '@/components/content/SaveForLater/styles/actionButtonsStack';
import { saveForLaterMenuStack } from '@/components/content/SaveForLater/styles/menuStack';
import { saveForLaterPaperPaddingSX } from '@/components/content/SaveForLater/styles/paperPadding';
import { ColumnWithKey, useSaveForLaterTable } from '@/data/Content/SaveForLaterTable';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentProvider } from '@/data/context/content';
import { ProductType } from '@/data/types/Product';
import { dFix } from '@/utils/floatingPoint';
import { Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Row } from '@tanstack/react-table';
import { FC, useMemo } from 'react';

export type TableData = ReturnType<typeof useSaveForLaterTable>['data'][0];

export const SaveForLater: FC<{
	products: ProductType[];
	variant?: 'full' | 'compact' | 'auto';
}> = ({ products, variant = 'auto' }) => {
	const localization = useLocalization('SaveForLaterTable');
	const { data } = useSaveForLaterTable(products);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = variant === 'auto' ? (isMobile ? 'compact' : 'full') : variant;

	const sort = useMemo(
		() => (rowA: Row<TableData>, rowB: Row<TableData>, columnId: string) => {
			const keyToCompare = rowA.getValue<ColumnWithKey>(columnId).key;
			const isNumeric: boolean | undefined = rowA.getValue<ColumnWithKey>(columnId).numeric;
			const rowAItem = rowA.getValue<ColumnWithKey>(columnId)[keyToCompare];
			const rowBItem = rowB.getValue<ColumnWithKey>(columnId)[keyToCompare];
			return isNumeric
				? dFix(rowAItem) - dFix(rowBItem)
				: String(rowAItem).localeCompare(String(rowBItem));
		},
		[]
	);

	const columns = useMemo(
		() => [
			{
				header: localization.Labels.ItemDetails.t(),
				accessorKey: 'itemDetails',
				sortingFn: sort,
			},
			{
				header: localization.Labels.Price.t(),
				accessorKey: 'price',
				sortingFn: sort,
			},
			{
				header: EMPTY_STRING,
				accessorKey: 'moveToCart',
				enableSorting: false,
			},
			{
				header: EMPTY_STRING,
				accessorKey: 'actions',
				enableSorting: false,
			},
		],
		[localization, sort]
	);

	const ctxValue = useMemo(() => ({ view, products }), [products, view]);

	return products?.length ? (
		<ContentProvider value={ctxValue}>
			{view === 'compact' ? (
				<Accordion id="saved-items" label={localization.Title.t()}>
					<Stack sx={saveForLaterActionButtonsPaddingSX} {...saveForLaterActionButtonsStack}>
						<SaveForLaterTableMoveAll />
						<SaveForLaterTableDeleteAll />
					</Stack>
					<Paper>
						<SaveForLaterTable columns={columns} data={data} />
					</Paper>
				</Accordion>
			) : (
				<Paper elevation={1} sx={saveForLaterPaperPaddingSX}>
					<Stack {...saveForLaterMenuStack}>
						<Typography variant="h6">{localization.Title.t()}</Typography>
						<Stack sx={saveForLaterActionButtonsPaddingSX} {...saveForLaterActionButtonsStack}>
							<SaveForLaterTableDeleteAll />
							<SaveForLaterTableMoveAll />
						</Stack>
					</Stack>
					<Paper>
						<SaveForLaterTable columns={columns} data={data} />
					</Paper>
				</Paper>
			)}
		</ContentProvider>
	) : null;
};
