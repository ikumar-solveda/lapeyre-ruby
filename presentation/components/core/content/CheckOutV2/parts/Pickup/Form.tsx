/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CheckOutV2PickupNonSelfForm } from '@/components/content/CheckOutV2/parts/Pickup/NonSelfForm';
import { CheckOutV2PickupSelfForm } from '@/components/content/CheckOutV2/parts/Pickup/SelfForm';
import { usePickup } from '@/data/Content/Pickup';
import { ContentContext } from '@/data/context/content';
import { FC, useContext } from 'react';

export const CheckOutV2PickupForm: FC = () => {
	const { selfPickup } = useContext(ContentContext) as ReturnType<typeof usePickup>;
	return selfPickup ? <CheckOutV2PickupSelfForm /> : <CheckOutV2PickupNonSelfForm />;
};
