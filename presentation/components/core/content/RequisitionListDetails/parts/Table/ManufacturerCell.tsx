/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { OrderItem } from '@/data/types/Order';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext } from 'react';

export const RequisitionListDetailsTableManufacturerCell: FC<
	CellContext<OrderItem, string>
> = () => {
	const {
		details: { manufacturer },
	} = useContext(ContentContext) as ReturnType<typeof useOrderItemTableRow>;
	const localization = useLocalization('RequisitionListItems');
	return (
		<TableCellResponsiveContent label={localization.manufacturer.t()}>
			{manufacturer}
		</TableCellResponsiveContent>
	);
};
