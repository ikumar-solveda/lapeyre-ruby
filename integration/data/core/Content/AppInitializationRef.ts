/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { AppInitializationRefContext } from '@/data/context/appInitializationRefs';
import { useContext } from 'react';

export const useAppInitializationRef = () => {
	const { ref } = useContext(AppInitializationRefContext);
	return ref.current;
};
