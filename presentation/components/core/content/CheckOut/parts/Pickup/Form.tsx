/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PickupNonSelfForm } from '@/components/content/CheckOut/parts/Pickup/NonSelfForm';
import { PickupSelfForm } from '@/components/content/CheckOut/parts/Pickup/SelfForm';
import { usePickup } from '@/data/Content/Pickup';
import { ContentContext } from '@/data/context/content';
import { FC, useContext } from 'react';

/** @deprecated */
export const PickupForm: FC = () => {
	const { selfPickup } = useContext(ContentContext) as ReturnType<typeof usePickup>;
	return selfPickup ? <PickupSelfForm /> : <PickupNonSelfForm />;
};
