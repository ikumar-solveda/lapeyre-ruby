/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { quoteBulkItemCreator, quotesCreator } from '@/data/Content/_Quotes';
import { useContract } from '@/data/Content/Contract';
import { useLanguageAndCurrency } from '@/data/Content/LanguageAndCurrency';
import { useNotifications } from '@/data/Content/Notifications';
import { useOrganization } from '@/data/Content/Organization';
import { useLocalization } from '@/data/Localization';
import {
	getActiveOrganizationId,
	getContractIdParamFromContext,
	useSettings,
} from '@/data/Settings';
import type { TransactionErrorResponse } from '@/data/types/Basic';
import type { AddToQuotePayload, ProductItem, QuoteDetails, QuoteItem } from '@/data/types/Quote';
import { useUser } from '@/data/User';
import { dFix } from '@/data/utils/floatingPoint';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { quoteMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/quoteMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import type {
	Contract,
	Organization,
	Store,
	User,
} from 'integration/generated/rfq-pbc/data-contracts';
import { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import { mutate } from 'swr';

const initialQuoteDetails: QuoteDetails = {
	title: EMPTY_STRING,
	description: EMPTY_STRING,
};
type TemplateArgs = Record<string, ArgTypes>;
type ArgTypes = string | number;

export const useAddToQuote = () => {
	const { settings } = useSettings();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [isCreatingNewQuote, setIsCreatingNewQuote] = useState(false);
	const router = useNextRouter();
	const {
		storeId,
		storeName,
		langId: languageId,
	} = useMemo(() => getClientSideCommon(settings, router), [router, settings]);
	const { user } = useUser();
	const { byId } = useOrganization();
	const { selectedCurrency } = useLanguageAndCurrency();
	const organizationId = getActiveOrganizationId(user?.context)?.organizationId ?? '';
	const orgVal = useMemo(() => byId?.[organizationId]?.displayName, [byId, organizationId]);
	const { contracts } = useContract();
	const { contractVal = null, contractId = EMPTY_STRING } = useMemo(() => {
		const contractId = getContractIdParamFromContext(user?.context)?.contractId?.at(0);
		return { contractVal: contracts?.[contractId], contractId };
	}, [user, contracts]);
	const labels = useLocalization('Quotes');
	const { showSuccessMessage, notifyError } = useNotifications();
	const [quoteIdObject, setQuoteIdObject] = useState<Record<string, boolean>>({});
	const [details, setDetails] = useState<QuoteDetails>(initialQuoteDetails);
	const [data, setData] = useState<AddToQuotePayload[]>([]);

	const entitled = useMemo(
		() => !!settings.pbc?.RFQ_ENABLED && user?.registeredShopper,
		[settings, user]
	);
	const handleDetailsChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const _name = name as keyof QuoteDetails;
		setDetails((previousDetails) => ({ ...previousDetails, dirty: true, [_name]: value }));
	}, []);
	const reset = useCallback(() => {
		setIsCreatingNewQuote(false);
		setDetails(initialQuoteDetails);
		setQuoteIdObject({});
	}, []);

	const handleClose = useCallback(() => {
		setDialogOpen(false);
		reset();
	}, [reset]);

	const onAddToQuote = useCallback(async () => {
		const quoteIds = Object.keys(quoteIdObject);
		const payloadData = Object.values(
			data.reduce((acc, obj) => {
				const { partNumber, quantity } = obj;
				const parsedQuantity = dFix(quantity);
				if (!acc[partNumber]) {
					acc[partNumber] = { sku: partNumber, quantity: parsedQuantity, languageId };
				} else {
					(acc[partNumber].quantity as number) += parsedQuantity;
				}
				return acc;
			}, {} as Record<string, ProductItem>)
		);
		const uniqPartNumbers = payloadData.map((obj) => obj.sku);
		const tasks = quoteIds.map(async (quoteId) => {
			try {
				const res = await quoteBulkItemCreator(true)(quoteId, { items: payloadData });
				return { quoteId, data, success: true, res };
			} catch (error) {
				return { quoteId, data, success: false, error };
			}
		});
		const results = await Promise.all(tasks.flat());
		const successes = results.filter((result) => result.res?.status === 'SUCCESS');
		const partialSuccess = results.filter((result) => result.res?.status === 'PARTIAL_SUCCESS');
		const failures = results.filter((result) => !result.success);
		if (!failures.length && !partialSuccess.length) {
			const msgKey =
				quoteIds.length > 1
					? uniqPartNumbers.length > 1
						? 'ItemsToQuotes' // Multiple items added to multiple quotes
						: 'ItemToQuotes' // Single item added to multiple quotes
					: uniqPartNumbers.length > 1
					? 'ItemsToQuote' // Multiple items added to a single quote
					: 'ItemToQuote'; // Single item added to a single quote

			const args = {
				itemCount: `${uniqPartNumbers.length}`,
				quoteCount: `${quoteIds.length}`,
			} as unknown as TemplateArgs & ArgTypes[];

			showSuccessMessage(labels.successMessage[msgKey].t(args));
		} else if (!successes.length && !partialSuccess.length) {
			notifyError(processError(failures.at(0)?.error as TransactionErrorResponse));
		} else {
			showSuccessMessage(labels.ItemsToQuotesUnsuccessful.t());
		}
		handleClose();
		await mutate(quoteMutatorKeyMatcher(''), undefined);
	}, [quoteIdObject, data, handleClose, languageId, showSuccessMessage, labels, notifyError]);

	const onEditQuoteList = useCallback(
		(id: string, isAdd: boolean) =>
			setQuoteIdObject((previousQuoteIdObject) => {
				const updatedObject = { ...previousQuoteIdObject };
				if (isAdd) {
					updatedObject[id] = true;
				} else {
					delete updatedObject[id];
				}
				return updatedObject;
			}),
		[]
	);

	const handleOpen = useCallback(
		(data: AddToQuotePayload | AddToQuotePayload[]) => () => {
			setData(Array.isArray(data) ? data : [data]);
			setDialogOpen(true);
		},
		[]
	);

	const handleSave = useCallback(async () => {
		const quoteIds = Object.keys(quoteIdObject);
		if (quoteIds.length) {
			await onAddToQuote();
		}
	}, [onAddToQuote, quoteIdObject]);

	const handleNewQuote = useCallback(() => setIsCreatingNewQuote(true), []);

	const handleCancel = useCallback(() => {
		if (isCreatingNewQuote) {
			reset();
		} else {
			handleClose();
		}
	}, [handleClose, isCreatingNewQuote, reset]);

	const create = useCallback(async () => {
		const organization: Organization = {
			id: organizationId,
			name: orgVal ?? EMPTY_STRING,
		};
		const contract: Contract = {
			id: contractId as string,
			name: (contractVal as string) ?? EMPTY_STRING,
		};
		const {
			userId = EMPTY_STRING,
			firstName = EMPTY_STRING,
			lastName = EMPTY_STRING,
			email = EMPTY_STRING,
			phone = EMPTY_STRING,
		} = user ?? {};
		const buyer: User = { id: userId, firstName, lastName, email, phone };
		const store: Store = {
			id: storeId,
			name: storeName,
		};
		const data: QuoteItem = {
			name: details.title,
			description: details.description,
			organization,
			contract,
			buyer,
			creator: buyer,
			currency: selectedCurrency,
			store,
		};
		const res = await quotesCreator(true)(data);
		return res;
	}, [
		organizationId,
		user,
		contractId,
		details,
		selectedCurrency,
		storeId,
		contractVal,
		orgVal,
		storeName,
	]);

	const createQuote = useCallback(async () => {
		const res = await create();
		await mutate(quoteMutatorKeyMatcher(''), undefined);
		return res;
	}, [create]);

	const onDraft = useCallback(async () => {
		if (details.title.trim() && details.description.trim()) {
			try {
				const res = await createQuote();
				showSuccessMessage(labels.Msg.DraftSaved.t({ id: (res?.id as string) ?? EMPTY_STRING }));
				reset();
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		} else {
			setDetails((previousDetails) => ({ ...previousDetails, dirty: true }));
		}
	}, [createQuote, details, labels, notifyError, reset, showSuccessMessage]);

	return {
		entitled,
		dialogOpen,
		handleClose,
		handleOpen,
		handleSave,
		handleNewQuote,
		handleCancel,
		isCreatingNewQuote,
		onDraft,
		handleDetailsChange,
		details,
		orgVal,
		contractVal,
		onAddToQuote,
		data,
		onEditQuoteList,
	};
};
