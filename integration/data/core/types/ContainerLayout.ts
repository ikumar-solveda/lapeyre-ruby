/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Slot } from '@/data/types/Slot';

export type ContainerLayout = {
	containerName?: string;
	slots?: Slot[];
	[key: string]: any;
};

export type DefaultContainerLayout = ContainerLayout & {
	isStoreDefault: true;
};
