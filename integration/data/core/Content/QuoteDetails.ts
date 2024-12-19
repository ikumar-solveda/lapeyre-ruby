/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useContract } from '@/data/Content/Contract';
import { useNotifications } from '@/data/Content/Notifications';
import { useOrganization } from '@/data/Content/Organization';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import {
	attachmentsDeleter,
	attachmentsFetcher,
	commentsFetcher,
	commentsUpdater,
	quoteAccepter,
	quoteByIdFetcher,
	quoteDecliner,
	quoteItemFetcher,
	quotesCanceler,
	quotesDeleter,
	quoteSubmitter,
} from '@/data/Content/_Quotes';
import { useLocalization } from '@/data/Localization';
import {
	getActiveOrganizationId,
	getContractIdParamFromContext,
	useSettings,
} from '@/data/Settings';
import { useUser } from '@/data/User';
import {
	DATA_KEY_QUOTE_ATTACHMENTS,
	DATA_KEY_QUOTE_BY_ID,
	DATA_KEY_QUOTE_COMMENTS,
	DATA_KEY_QUOTE_ITEMS,
} from '@/data/constants/dataKey';
import { LOAD_MORE_PAGINATION } from '@/data/constants/loadMorePagination';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { DIALOG_STATES } from '@/data/constants/quotes';
import { PAGINATION } from '@/data/constants/tablePagination';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { quoteMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/quoteMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { PaginationState } from '@tanstack/react-table';
import type {
	CommentDTO,
	FileUploadsResponse,
	User,
} from 'integration/generated/rfq-pbc/data-contracts';
import { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';
import useSWRInfinite from 'swr/infinite';

export const useQuoteDetails = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { showSuccessMessage, notifyError } = useNotifications();
	const labels = useLocalization('Quotes');
	const routes = useLocalization('Routes');

	const { user } = useUser();
	const { byId } = useOrganization();
	const organizationId = getActiveOrganizationId(user?.context)?.organizationId ?? '';
	const orgVal = useMemo(() => byId?.[organizationId]?.displayName, [byId, organizationId]);
	const { contracts } = useContract();
	const { contractVal = null } = useMemo(() => {
		const contractId = getContractIdParamFromContext(user?.context)?.contractId?.at(0);
		return { contractVal: contracts?.[contractId], contractId };
	}, [user, contracts]);
	const quoteIdFromQuery = useMemo(() => router.query.quoteId as string, [router.query.quoteId]);
	const [quoteId, setQuoteId] = useState<string | undefined>(quoteIdFromQuery);

	const [newComment, setNewComment] = useState<string>(EMPTY_STRING);
	const [showDialog, setShowDialog] = useState(false);
	const closeDialog = useCallback(() => setShowDialog(false), []);
	const openDialog = useCallback(() => setShowDialog(true), []);
	const [dialogState, setDialogState] = useState<number | undefined>(undefined);

	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});

	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const offset = useMemo(
		() => (pageIndex !== 0 ? pagination.pageIndex * pagination.pageSize + 1 : 0),
		[pagination, pageIndex]
	);
	const limit = pagination.pageSize;
	const handleCommentChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const elm = event.target;
		const { value } = elm;
		setNewComment(value);
	}, []);

	const { data: dataQuote } = useSWR(
		storeId && quoteId ? [{ quoteId }, DATA_KEY_QUOTE_BY_ID] : null,
		async ([{ quoteId }]) => quoteByIdFetcher(true)(quoteId as string, params),
		{ revalidateIfStale: true, revalidateOnFocus: true }
	);

	const verifiedQuoteId = dataQuote?.id;

	const { data: commentsData, mutate: mutateComments } = useSWR(
		storeId && verifiedQuoteId ? [{ quoteId: verifiedQuoteId }, DATA_KEY_QUOTE_COMMENTS] : null,
		async ([{ quoteId }]) => commentsFetcher(true)(quoteId as string),
		{ revalidateIfStale: true, revalidateOnFocus: true }
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
		async ([verifiedQuoteId, query]) => attachmentsFetcher(true)(verifiedQuoteId as string, query),
		{ revalidateAll: true, revalidateIfStale: true, revalidateOnFocus: true }
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
	}, [attachmentsPageSize, setAttachmentsPageSize]);

	const deleteQuote = useCallback(
		async (id: string) => {
			try {
				await quotesDeleter(true)(id);
				await mutate(quoteMutatorKeyMatcher(''));
				showSuccessMessage(labels.Msg.Deleted.t({ id }));
				router.push(routes.Quotes.route.t());
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[notifyError, showSuccessMessage, labels, router, routes]
	);

	const cancelQuote = useCallback(
		async (id: string) => {
			try {
				await quotesCanceler(true)(id);
				await setQuoteId(id);
				await mutate(quoteMutatorKeyMatcher(''), undefined);
				showSuccessMessage(labels.Msg.Canceled.t({ id }));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[notifyError, showSuccessMessage, labels]
	);

	const submitQuote = useCallback(
		async (id: string) => {
			try {
				await quoteSubmitter(true)(id);
				await mutate(quoteMutatorKeyMatcher(''), undefined);
				showSuccessMessage(labels.Msg.Submitted.t({ id }));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[notifyError, labels, showSuccessMessage]
	);

	const acceptQuote = useCallback(
		async (id: string) => {
			try {
				await quoteAccepter(true)(id);
				await mutate(quoteMutatorKeyMatcher(''), undefined);
				showSuccessMessage(labels.Msg.Accepted.t({ id }));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[notifyError, showSuccessMessage, labels]
	);

	const declineQuote = useCallback(
		async (id: string) => {
			try {
				await quoteDecliner(true)(id);
				await mutate(quoteMutatorKeyMatcher(''), undefined);
				showSuccessMessage(labels.Msg.Declined.t({ id }));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[notifyError, showSuccessMessage, labels]
	);

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
				await attachmentsDeleter(true)(quoteId as string, id.toLocaleString());
				await mutateAttachments();
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[mutateAttachments, notifyError, quoteId]
	);

	const { data: dataProducts } = useSWR(
		storeId && quoteId ? [{ quoteId, searchTerm, offset }, DATA_KEY_QUOTE_ITEMS] : null,
		async ([{ quoteId, searchTerm, offset }]) =>
			quoteItemFetcher(true)(
				quoteId as string,
				searchTerm !== EMPTY_STRING ? searchTerm : undefined,
				{ offset, limit }
			)
	);

	const { productsPageCount } = useMemo(() => {
		const totalRecords = dataProducts?.count ?? 0;
		const productsPageCount = Math.ceil(totalRecords / pageSize);
		return { productsPageCount };
	}, [dataProducts, pageSize]);

	const onSearch = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const searchTerm = event.target.value;
			setPagination({ pageIndex: 0, pageSize: PAGINATION.sizes[0] });
			setSearchTerm(searchTerm);
		},
		[setSearchTerm]
	);

	const onDialogAction = useCallback(
		(id: string) => async () => {
			if (dialogState === DIALOG_STATES.CANCEL) {
				await cancelQuote(id);
			} else if (dialogState === DIALOG_STATES.DELETE) {
				await deleteQuote(id);
			} else if (dialogState === DIALOG_STATES.SUBMIT) {
				await submitQuote(id);
			} else if (dialogState === DIALOG_STATES.ACCEPT) {
				await acceptQuote(id);
			} else if (dialogState === DIALOG_STATES.DECLINE) {
				await declineQuote(id);
			}
			closeDialog();
		},
		[dialogState, closeDialog, cancelQuote, deleteQuote, submitQuote, acceptQuote, declineQuote]
	);

	const onCloseDialog = useCallback(() => {
		setDialogState(undefined);
		closeDialog();
	}, [closeDialog, setDialogState]);

	return {
		quoteById: dataQuote,
		handleCommentChange,
		newComment,
		onAddComment,
		commentsData,
		orgVal,
		contractVal,
		dataAttachments,
		searchTerm,
		onSearch,
		pagination,
		productsPageCount,
		dataProducts,
		deleteAttachment,
		showDialog,
		openDialog,
		closeDialog,
		dialogState,
		setDialogState,
		onDialogAction,
		onCloseDialog,
		onAttachmentLoadMore,
		hasMoreAttachment,
		isAttachmentsLoading: attachmentsLoading || attachmentsValidating,
	};
};
