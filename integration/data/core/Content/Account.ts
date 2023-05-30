/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useUser } from '@/data/User';

export const useAccount = () => {
	const { mutateUser } = useUser();
	return {
		mutateUser,
	};
};
