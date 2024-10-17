/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { BundleTable } from '@/components/content/Bundle/parts/Table';
import { useBundleDetailsTable } from '@/data/Content/BundleDetailsTable';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { BundleDetailsTableAuxiliaryContextValue } from '@/data/types/BundleDetailsTable';
import { StoreInventoryDialogContextValue } from '@/data/types/StoreInventoryDialog';
import { FC, useContext, useMemo } from 'react';

type Props = {
	pdp: ReturnType<typeof useProductDetails>;
	tableData?: ReturnType<typeof useBundleDetailsTable>;
};

export const BundleInventoryReceiver: FC<Props> = ({ pdp, tableData }) => {
	const { data } = tableData as ReturnType<typeof useBundleDetailsTable>;
	const dialogContextValue = useContext(ContentContext) as StoreInventoryDialogContextValue;
	const { candidate } = dialogContextValue;
	const embedded = true;
	const attributeStates = useMemo(() => data?.map(({ attrStates }) => attrStates), [data]);

	// refetch bundle data (to show candidate's availability instead of selected store's)
	const candidateTableData = useBundleDetailsTable({
		pdp,
		physicalStore: candidate,
		physicalStoreName: candidate.physicalStoreName,
		attributeStates,
	});

	const ctxValue = useMemo(
		() =>
			({
				...dialogContextValue,
				...pdp,
				...candidateTableData,
				embedded,
			} as BundleDetailsTableAuxiliaryContextValue & StoreInventoryDialogContextValue),
		[dialogContextValue, embedded, pdp, candidateTableData]
	);

	return (
		<ContentProvider value={ctxValue}>
			<BundleTable />
		</ContentProvider>
	);
};
