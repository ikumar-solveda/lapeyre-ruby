/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { UnitPriceDisplay } from '@/components/blocks/UnitPriceDisplay';
import { OrderItemTableRowData } from '@/components/content/OrderItemTable/parts/Table';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { ContentContext } from '@/data/context/content';
import { FC, useContext } from 'react';

export const OrderItemUnitPrice: FC = () => {
	const {
		itemDetails: { unitPrice, currency: unitPriceCurrency },
		details: { prices },
	} = useContext(ContentContext) as OrderItemTableRowData & ReturnType<typeof useOrderItemTableRow>;

	return (
		<UnitPriceDisplay unitPriceCurrency={unitPriceCurrency} unitPrice={unitPrice} prices={prices} />
	);
};

// TODO: Add actual uom
