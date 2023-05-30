/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PersonCheckoutProfilesItem } from '@/data/types/CheckoutProfiles';
import { Order } from '@/data/types/Order';
import { keyBy } from 'lodash';

export const checkoutProfilePaymentConstructor = (
	order: Order,
	profile: PersonCheckoutProfilesItem,
	cc_cvc = ''
) => {
	const { billing_addressId: billing_address_id, xchkout_ProfileId: ordProfileId } = profile;
	const paymentInfo = keyBy(profile.protocolData, 'name');
	const rc = {
		piAmount: order.grandTotal,
		valueFromProfileOrder: 'Y',
		ordProfileId,
		billing_address_id,
		payMethodId: paymentInfo.payment_method.value as string,
		cc_cvc,
	};
	return rc;
};
