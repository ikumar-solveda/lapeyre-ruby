/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { BundleTableRowData } from '@/data/types/Product';

export const getBundleRowSku = (row: BundleTableRowData) => {
	const { availability, selectedSku, isOneSku, partNumber: parentPartNumber } = row;
	const partNumber = selectedSku?.partNumber ?? (isOneSku ? parentPartNumber : undefined);
	return { partNumber, availability };
};
