/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { useAllowableShippingModesByContract } from '@/data/Content/AllowableShippingModesByContract';
import { useUser } from '@/data/User';
import { getContractIdParamFromContext } from '@/data/utils/getContractIdParamFromContext';

export const useAllowableShippingModes = () => {
	const { user } = useUser();
	const contractIdParam = getContractIdParamFromContext(user?.context);
	return useAllowableShippingModesByContract(contractIdParam);
};
