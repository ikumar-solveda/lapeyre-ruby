/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { orderItemTableV2BackorderStack } from '@/components/content/OrderItemTableV2/styles/backorderStack';
import { StackProps } from '@mui/material';

export const orderItemTableV2AvailabilityBackorderStack: StackProps = {
	...orderItemTableV2BackorderStack,
	lineHeight: '1.2',
	useFlexGap: true,
};
