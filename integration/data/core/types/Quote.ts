/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import type { DIALOG_STATES } from '@/data/constants/quotes';
import type { ProductType } from '@/data/types/Product';
import type {
	CommentDTO,
	CommentsResponse,
	Contract,
	FileUploadDTO,
	QuoteDTO,
	QuoteItemDTO,
} from 'integration/generated/rfq-pbc/data-contracts';

export type QuoteItem = QuoteDTO;

export type ProductItem = QuoteItemDTO;
export type FileAttachment = FileUploadDTO;

export type CREATE_QUOTE_STEP = 'details' | 'products' | 'attachments' | 'requests' | 'comments';

export type QuoteDetails = {
	title: string;
	description: string;
	dirty?: boolean;
};

export type CommentItem = CommentDTO;
export type ContractItem = Contract;

export type DISCOUNT_TYPE = 'UNIT' | 'PERCENTAGE' | 'AMOUNT';

export type QuoteProductsTableContextValues = {
	detailsView?: boolean;
	editProposedPrice?: boolean;
	productsDetailsData?: ProductType[];
	decimalPlaces?: string;
	currency?: string;
	locale?: string;
};

export type QuoteDialogStateType = (typeof DIALOG_STATES)[keyof typeof DIALOG_STATES];
export type Comment = CommentItem & {
	initials: string;
	avatarColor: string;
};

export type CommentsAuxResponse = Omit<CommentsResponse, 'contents'> & {
	contents: Comment[];
};
