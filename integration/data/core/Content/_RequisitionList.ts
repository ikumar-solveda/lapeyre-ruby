/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ORDER_CONFIGS } from '@/data/constants/order';
import { UPLOAD_ACTION } from '@/data/constants/requisitionLists';
import { RequisitionListsResponse } from '@/data/types/RequisitionLists';
import type {
	ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListConfigurationAddRequest,
	ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListSubmitRequest,
	ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListUpdateRequest,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsRequisitionList from 'integration/generated/transactions/transactionsRequisitionList';

/**
 * fetch a list of requisition lists
 * @param pub
 * @returns
 */
export const requisitionListsFetcher =
	(pub: boolean) =>
	/**
	 * Fetch list of requisition lists.
	 * @param query object, The request query
	 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
	 *                                  we are using it to send cookie header.
	 * @returns Fetched requisition lists.
	 */
	async (
		{
			storeId,
			q = 'usable',
			...query
		}: {
			storeId: string;
			q?: 'usable' | 'self';
			orderBy?: string | string[];
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The pageSize must be specified for paging to work. */
			pageNumber?: number;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The pageNumber must be specified for paging to work. */
			pageSize?: number;
		},
		params: RequestParams
	): Promise<RequisitionListsResponse> =>
		(await transactionsRequisitionList(pub).requisitionListDetail(
			storeId,
			{ q, ...query },
			params
		)) as unknown as RequisitionListsResponse;

/**
 * Fetch a requisition list by ID.
 * @param query object, The request query
 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
 *                                  we are using it to send cookie header.
 * @returns Fetched requisition lists.
 */
export const requisitionListFetcher =
	(pub: boolean) =>
	/**
	 * Fetch a requisition list by ID.
	 * @param query The request query
	 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
	 *                                  we are using it to send cookie header.
	 * @returns Fetched requisition list by Id.
	 */
	async (storeId: string, requisitionListId: string, params: RequestParams = {}): Promise<any> =>
		await transactionsRequisitionList(pub).requisitionListDetail2(
			storeId,
			requisitionListId,
			params
		);
/**
 * Create a requisition list.
 */
export const requisitionListsCreator =
	(pub: boolean) =>
	async (
		{
			storeId,
			langId,
			name,
			status,
		}: { storeId: string; langId: string; name: string; status: string },
		params: RequestParams = {}
	) =>
		await transactionsRequisitionList(pub).requisitionListCreate(
			storeId,
			{ action: EMPTY_STRING, langId } as any, // spec issue, the error message will be returned in this language.
			{
				name,
				status,
			} as unknown as ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListConfigurationAddRequest,
			params
		);

/**
 * update a requisition item.
 */
export const requisitionListItemUpdate =
	(pub: boolean) =>
	async (
		{
			storeId,
			langId,
			requisitionListId,
			data,
		}: {
			storeId: string;
			langId: string;
			requisitionListId: string;
			data: { orderItemId?: string; partNumber?: string; quantity: number };
		},
		params: RequestParams = {}
	) => {
		await transactionsRequisitionList(pub).requisitionListCreate2(
			storeId,
			requisitionListId,
			{ action: 'updateItem', langId } as any, // spec issue
			data as unknown as ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListSubmitRequest,
			params
		);
	};

/**
 * Submit a requisition list to order.
 */
export const requisitionListSubmitToCart =
	(pub: boolean) =>
	async (
		{
			storeId,
			requisitionListId,
			langId,
			data = {},
		}: {
			storeId: string;
			requisitionListId: string;
			langId: string;
			data?: { mergeToCurrentPendingOrder?: 'Y' | 'N'; offerId?: string[]; contractId?: string[] };
		},
		params: RequestParams = {}
	) =>
		await transactionsRequisitionList(pub).requisitionListCreate2(
			storeId,
			requisitionListId,
			{ action: 'submit', langId } as any, // spec issue
			{
				mergeToCurrentPendingOrder: 'Y', // Default to yest.
				calculationUsage: ORDER_CONFIGS.calculationUsage,
				...data,
			} as unknown as ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListSubmitRequest,
			params
		);

/**
 * Delete a requisition list.
 */
export const requisitionListDelete =
	(pub: boolean) =>
	async (
		{
			storeId,
			requisitionListId,
		}: {
			storeId: string;
			requisitionListId: string;
		},
		params: RequestParams = {}
	) => {
		await transactionsRequisitionList(pub).requisitionListDelete(
			storeId,
			requisitionListId,
			params
		);
	};

/**
 * update requisition list details. e.g. name and status
 * @param pub
 * @returns
 */
export const requisitionListUpdate =
	(pub: boolean) =>
	async (
		{
			storeId,
			requisitionListId,
			query,
		}: {
			storeId: string;
			requisitionListId: string;
			query: ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListUpdateRequest;
		},
		params: RequestParams = {}
	) => {
		await transactionsRequisitionList(pub).requisitionListUpdate(
			storeId,
			requisitionListId,
			query,
			params
		);
	};

/**
 * Upload a requisition list csv file.
 */
export const requisitionListsFileUpload =
	(pub: boolean) =>
	async (
		{
			storeId,
			data,
		}: {
			storeId: string;
			data: { UpLoadedFile: File | null; URL: string };
		},
		params: RequestParams = {}
	) => {
		await transactionsRequisitionList(pub).requisitionListCreate(
			storeId,
			{ action: UPLOAD_ACTION },
			data as unknown as ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListConfigurationAddRequest,
			params
		);
	};

/**
 * Duplicate a requisition list.
 */
export const requisitionListCopy =
	(pub: boolean) =>
	async (
		{
			storeId,
			data,
		}: {
			storeId: string;
			data: {
				orderId: string;
				name: string;
				status: string;
				langId: string;
				[key: string]: unknown;
			};
		},
		params: RequestParams = {}
	) =>
		await transactionsRequisitionList(pub).requisitionListCreate(
			storeId,
			{ action: 'copy' },
			data as unknown as ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListConfigurationAddRequest,
			params
		);
