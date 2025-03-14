/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useContract } from '@/data/Content/Contract';
import { useLanguageAndCurrency } from '@/data/Content/LanguageAndCurrency';
import { useNotifications } from '@/data/Content/Notifications';
import { useOrganization } from '@/data/Content/Organization';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import {
	attachmentsDeleter,
	attachmentsFetcher,
	attachmentsUploader,
	commentsFetcher,
	commentsUpdater,
	fileStatusFetcher,
	productsCSVUploader,
	quoteByIdFetcher,
	quoteByIdUpdater,
	quotesCreator,
	quoteSubmitter,
} from '@/data/Content/_Quotes';
import { useLocalization } from '@/data/Localization';
import {
	dFix,
	getActiveOrganizationId,
	getContractIdParamFromContext,
	useSettings,
} from '@/data/Settings';
import { useUser } from '@/data/User';
import {
	DATA_KEY_QUOTE_ATTACHMENTS,
	DATA_KEY_QUOTE_BY_ID,
	DATA_KEY_QUOTE_COMMENTS,
	DATA_KEY_QUOTE_UPLOAD_FILE_STATUS,
} from '@/data/constants/dataKey';
import { LOAD_MORE_PAGINATION } from '@/data/constants/loadMorePagination';
import { EMPTY_STRING } from '@/data/constants/marketing';
import {
	ATTACHMENTS,
	DiscountType,
	FILE_UPLOAD_STATUS_REFRESH_INTERVAL,
	QUOTEITEMS,
} from '@/data/constants/quotes';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { FileInputValue } from '@/data/types/FormInput';
import { DISCOUNT_TYPE, QuoteDetails } from '@/data/types/Quote';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { warnWithId } from '@/data/utils/loggerUtil';
import {
	quoteAttachmentsMutatorKeyMatcher,
	quoteItemsMutatorKeyMatcher,
	quoteMutatorKeyMatcher,
} from '@/data/utils/mutatorKeyMatchers/quoteMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { SelectChangeEvent } from '@mui/material';
import type {
	CommentDTO,
	Contract,
	FileUploadsResponse,
	Organization,
	QuoteBaseDTO,
	QuoteData,
	QuoteDTO,
	QuoteUpdateDTO,
	Store,
	User,
} from 'integration/generated/rfq-pbc/data-contracts';
import { type ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';
import useSWRInfinite from 'swr/infinite';

const initialQuoteDetails: QuoteDetails = {
	title: EMPTY_STRING,
	description: EMPTY_STRING,
};

export const useQuoteCreateEdit = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId, storeName } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { showSuccessMessage, notifyError, showErrorMessage, showMessage } = useNotifications();
	const labels = useLocalization('Quotes');
	const routes = useLocalization('Routes');

	const { user } = useUser();
	const { byId } = useOrganization();
	const organizationId = getActiveOrganizationId(user?.context)?.organizationId ?? '';
	const orgVal = useMemo(() => byId?.[organizationId]?.displayName, [byId, organizationId]);
	const { contracts } = useContract();
	const { contractVal = EMPTY_STRING, contractId = EMPTY_STRING } = useMemo(() => {
		const contractId = getContractIdParamFromContext(user?.context)?.contractId?.at(0);
		return { contractVal: contracts?.[contractId], contractId };
	}, [user, contracts]);
	const quoteIdFromQuery = useMemo(() => router.query.quoteId as string, [router.query.quoteId]);
	const [quoteId, setQuoteId] = useState<string | undefined>(quoteIdFromQuery);
	const { selectedCurrency } = useLanguageAndCurrency();
	const [activeStep, setActiveStep] = useState<number>(0);

	const [details, setDetails] = useState<QuoteDetails>(initialQuoteDetails);
	const canMoveForward = useCallback(() => {
		let rc = true;
		if (activeStep === 0 && (!details.title.trim() || !details.description.trim())) {
			setDetails((p) => ({ ...p, dirty: true }));
			rc = false;
		}
		return rc;
	}, [activeStep, details]);

	const [newRequest, setNewRequest] = useState<string>(EMPTY_STRING);
	const [newComment, setNewComment] = useState<string>(EMPTY_STRING);
	const [showDraftDialog, setShowDraftDialog] = useState<boolean>(false);
	const closeDraftDialog = useCallback(() => setShowDraftDialog(false), []);
	const [showSubmitDialog, setShowSubmitDialog] = useState<boolean>(false);

	const closeSubmitDialog = useCallback(() => setShowSubmitDialog(false), []);
	const openDraftDialog = useCallback(() => {
		if (canMoveForward()) {
			setShowDraftDialog(true);
		}
	}, [canMoveForward]);
	const openSubmitDialog = useCallback(() => {
		if (canMoveForward()) {
			setShowSubmitDialog(true);
		}
	}, [canMoveForward]);

	const handleDetailsChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const elm = event.target;
		const { name, value } = elm;
		const _name = name as keyof QuoteDetails;
		setDetails((previousDetails) => ({
			...previousDetails,
			dirty: true,
			[_name]: value,
		}));
	}, []);

	const handleRequestChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const elm = event.target;
		const { value } = elm;
		setNewRequest(value);
	}, []);

	const handleCommentChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const elm = event.target;
		const { value } = elm;
		setNewComment(value);
	}, []);

	const { data: dataQuote, mutate: mutateQuote } = useSWR(
		storeId && quoteId && user?.registeredShopper ? [{ quoteId }, DATA_KEY_QUOTE_BY_ID] : null,
		async ([{ quoteId }]) => quoteByIdFetcher(true)(quoteId as string, params)
	);
	const verifiedQuoteId = dataQuote?.id;

	const { data: commentsData, mutate: mutateComments } = useSWR(
		storeId && dataQuote?.id ? [{ id: dataQuote.id }, DATA_KEY_QUOTE_COMMENTS] : null,
		async ([{ id }]) => commentsFetcher(true)(id as string),
		{ keepPreviousData: true, revalidateOnMount: true }
	);

	const getAttachmentDataKey = useCallback(
		(pageIndex: number, previousPageData: FileUploadsResponse) => {
			if (previousPageData && !previousPageData.links?.next) return null;
			return storeId && verifiedQuoteId
				? ([
						verifiedQuoteId,
						{
							offset: pageIndex * LOAD_MORE_PAGINATION.pageLimit,
							limit: LOAD_MORE_PAGINATION.pageLimit,
						},
						DATA_KEY_QUOTE_ATTACHMENTS,
				  ] as [string, { offset: number; limit: number }, string])
				: null;
		},
		[verifiedQuoteId, storeId]
	);

	const {
		data: arrayDataAttachments,
		mutate: mutateAttachments,
		size: attachmentsPageSize,
		setSize: setAttachmentsPageSize,
		isLoading: attachmentsLoading,
		isValidating: attachmentsValidating,
	} = useSWRInfinite(
		getAttachmentDataKey,
		async ([quoteId, query]) => attachmentsFetcher(true)(quoteId as string, query),
		{ revalidateAll: true }
	);
	const dataAttachments = useMemo(
		() => (arrayDataAttachments ?? []).map((attachment) => attachment.contents).flat(),
		[arrayDataAttachments]
	);

	const hasMoreAttachment = useMemo(
		() => !!arrayDataAttachments?.at(-1)?.links?.next,
		[arrayDataAttachments]
	);

	const onAttachmentLoadMore = useCallback(() => {
		setAttachmentsPageSize(attachmentsPageSize + 1);
	}, [setAttachmentsPageSize, attachmentsPageSize]);

	const [fileIds, setFileIds] = useState<string | undefined>(undefined);
	const [productsUploadType, setProductsUploadType] = useState<boolean>(false);
	const { data: dataFileStatus, mutate: mutateFileStatus } = useSWR(
		dataQuote?.id && fileIds
			? [{ id: dataQuote.id, fileIds }, DATA_KEY_QUOTE_UPLOAD_FILE_STATUS]
			: null,
		async ([{ id, fileIds }]) => fileStatusFetcher(true)(id, fileIds, productsUploadType),
		{ refreshInterval: FILE_UPLOAD_STATUS_REFRESH_INTERVAL }
	);

	const submit = useCallback(
		async (id: string) => {
			await quoteSubmitter(true)(id);
			await mutate(quoteMutatorKeyMatcher(''), undefined);
			showSuccessMessage(labels.Msg.Submitted.t({ id }));
		},
		[labels, showSuccessMessage]
	);

	const submitQuote = useCallback((id: string) => async () => await submit(id), [submit]);

	const onCancel = useCallback(() => {
		router.push(routes.Quotes.route.t());
	}, [routes, router]);

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
		const data: QuoteDTO = {
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
		await setQuoteId(res?.id);
		await mutateQuote();
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
		mutateQuote,
	]);

	const createQuote = useCallback(async () => {
		const res = await create();
		await mutate(quoteMutatorKeyMatcher(''), undefined);
		return res;
	}, [create]);

	const updateQuoteDetails = useCallback(async () => {
		if (details.title !== dataQuote?.name || details.description !== dataQuote?.description) {
			const q: QuoteUpdateDTO = {
				name: details.title,
				description: details.description,
			};
			await quoteByIdUpdater(true)(quoteId as string, q);
			await mutate(quoteMutatorKeyMatcher(''));
		}
	}, [quoteId, details, dataQuote]);

	const onNext = useCallback(async () => {
		if (canMoveForward()) {
			try {
				if (activeStep === 0 && quoteId === undefined) {
					const res = await createQuote();
					setActiveStep(activeStep + 1);
					showSuccessMessage(labels.Msg.DraftSaved.t({ id: (res?.id as string) ?? EMPTY_STRING }));
				} else if (activeStep === 0) {
					await updateQuoteDetails();
					setActiveStep(activeStep + 1);
				}
				setActiveStep(activeStep + 1);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		}
	}, [
		canMoveForward,
		activeStep,
		quoteId,
		createQuote,
		showSuccessMessage,
		labels,
		updateQuoteDetails,
		notifyError,
	]);

	const onBack = useCallback(() => setActiveStep(activeStep - 1), [activeStep]);

	const onDraft = useCallback(async () => {
		try {
			if (activeStep === 0 && quoteId === undefined) {
				const res = await createQuote();
				showSuccessMessage(labels.Msg.DraftSaved.t({ id: (res?.id as string) ?? EMPTY_STRING }));
			} else if (activeStep === 0) {
				updateQuoteDetails();
				showSuccessMessage(labels.Msg.DraftSaved.t({ id: (quoteId as string) ?? EMPTY_STRING }));
			}
			closeDraftDialog();
			router.push(routes.Quotes.route.t());
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	}, [
		activeStep,
		closeDraftDialog,
		createQuote,
		quoteId,
		router,
		routes,
		updateQuoteDetails,
		showSuccessMessage,
		notifyError,
		labels,
	]);

	const createAndSubmit = useCallback(async () => {
		const res = await create();
		return await submit(res?.id as string);
	}, [submit, create]);

	const onSubmit = useCallback(async () => {
		try {
			if (activeStep === 0 && quoteId === undefined) {
				await createAndSubmit();
			} else if (
				(activeStep === 0 && details.title !== dataQuote?.name) ||
				details.description !== dataQuote?.description
			) {
				await updateQuoteDetails();
				await submit(quoteId as string);
			} else {
				await submit(quoteId as string);
			}
			closeSubmitDialog();
			router.push(routes.Quotes.route.t());
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	}, [
		createAndSubmit,
		dataQuote,
		details,
		submit,
		updateQuoteDetails,
		activeStep,
		closeSubmitDialog,
		quoteId,
		router,
		routes,
		notifyError,
	]);

	const onAddRequest = useCallback(async () => {
		const l =
			dataQuote?.additionalSpecification && dataQuote.additionalSpecification.length > 0
				? dataQuote.additionalSpecification.length + 1
				: 1;
		const qd: QuoteData = {
			name: 'request' + l,
			description: newRequest.trim(),
			dataType: 'string',
			value: EMPTY_STRING,
		};
		const specificationData = dataQuote?.additionalSpecification ?? [];
		specificationData.push(qd);
		const q: QuoteUpdateDTO = { additionalSpecification: specificationData };
		try {
			await quoteByIdUpdater(true)(quoteId as string, q);
			await mutateQuote();
			setNewRequest(EMPTY_STRING);
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	}, [mutateQuote, notifyError, newRequest, quoteId, dataQuote]);

	const onAddComment = useCallback(async () => {
		const createdBy: User = {
			id: user?.userId as string,
			firstName: (user?.firstName as string) ?? EMPTY_STRING,
			lastName: (user?.lastName as string) ?? EMPTY_STRING,
			email: (user?.email as string) ?? EMPTY_STRING,
		};
		const c: CommentDTO = {
			comment: newComment.trim(),
			createdBy,
		};

		try {
			await commentsUpdater(true)(dataQuote?.id as string, c);
			await mutateComments();
			setNewComment(EMPTY_STRING);
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	}, [mutateComments, notifyError, newComment, user, dataQuote]);

	const deleteAttachment = useCallback(
		(id: number) => async () => {
			try {
				const attachment = dataAttachments?.find((attach) => attach.id === id);
				await attachmentsDeleter(true)(quoteId as string, id.toLocaleString());
				showSuccessMessage(
					labels.Msg.DeleteAttachment.t({ name: attachment?.name ?? EMPTY_STRING })
				);
				await mutateAttachments();
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[dataAttachments, labels, mutateAttachments, notifyError, quoteId, showSuccessMessage]
	);

	const deleteMultipleAttachments = useCallback(
		async (ids: number[]) => {
			try {
				const promises = ids.map((id) =>
					attachmentsDeleter(true)(quoteId as string, id.toString())
				);
				await Promise.all(promises);
				showSuccessMessage(labels.Msg.DeleteMultiAttachment.t());
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
			await mutateAttachments();
		},
		[labels, mutateAttachments, notifyError, quoteId, showSuccessMessage]
	);

	const [showFileUploadDialog, setShowFileUploadDialog] = useState<boolean>(false);
	const closeFileUploadDialog = useCallback(() => setShowFileUploadDialog(false), []);
	const openFileUploadDialog = useCallback(() => setShowFileUploadDialog(true), []);
	const [file, setFile] = useState<FileInputValue>({ value: EMPTY_STRING, files: null });

	const handleFileUploadChange = useCallback((files: File[]) => {
		const name = files.at(0)?.name ?? '';
		setFile({ value: name as string, files });
	}, []);

	const closeAndClearFileUploadDialog = useCallback(() => {
		setFileIds(undefined);
		setFile({ value: EMPTY_STRING, files: null });
		closeFileUploadDialog();
	}, [closeFileUploadDialog]);

	const onUploadProductsCSV = useCallback(
		(id?: string) => async () => {
			quoteId ?? setQuoteId(id);
			try {
				const res = await productsCSVUploader(true)(
					(quoteId as string) ?? id,
					file?.files?.[0] as File
				);
				if (res) {
					setFileIds(res.id);
					setProductsUploadType(true);
					mutateFileStatus();
				}
			} catch (e) {
				setFileIds(undefined);
				setFile({ value: EMPTY_STRING, files: null });
				closeFileUploadDialog();
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[quoteId, file, setFileIds, mutateFileStatus, notifyError, closeFileUploadDialog]
	);

	const onUploadAttachments = useCallback(
		(id?: string) => async () => {
			quoteId ?? setQuoteId(id);
			try {
				const res = await attachmentsUploader(true)(
					(quoteId as string) ?? id,
					file?.files?.[0] as File
				);
				if (res) {
					setFileIds(res.id);
					setProductsUploadType(false);
					mutateAttachments();
				}
			} catch (e) {
				setFileIds(undefined);
				setFile({ value: EMPTY_STRING, files: null });
				closeFileUploadDialog();
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[quoteId, file, mutateAttachments, notifyError, closeFileUploadDialog]
	);

	const [editProposedPrice, setEditProposedPrice] = useState<boolean>(true);
	const [discountType, setDiscountType] = useState<DISCOUNT_TYPE>(DiscountType.UNIT);

	const handleDiscountValueChange = useCallback(
		async (price: number, dType?: DISCOUNT_TYPE) => {
			const q: QuoteBaseDTO = {
				proposedAdjustmentAmount: price,
				proposedAdjustmentType: dType ?? discountType,
			};
			try {
				await quoteByIdUpdater(true)(quoteId as string, q);
				await mutateQuote();
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[quoteId, notifyError, mutateQuote, discountType]
	);

	const handleDiscountTypeChange = useCallback(
		(event: SelectChangeEvent<string>) => {
			setDiscountType(event.target.value as DISCOUNT_TYPE);
			if (event.target.value === DiscountType.UNIT) {
				setEditProposedPrice(true);
			} else {
				setEditProposedPrice(false);
			}
			handleDiscountValueChange(1, event.target.value as DISCOUNT_TYPE);
		},
		[setDiscountType, setEditProposedPrice, handleDiscountValueChange]
	);

	useEffect(() => {
		if (dataQuote) {
			setDetails({
				title: dataQuote?.name ?? EMPTY_STRING,
				description: dataQuote?.description ?? EMPTY_STRING,
			});
		}
	}, [dataQuote, orgVal, contractVal, setDetails]);

	useEffect(() => {
		const content = dataFileStatus?.contents[0];
		if (content?.uploadType === QUOTEITEMS) {
			const status = dFix(content.status ?? -1, 0);
			if (status === 2) {
				setFileIds(undefined);
				setFile({ value: EMPTY_STRING, files: null });
				mutate(quoteMutatorKeyMatcher('')); // current page only
				mutate(quoteItemsMutatorKeyMatcher(''), undefined); // multiple page products mutate
				closeFileUploadDialog();
				showSuccessMessage(labels.Msg.UploadSuccess.t());
			} else if (status === 3) {
				warnWithId(undefined, `Upload finished with error: ${content.summaryReport}`);
				setFileIds(undefined);
				setFile({ value: EMPTY_STRING, files: null });
				mutate(quoteMutatorKeyMatcher('')); // current page only
				mutate(quoteItemsMutatorKeyMatcher(''), undefined); // multiple page products mutate
				closeFileUploadDialog();
				showMessage(labels.Msg.UpLoadFinishWithErrors.t(), { severity: 'warning' });
			}
		} else if (content?.uploadType === ATTACHMENTS) {
			setFileIds(undefined);
			setFile({ value: EMPTY_STRING, files: null });
			mutate(quoteMutatorKeyMatcher(''));
			mutate(quoteAttachmentsMutatorKeyMatcher(''), undefined); // multiple page attachment mutate
			closeFileUploadDialog();
			showSuccessMessage(labels.Msg.UploadSuccess.t());
		}
	}, [
		closeFileUploadDialog,
		dataFileStatus,
		labels,
		showSuccessMessage,
		showErrorMessage,
		showMessage,
	]);

	useEffect(() => {
		setDiscountType(dataQuote?.proposedAdjustmentType as DISCOUNT_TYPE);
	}, [dataQuote]);

	return {
		quoteById: dataQuote,
		activeStep,
		setActiveStep,
		onNext,
		onBack,
		onCancel,
		initialQuoteDetails,
		handleDetailsChange,
		details,
		onDraft,
		showDraftDialog,
		closeDraftDialog,
		openDraftDialog,
		handleCommentChange,
		handleRequestChange,
		newRequest,
		newComment,
		onAddRequest,
		onAddComment,
		commentsData,
		submitQuote,
		orgVal,
		contractVal,
		openSubmitDialog,
		showSubmitDialog,
		closeSubmitDialog,
		onSubmit,
		dataAttachments,
		showFileUploadDialog,
		openFileUploadDialog,
		handleFileUploadChange,
		onUploadProductsCSV,
		onUploadAttachments,
		dataFileStatus,
		file,
		handleDiscountTypeChange,
		handleDiscountValueChange,
		editProposedPrice,
		discountType,
		closeAndClearFileUploadDialog,
		deleteAttachment,
		deleteMultipleAttachments,
		isAttachmentsLoading: attachmentsLoading || attachmentsValidating,
		hasMoreAttachment,
		onAttachmentLoadMore,
	};
};
