/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { ProductSuggestionEntry } from '@/data/types/SiteContentSuggestion';
import {
	ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummary,
	ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummaryResultList,
	ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummaryResultListUserRegistration,
} from 'integration/generated/transactions/data-contracts';

export type RequisitionListsResponse = Omit<
	ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummary,
	'resultList'
> & {
	resultList?: RequisitionListsItem[];
};
export type RequisitionListsItem = Omit<
	ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummaryResultList,
	'userRegistration'
> & {
	userRegistration?: ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummaryResultListUserRegistration;
};

export type ListCreator =
	ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummaryResultListUserRegistration;

export type ListNameType = {
	name: string;
	error: boolean;
};

export type RequisitionListSearhAndAddValue = {
	product: ProductSuggestionEntry | null;
	quantity: null | number;
};
export type CopyListProps = {
	listName: string;
	status: string;
	orderId: string;
};
export type UploadLogsData = {
	fileUploadJobId?: string;
	uploadedFile: string;
	status: string;
	uploadTime: string;
};
export type ProcessInfo = {
	FileName: string;
	ProcessedItemsNumber: number;
	FailedPartNumbers: string[];
	RequisitionListId: number;
};
export type UploadLogProcessFile = {
	processFile: {
		processInfo: string;
		startTime: string;
		endTime: string;
		userName: string;
		properties: {
			name: string;
			value: string;
		}[];
		status: string;
	}[];
	fileUploadJobId: string;
	uploadFile: {
		fileInfo: {
			fileName: string;
			fileSize: number;
			fileEncoding: string;
			filePath: string;
		};
		userName: string;
		uploadTime: string;
		properties: {
			name: string;
			value: string;
		}[];
	};
	uploadType: string;
	storeId: string;
};

export type FailedSku = {
	lineNumber: string;
	sku: string;
};

export type CreateListProps = {
	name: string;
	status: string;
};
