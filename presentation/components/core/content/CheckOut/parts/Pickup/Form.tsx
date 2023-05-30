/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { PickupSelfForm } from '@/components/content/CheckOut/parts/Pickup/SelfForm';
import { PickupNonSelfForm } from '@/components/content/CheckOut/parts/Pickup/NonSelfForm';
import { ContentContext } from '@/data/context/content';
import { usePickup } from '@/data/Content/Pickup';

export const PickupForm: FC = () => {
	const { selfPickup } = useContext(ContentContext) as ReturnType<typeof usePickup>;
	return selfPickup ? <PickupSelfForm /> : <PickupNonSelfForm />;
};
