/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useContract } from '@/data/Content/Contract';
import { useLocalization } from '@/data/Localization';
import type { ContractItem, QuoteItem } from '@/data/types/Quote';
import type { CellContext } from '@tanstack/react-table';
import { useMemo, type FC } from 'react';

export const QuotesTableContractCell: FC<CellContext<QuoteItem, ContractItem>> = ({ getValue }) => {
	const quotesTableNLS = useLocalization('QuotesTable');
	const contract = useMemo(() => getValue(), [getValue]);
	const { contracts } = useContract();
	const name = useMemo(() => contract?.name ?? contracts?.[contract?.id], [contract, contracts]);
	return (
		<TableCellResponsiveContent label={quotesTableNLS.Contract.t()}>
			{name}
		</TableCellResponsiveContent>
	);
};
