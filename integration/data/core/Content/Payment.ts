/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useOrganizationDetails } from '@/data/Content/OrganizationDetails';
import { usePersonContact } from '@/data/Content/PersonContact';
import { cartCalculator, cartSummaryFetcher } from '@/data/Content/_Cart';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { avsContactUpdateOrCreate } from '@/data/Content/_PersonContactFetcher';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_PAYMENT_INFO } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { NON_CREDIT_CARD_PAYMENTS } from '@/data/constants/nonCreditCardPayment';
import { BILLING_ADDRESS_ID, UNSUPPORTED_FOR_MULTI } from '@/data/constants/payment';
import { EditableAddress } from '@/data/types/Address';
import { ID, TransactionErrorResponse } from '@/data/types/Basic';
import { Order, PaymentInfo, PaymentInstruction, PaymentToEdit } from '@/data/types/Order';
import { PaymentCardAction } from '@/data/types/PaymentCard';
import { RequestQuery } from '@/data/types/RequestQuery';
import { isMappedAddressInfoArray } from '@/data/utils/contact';
import { filterUnSupportedPayments } from '@/data/utils/filterUnSupportedPayment';
import { dAdd, dFix, dMul } from '@/data/utils/floatingPoint';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { personalContactInfoMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personalContactInfoMutatorKeyMatcher';
import { getPaymentToEdit, markSinglePaymentDirtyIfNeeded } from '@/data/utils/payment';
import { processError } from '@/data/utils/processError';
import {
	transactionsCart,
	transactionsPaymentInstruction,
} from 'integration/generated/transactions';
import {
	CartUsablePaymentInfo,
	CartUsablePaymentInformation,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { Dictionary, keyBy } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR, { KeyedMutator, useSWRConfig } from 'swr';
export { getPaymentToEdit, markSinglePaymentDirtyIfNeeded };

const usablePaymentInfoDataMap = ({ usablePaymentInformation = [] }: CartUsablePaymentInfo) =>
	filterUnSupportedPayments(usablePaymentInformation);

const usablePaymentInfoFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		params: RequestParams
	) =>
		usablePaymentInfoDataMap(
			await transactionsCart(pub).cartGetUsablePaymentInfo(storeId, query, params)
		);

export const addPaymentInstructionFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		data: any,
		// use any, since the spec not good
		params: RequestParams
	) => {
		const piResponse = await transactionsPaymentInstruction(
			pub
		).paymentInstructionAddPaymentInstruction(storeId, query, data, params);
		// calculate order again for free gift
		await cartCalculator(pub)({ storeId, params });
		return piResponse;
	};

export const deleteAllPaymentInstructionFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		params: RequestParams
	) =>
		await transactionsPaymentInstruction(pub).paymentInstructionDeleteAllPaymentInstructions(
			storeId,
			query,
			params
		);

const paymentInstructionRemover =
	(pub: boolean) =>
	async (storeId: string, pi: PaymentInfo, query: RequestQuery = {}, params: RequestParams) =>
		await transactionsPaymentInstruction(pub).paymentInstructionDeletePaymentInstruction(
			storeId,
			pi.piId as string,
			query,
			params
		);

const paymentInstructionUpdater =
	(pub: boolean) =>
	async (
		storeId: string,
		data: any,
		// use any, since the spec not good
		query: RequestQuery = {},
		params: RequestParams
	) =>
		await transactionsPaymentInstruction(pub).paymentInstructionUpdatePaymentInstruction(
			storeId,
			query,
			data,
			params
		);

const canBeUpdated = (
	payment: PaymentToEdit,
	paymentInstruction: PaymentInstruction[],
	usableByPolicy: Dictionary<CartUsablePaymentInformation>
) => {
	let rc = !!payment.piId;
	if (rc) {
		const old = paymentInstruction.find((p) => p.piId === payment.piId) as PaymentInstruction;
		rc =
			!UNSUPPORTED_FOR_MULTI[usableByPolicy[payment.policyId].paymentMethodName as string] &&
			!UNSUPPORTED_FOR_MULTI[old.payMethodId];
	}
	return rc;
};

