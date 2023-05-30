/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { BasicAddress, PaymentInfo } from '@/data/types/Order';
import { PersonSingleContact } from 'integration/generated/transactions/data-contracts';
import { Dictionary } from 'lodash';

export type PaymentCardAction = {
	text: string;
	handleClick: () => void | Promise<void>;
	enableConfirmation?: boolean;
};

export type PaymentCardProps = {
	paymentInfo: PaymentInfo;
	paymentNumber: number;
	readOnly?: boolean;
	address: BasicAddress;
};

export type PaymentCardContextValues = {
	billingAddressMap: Dictionary<PersonSingleContact>;
	getPaymentCardActions?: (paymentNumber: number) => PaymentCardAction[];
};
