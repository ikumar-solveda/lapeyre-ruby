/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { useUser } from '@/data/User';
import { getAllEligibleContractsParamFromContext } from '@/data/utils/getAllEligibleContractsParamFromContext';

type Props = {
	partNumber: string;
	orderItemId?: string;
};
export const useRequisitionListItemTableRow = ({ partNumber, orderItemId }: Props) => {
	const { user } = useUser();
	const param = getAllEligibleContractsParamFromContext(user?.context);
	const itemRowValues = useOrderItemTableRow(partNumber, param?.contractId, orderItemId);
	return itemRowValues;
};
