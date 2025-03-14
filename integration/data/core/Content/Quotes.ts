/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024, 2025.
 */

import { useContract } from '@/data/Content/Contract';
import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { quotesCanceler, quotesDeleter, quotesFetcher } from '@/data/Content/_Quotes';
import { useLocalization } from '@/data/Localization';
import { getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_QUOTES } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { DEFAULT_SORT, ORDER_BY } from '@/data/constants/quotes';
import { PAGINATION } from '@/data/constants/tablePagination';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { QuoteDialogStateType } from '@/data/types/Quote';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { processError } from '@/data/utils/processError';
import { SelectChangeEvent } from '@mui/material';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { debounce, isEmpty } from 'lodash';
import { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { quoteMutatorKeyMatcher } from '../utils/mutatorKeyMatchers/quoteMutatorKeyMatcher';

type DateRange = {
	fromDate?: string | undefined;
	toDate?: string | undefined;
};

const addOneDayOffset = (date: Date) => {
	date.setHours(date.getHours() + 23);
	date.setMinutes(date.getMinutes() + 59);
	date.setSeconds(date.getSeconds() + 59);
	date.setMilliseconds(date.getMilliseconds() + 999);
	return date;
};

export const useQuotes = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { showSuccessMessage, notifyError } = useNotifications();
	const [statuses, setStatuses] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
	const [date, setDate] = useState<DateRange | null>(null);
	const labels = useLocalization('Quotes');
	const routes = useLocalization('Routes');

	const { user } = useUser();

	const { contracts } = useContract();
	const { contractVal = null } = useMemo(() => {
		const contractId = getContractIdParamFromContext(user?.context)?.contractId?.at(0);
		return { contractVal: contracts?.[contractId] };
	}, [user, contracts]);

	const [sorting, setSorting] = useState<SortingState>([]);
	const sort = useMemo(() => {
		const sort = sorting.at(0);
		return sort ? ORDER_BY[sort.id as keyof typeof ORDER_BY](sort.desc) : DEFAULT_SORT;
	}, [sorting]);

	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});

	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const offset = useMemo(
		() => (pageIndex !== 0 ? pagination.pageIndex * pagination.pageSize : 0),
		[pagination, pageIndex]
	);
	const limit = pagination.pageSize;

	const { data, isLoading } = useSWR(
		storeId && user?.registeredShopper
			? [{ storeId, statuses, date, searchTerm, offset, limit, sort }, DATA_KEY_QUOTES]
			: null,
		async ([{ storeId, statuses, date, searchTerm, offset, limit, sort }]) =>
			quotesFetcher(true)(
				storeId,
				params,
				statuses.length > 0 ? statuses.map((s) => s).join(',') : undefined,
				!isEmpty(date?.fromDate) ? date?.fromDate : undefined,
				!isEmpty(date?.toDate) ? date?.toDate : undefined,
				searchTerm !== EMPTY_STRING ? searchTerm : undefined,
				{ offset, limit, sort }
			),
		{ keepPreviousData: true, revalidateIfStale: true, revalidateOnFocus: true }
	);

	const { quotesPageCount } = useMemo(() => {
		const totalRecords = data?.count ?? 0;
		const quotesPageCount = Math.ceil(totalRecords / pageSize);
		return { quotesPageCount };
	}, [data, pageSize]);

	const [showDialog, setShowDialog] = useState(false);
	const closeDialog = useCallback(() => setShowDialog(false), []);
	const openDialog = useCallback(() => setShowDialog(true), []);
	const [quoteId, setQuoteId] = useState<string | undefined>(undefined);
	const [dialogState, setDialogState] = useState<QuoteDialogStateType | undefined>(undefined);

	const deleteQuote = useCallback(
		async (id: string) => {
			try {
				await quotesDeleter(true)(id);
				await mutate(quoteMutatorKeyMatcher(''), undefined);
				showSuccessMessage(labels.Msg.Deleted.t({ id }));
				router.push(routes.Quotes.route.t());
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[showSuccessMessage, labels, router, routes, notifyError]
	);

	const cancelQuote = useCallback(
		async (id: string) => {
			try {
				await quotesCanceler(true)(id);
				await mutate(quoteMutatorKeyMatcher(''), undefined);
				showSuccessMessage(labels.Msg.Canceled.t({ id }));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[showSuccessMessage, labels, notifyError]
	);

	const onStatus = useCallback((event: SelectChangeEvent<string[]>) => {
		const newStatuses =
			typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
		setPagination({ pageIndex: 0, pageSize: PAGINATION.sizes[0] });
		setStatuses(newStatuses);
	}, []);

	const onDateFrom = useCallback((from: Date | null) => {
		const fromDate = from ? new Date(from).toISOString() : new Date().toISOString();
		setPagination({ pageIndex: 0, pageSize: PAGINATION.sizes[0] });
		setDate((prev) => ({ ...prev, fromDate }));
	}, []);

	const onDateTo = useCallback(
		(to: Date | null) => {
			const toDate = to ? addOneDayOffset(to).toISOString() : new Date().toISOString();
			if (date?.fromDate && new Date(toDate) < new Date(date.fromDate)) {
				return;
			} else {
				setPagination({ pageIndex: 0, pageSize: PAGINATION.sizes[0] });
				setDate((prev) => ({ ...prev, toDate }));
			}
		},
		[date]
	);

	const onClear = useCallback(() => {
		setStatuses([]);
		setDate(null);
		setPagination({ pageIndex: 0, pageSize: PAGINATION.sizes[0] });
	}, []);

	const onSearch = useMemo(
		() =>
			debounce(
				(event: ChangeEvent<HTMLInputElement>) =>
					setSearchTerm((prev) => {
						if (prev !== event.target.value.trim()) {
							setPagination({ pageIndex: 0, pageSize: PAGINATION.sizes[0] });
							return event.target.value.trim();
						} else {
							return prev;
						}
					}),
				500
			),
		[]
	);

	const onCreate = useCallback(() => {
		router.push(routes.QuoteCreateEdit.route.t());
	}, [router, routes]);

	return {
		quotes: data,
		deleteQuote,
		cancelQuote,
		onStatus,
		statuses,
		onSearch,
		contractVal,
		pagination,
		setPagination,
		quotesPageCount,
		onCreate,
		showDialog,
		openDialog,
		closeDialog,
		quoteId,
		setQuoteId,
		dialogState,
		setDialogState,
		sorting,
		setSorting,
		isLoading,
		onDateFrom,
		onDateTo,
		onClear,
		date,
	};
};