export const usePayment = (cart: Order, _mutateCart?: KeyedMutator<Order>) => {
	const { mutate } = useSWRConfig();
	const router = useNextRouter();
	const cardText = useLocalization('AddressCard');
	const paymentCard = useLocalization('PaymentInfoCard');
	const { notifyError, showSuccessMessage } = useNotifications();
	const success = useLocalization('success-message');
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const {
		data: usablePayments,
		error: usablePaymentError,
		mutate: mutateUsablePayment,
	} = useSWR(
		storeId
			? [{ storeId, query: { langId, allPaymentMethods: true } }, DATA_KEY_PAYMENT_INFO]
			: null,
		async ([{ storeId, query }]) => usablePaymentInfoFetcher(true)(storeId, query, params)
	);
	const usableByPolicy = useMemo(() => keyBy(usablePayments, 'xumet_policyId'), [usablePayments]);
	const [methodError, setMethodError] = useState<Record<string, any>>();

	/**
	 * ==================== address ===================
	 */

	const { billingAddress: personals } = usePersonContact();
	const { org, parentOrg } = useOrganizationDetails();
	const billingAddress = useMemo(
		() => [...personals, ...org.addresses, ...parentOrg.addresses],
		[personals, org, parentOrg]
	);

	// converting to an object with nickName as key
	const billingAddressMap = useMemo(() => keyBy(billingAddress, 'nickName'), [billingAddress]);

	const toggleEditCreateAddress = useCallback(
		(address: EditableAddress | null) => () => {
			setAddressToEdit(address);
		},
		[]
	);

	/**
	 * addressToEdit and editableAddress are basically same, only differ by addressId if it is existing address.
	 * if addressId exist in addressToEdit, means we are updating, otherwise we are adding a new address
	 */
	const [addressToEdit, setAddressToEdit] = useState<EditableAddress | null>(null);

	const postSubmit = useCallback(
		(onSelect?: (name: keyof PaymentToEdit, _addressId: string) => void) =>
			async (address?: EditableAddress) => {
				mutate(personalContactInfoMutatorKeyMatcher(''), undefined);
				setAddressToEdit(null);
				address && onSelect && onSelect(BILLING_ADDRESS_ID, address.addressId ?? '');
			},
		[mutate]
	);

	const onAddressEditOrCreate = useCallback(
		(onSelect?: (name: keyof PaymentToEdit, _addressId: string) => void) =>
			async (address: EditableAddress) => {
				const { addressLine1, addressLine2, nickName, addressId, ..._address } = address;
				const data = { addressLine: [addressLine1, addressLine2 ?? ''], ..._address };
				const query = { bypassAVS: 'false' };
				const storeId = settings?.storeId ?? '';
				try {
					const res = await avsContactUpdateOrCreate(
						true,
						!!address.addressId
					)({ storeId, nickName, query, data, params });

					if (isMappedAddressInfoArray(res)) {
						return {
							validatedAddresses: res,
							editingAddress: address,
							callback: postSubmit(onSelect),
						};
					} else {
						postSubmit(onSelect)({
							...address,
							addressId: res.addressId,
						});
						const msgKey = address.addressId ? 'EDIT_ADDRESS_SUCCESS' : 'ADD_ADDRESS_SUCCESS';
						showSuccessMessage(success[msgKey].t([nickName]));
					}
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			},
		[settings?.storeId, params, postSubmit, showSuccessMessage, success, notifyError]
	);

	const getBillingAddressCardActions = (
		address: EditableAddress,
		selectedAddressId?: string,
		validAddress = true,
		onSelect?: (name: keyof PaymentToEdit, _addressId: string) => void
	) => {
		const { addressId, addressLine1 } = address;
		const isSelected = addressId === selectedAddressId;
		// only offer edit for invalid address
		// since invalid addresses are not selected at shipping
		return [
			!validAddress && {
				text: cardText.EditButton.t(),
				handleClick: toggleEditCreateAddress(address),
			},
			!isSelected &&
				addressId &&
				addressLine1 && {
					text: cardText.UseAddress.t(),
					handleClick: () => onSelect && onSelect(BILLING_ADDRESS_ID, addressId),
					variant: 'outlined',
				},
		].filter(Boolean);
	};

	/**
	 * =============== payment instruction ======================
	 */

	const paymentInstruction = useMemo(() => cart.paymentInstruction ?? [], [cart]);

	/**
	 * states for multiple payments
	 *
	 * Multiple payments: we should be able to update PI one by one instead of deleting all and add new, so that
	 * for untouched create PI, shopper do not need to type in again.
	 *
	 */
	const [paymentNumberToEdit, setPaymentNumberToEdit] = useState<number | null>(null);
	const [paymentsToEdit, setPaymentsToEdit] = useState<PaymentToEdit[]>(
		paymentInstruction.map(getPaymentToEdit)
	);

	const constructPI = (data: PaymentToEdit): PaymentInfo => {
		const {
			piId,
			policyId,
			billing_address_id,
			account,
			expire_month,
			expire_year,
			cc_cvc,
			piAmount,
		} = data;
		const { paymentMethodName: payMethodId = '', paymentTermConditionId = '' } =
			usablePayments?.find((payment) => payment.xumet_policyId === policyId) ?? {};
		let pi: PaymentInfo = { policyId, payMethodId, billing_address_id, piAmount };
		if (!NON_CREDIT_CARD_PAYMENTS.includes(payMethodId)) {
			pi = paymentTermConditionId
				? {
						valueFromPaymentTC: 'true',
						paymentTermConditionId,
						cc_brand: payMethodId,
						policyId,
						payMethodId,
						billing_address_id,
						piAmount,
				  }
				: {
						account,
						expire_month,
						expire_year,
						cc_cvc,
						cc_brand: payMethodId,
						policyId,
						payMethodId,
						billing_address_id,
						piAmount,
				  };
		}
		if (piId) {
			pi.piId = piId;
		}
		return pi;
	};

	const paymentsTotal = useMemo(
		() => paymentsToEdit.reduce((tally, payment) => dAdd(tally, payment.piAmount), 0),
		[paymentsToEdit]
	);
	const cartTotal = useMemo(() => dFix(cart?.grandTotal ?? 0), [cart]);

	useEffect(() => {
		setPaymentsToEdit(paymentInstruction.map(getPaymentToEdit));
	}, [paymentInstruction]);

	const onSinglePaymentSubmit = async (data: PaymentToEdit) => {
		const { dirty = true, piId, ...rest } = data;
		if (!dirty) {
			return true;
		}
		const pi = constructPI({ ...rest, dirty, piAmount: cart.grandTotal });
		try {
			await deleteAllPaymentInstructionFetcher(true)(storeId, { langId }, params);
			const { paymentInstruction = [] } = await addPaymentInstructionFetcher(true)(
				storeId,
				{ langId },
				{ paymentInstruction: [pi] },
				params
			);
			// payment type discount possible applied after add payment, need to update PI to new amount
			const { grandTotal } = (await cartSummaryFetcher(true)(storeId, params)) as Order;
			if (grandTotal !== cart.grandTotal && paymentInstruction.length > 0) {
				const piId = paymentInstruction.at(0)?.piId;
				const updatePi = constructPI({ ...rest, dirty, piAmount: grandTotal, piId });
				await paymentInstructionUpdater(true)(
					storeId,
					{ paymentInstruction: [updatePi] },
					undefined,
					params
				);
			}
			return await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
			return null;
		}
	};

	const onMultiDeleteSingle = async (paymentNumber: number) => {
		const storeId = settings?.storeId ?? '';
		try {
			await paymentInstructionRemover(true)(
				storeId,
				paymentsToEdit[paymentNumber],
				undefined,
				params
			);
			setPaymentNumberToEdit(null);
			await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	};

	const onMultiCreateOrEditSingle = async (data: PaymentToEdit) => {
		if (!data.dirty === false) {
			// existing
			const pi = constructPI(data);
			try {
				const canUpdate = canBeUpdated(data, paymentInstruction, usableByPolicy);
				if (pi.piId && canUpdate) {
					await paymentInstructionUpdater(true)(
						storeId,
						{ paymentInstruction: [pi] },
						undefined,
						params
					);
				} else {
					if (pi.piId) {
						// need to delete and recreate
						await paymentInstructionRemover(true)(storeId, data, undefined, params);
					}
					// create
					await addPaymentInstructionFetcher(true)(
						storeId,
						{ langId },
						{ paymentInstruction: [pi] },
						params
					);
				}
				setPaymentNumberToEdit(null);
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		} else {
			setPaymentNumberToEdit(null);
		}
	};

	const getPaymentCardActions = (paymentNumber: number): PaymentCardAction[] => [
		{
			text: paymentCard.Actions.Edit.t(),
			handleClick: () => setPaymentNumberToEdit(paymentNumber),
		},
		{
			text: paymentCard.Actions.Delete.t(),
			handleClick: () => onMultiDeleteSingle(paymentNumber),
			enableConfirmation: true,
		},
	];

	/**
	 * Gets the maximum amount allowed for this payment method based on the running total of other payments
	 */
	const getMaximumPiAmount = (paymentNumber: number) => {
		let rc: number = dFix(cart.grandTotal);
		if (paymentInstruction.length >= 1) {
			const otherPayments: PaymentInstruction[] = paymentInstruction.slice();
			otherPayments.splice(paymentNumber, 1);
			rc = dAdd(rc, dMul(-1, getRunningPaymentTotal(otherPayments)));
		}
		return rc;
	};

	/**
	 * Gets the total piAmount from the specified payment list
	 * @returns Total piAmount
	 */
	const getRunningPaymentTotal = (paymentList: PaymentInstruction[]) => {
		const rc = paymentList?.length > 0 ? dAdd(...paymentList.map((p) => p.piAmount)) : 0;
		return rc;
	};

	const validateMulti = useCallback(
		(multi: boolean, payment: PaymentToEdit) => {
			setMethodError(undefined);
			let valid = true;

			if (multi) {
				const others = paymentInstruction.filter((pi) => !payment.piId || pi.piId !== payment.piId);
				const all = [...others.map(({ xpaym_policyId }) => xpaym_policyId), payment.policyId];
				const firstInvalid = all.find(
					(policyId) => UNSUPPORTED_FOR_MULTI[usableByPolicy[policyId]?.paymentMethodName as string]
				);
				if (others.length > 0 && !!firstInvalid) {
					valid = false;
					const methodName = usableByPolicy[firstInvalid].description;
					setMethodError(() => ({ methodName }));
				}
			}
			return valid;
		},
		[paymentInstruction, usableByPolicy]
	);

	return {
		paymentsToEdit,
		usablePayments,
		billingAddressMap,
		paymentNumberToEdit,
		setPaymentNumberToEdit,
		cart,
		getBillingAddressCardActions,
		onAddressEditOrCreate,
		addressToEdit,
		editableAddress: addressToEdit,
		toggleEditCreateAddress,
		usablePaymentError,
		mutateUsablePayment,
		onSinglePaymentSubmit,
		getPaymentCardActions,
		cartTotal,
		paymentsTotal,
		onMultiCreateOrEditSingle,
		onMultiDeleteSingle,
		getMaximumPiAmount,
		validateMulti,
		methodError,
		setMethodError,
	};
};
