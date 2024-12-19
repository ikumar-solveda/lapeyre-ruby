/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Settings } from '@/data/Settings';
import { ID } from '@/data/types/Basic';
import type {
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerAttachmentDescriptionContainer,
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainer,
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerAttachmentAssetContainer,
	ComIbmCommerceRestMarketingHandlerEventHandlerEventTriggerClickinfo,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { UrlObject } from 'url';

export type ESpotActivityContainer =
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainer;

export type ESpotEvent = ComIbmCommerceRestMarketingHandlerEventHandlerEventTriggerClickinfo & {
	[extra: string]: string;
};

export type EventData = {
	id: string;
	event: ESpotEvent;
};

export type ProcessedContent = {
	id?: ID;
	contentUrl?: string;
	asset?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerAttachmentAssetContainer;
	text?: string;
	assetDescription?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerAttachmentDescriptionContainer;
	contentId?: string;
	contentName?: string;
	assetList?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerAttachmentAssetContainer[];
};

type MarketingViewBasePayload = {
	settings: Settings;
	params: RequestParams;
};

export type MarketingItemListViewPayload = MarketingViewBasePayload & {
	categoryId: string;
};

export type MarketingProductViewPayload = MarketingViewBasePayload & {
	productId: string;
};

export type MarketingSearchResultsViewPayload = MarketingViewBasePayload & {
	searchTerm: string;
};

export type MarketingCategoryViewPayload = MarketingViewBasePayload & {
	categoryId: string;
};

export type ParsedContentURL = {
	action: string;
	parsedContentUrl: string | UrlObject;
} & Record<string, string>;

export type DM_SubstitutionProps = {
	name: string;
	value: string;
};
