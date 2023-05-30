/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ShippingInfoError } from '@/components/blocks/ShippingInfoError';
type Props = {
	text: string;
};
export const generateShippingInfoError = ({ text }: Props) => ({
	text: <ShippingInfoError {...{ text }} />,
});
