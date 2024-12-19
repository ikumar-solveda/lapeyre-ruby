/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import type { FileUploadJobIBMStoreSummary } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsFileUploadJob from 'integration/generated/transactions/transactionsFileUploadJob';

/**
 * fetch a list of file upload jobs
 * @param pub
 * @returns
 */
export const fileUploadJobsFetcher =
	(pub: boolean) =>
	/**
	 * Fetch a list of file upload jobs.
	 * @param query object, The request query
	 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
	 *                                  we are using it to send cookie header.
	 * @returns Fetched a list of file upload jobs.
	 */
	async ({
		storeId,
		params,
		...query
	}: {
		storeId: string;
		params: RequestParams;
		q: string;
		numberOfDays: string;
		uploadType: string;
		pageNumber: number;
		pageSize: number;
	}): Promise<FileUploadJobIBMStoreSummary> =>
		await transactionsFileUploadJob(pub).fileUploadJobDetail2(storeId, { ...query }, params);

/**
 * Fetch a file upload job by the job ID.
 * @param query object, The request query
 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
 *                                  we are using it to send cookie header.
 * @returns Fetched file upload job.
 */
export const fileUploadJobFetcher =
	(pub: boolean) =>
	/**
	 * Fetch a file upload job by ID.
	 * @param query The request query
	 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
	 *                                  we are using it to send cookie header.
	 * @returns Fetched a file upload job.
	 */
	async ({
		storeId,
		fileUploadJobId,
		params,
		...query
	}: {
		storeId: string;
		fileUploadJobId: string;
		params: RequestParams;
		pageNumber: number;
		pageSize: number;
	}): Promise<FileUploadJobIBMStoreSummary> =>
		await transactionsFileUploadJob(pub).fileUploadJobDetail(
			storeId,
			fileUploadJobId,
			{ ...query },
			params
		);
