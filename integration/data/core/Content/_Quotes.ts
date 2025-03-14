/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024, 2025.
 */

import { PAGINATION_CONFIGS } from '@/data/config/PAGINATION_CONFIGS';
import { ATTACHMENTS, QUOTEITEMS } from '@/data/constants/quotes';
import { CommentsAuxResponse } from '@/data/types/Quote';
import {
	BulkQuoteItemDTO,
	CommentDTO,
	CommentsResponse,
	QuoteDTO,
	QuoteItemBaseDTO,
	QuoteItemDTO,
	QuoteUpdateDTO,
} from 'integration/generated/rfq-pbc/data-contracts';
import rfqPbcQuote from 'integration/generated/rfq-pbc/rfqPbcQuote';
import rfqPbcComment from 'integration/generated/rfq-pbc/rfqPbcQuoteComment';
import rfqPbcFileUpload from 'integration/generated/rfq-pbc/rfqPbcQuoteFileUpload';
import rfqPbcQuoteItem from 'integration/generated/rfq-pbc/rfqPbcQuoteItem';
import type { RequestParams } from 'integration/generated/transactions/http-client';

type SortPaginationProps = {
	offset?: number;
	limit?: number;
	sort?: string;
};

/**
 * function provided by material: https://raw.githubusercontent.com/mui/material-ui/refs/tags/v6.1.8/docs/data/material/components/avatars/BackgroundLetterAvatars.tsx
 */
const stringToColor = (string: string) => {
	let hash = 0;
	let i;
	let color = '#';

	// eslint-disable-next-line functional/no-loop-statement
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	// eslint-disable-next-line functional/no-loop-statement
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}

	return color;
};

const commentsMapper = (response: CommentsResponse) => {
	if (response?.contents) {
		response.contents = response.contents.map((comment) => {
			const { createdBy = { firstName: '', lastName: '' } } = comment;
			const { firstName, lastName } = createdBy;
			const full = `${firstName} ${lastName}`.trim();
			return {
				...comment,
				initials: `${firstName[0] ?? ' '}${lastName[0] ?? ' '}`.trim(),
				avatarColor: full ? stringToColor(full) : '',
			};
		});
	}
	return response as CommentsAuxResponse;
};

export const quotesFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		params: RequestParams = {},
		status: string | undefined,
		fromDate: string | undefined,
		toDate: string | undefined,
		searchTerm: string | undefined,
		{ offset, limit, sort }: SortPaginationProps
	): Promise<any> =>
		await rfqPbcQuote(pub).getQuotes(
			{ storeId, status, fromDate, toDate, searchTerm, offset, limit, sort },
			params
		);

export const quotesDeleter =
	(pub: boolean) =>
	async (quoteId: string, params: RequestParams = {}) =>
		await rfqPbcQuote(pub).deleteQuoteById(quoteId, params);

export const quotesCanceler =
	(pub: boolean) =>
	async (quoteId: string, params: RequestParams = {}) =>
		await rfqPbcQuote(pub).cancelQuote(quoteId, params);

export const quotesCreator =
	(pub: boolean) =>
	async (quote: QuoteDTO, params: RequestParams = {}) =>
		await rfqPbcQuote(pub).createQuote(quote, params);

export const quoteByIdFetcher =
	(pub: boolean) =>
	async (quoteId: string, params: RequestParams = {}) =>
		await rfqPbcQuote(pub).getQuoteById(quoteId, params);

export const quoteByIdUpdater =
	(pub: boolean) =>
	async (quoteId: string, quoteData: QuoteUpdateDTO, params: RequestParams = {}) =>
		await rfqPbcQuote(pub).updateQuoteById(quoteId, quoteData, params);

export const commentsFetcher = (pub: boolean) => async (quoteId: string) =>
	commentsMapper(await rfqPbcComment(pub).getCommentsByQuoteId(quoteId));

export const commentsUpdater = (pub: boolean) => async (quoteId: string, commentData: CommentDTO) =>
	await rfqPbcComment(pub).createQuoteComment(quoteId, commentData);

export const quoteSubmitter =
	(pub: boolean) =>
	async (quoteId: string, params: RequestParams = {}) =>
		await rfqPbcQuote(pub).submitQuote(quoteId, params);

export const quoteAccepter =
	(pub: boolean) =>
	async (quoteId: string, params: RequestParams = {}) =>
		await rfqPbcQuote(pub).acceptQuote(quoteId, params);

export const quoteDecliner =
	(pub: boolean) =>
	async (quoteId: string, params: RequestParams = {}) =>
		await rfqPbcQuote(pub).rejectQuote(quoteId, params);

export const quoteItemFetcher =
	(pub: boolean) =>
	async (quoteId: string, searchTerm: string | undefined, { offset, limit }: SortPaginationProps) =>
		await rfqPbcQuoteItem(pub).getQuoteItems(quoteId, { searchTerm, offset, limit });

export const quoteItemUpdater =
	(pub: boolean) => async (quoteId: string, id: string, quoteItem: QuoteItemBaseDTO) =>
		await rfqPbcQuoteItem(pub).updateQuoteItem(quoteId, id, quoteItem);

export const quoteItemDeleter = (pub: boolean) => async (quoteId: string, ids: string) =>
	await rfqPbcQuoteItem(pub).deleteQuoteItemsByIds(quoteId, { itemIds: ids });

export const quoteItemCreator =
	(pub: boolean) => async (quoteId: string, quoteItem: QuoteItemDTO) =>
		await rfqPbcQuoteItem(pub).createQuoteItem(quoteId, quoteItem);

export const productsCSVUploader = (pub: boolean) => async (quoteId: string, file: File) =>
	await rfqPbcFileUpload(pub).initiatesQuoteFileUpload(
		quoteId,
		{ UpLoadedFile: file },
		{
			uploadType: QUOTEITEMS,
		}
	);

export const attachmentsUploader = (pub: boolean) => async (quoteId: string, file: File) =>
	await rfqPbcFileUpload(pub).initiatesQuoteFileUpload(
		quoteId,
		{ UpLoadedFile: file },
		{
			uploadType: ATTACHMENTS,
		}
	);

export const attachmentsFetcher =
	(pub: boolean) =>
	async (
		quoteId: string,
		query: {
			offset: number;
			limit: number;
		} = { offset: PAGINATION_CONFIGS.pageDefaultOffset, limit: PAGINATION_CONFIGS.pageLimit },
		params: RequestParams = {}
	) =>
		await rfqPbcFileUpload(pub).getQuoteFileUploadStatus(
			quoteId,
			{ uploadType: ATTACHMENTS, ...query },
			params
		);

export const fileStatusFetcher =
	(pub: boolean) => async (quoteId: string, ids: string, uploadTypeBoolean?: boolean) =>
		await rfqPbcFileUpload(pub).getQuoteFileUploadStatus(quoteId, {
			ids,
			uploadType: uploadTypeBoolean ? QUOTEITEMS : ATTACHMENTS,
		});

export const attachmentsDeleter = (pub: boolean) => async (quoteId: string, ids: string) =>
	await rfqPbcFileUpload(pub).deletesQuoteAttachment(quoteId, ids);

export const quoteBulkItemCreator =
	(pub: boolean) => async (quoteId: string, data: BulkQuoteItemDTO) =>
		await rfqPbcQuoteItem(pub).createBulkQuoteItems(quoteId, data);
