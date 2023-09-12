/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ID } from '@/data/types/Basic';
import {
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerAttachmentDescriptionContainer,
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainer,
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerAttachmentAssetContainer,
	ComIbmCommerceRestMarketingHandlerEventHandlerEventTriggerClickinfo,
} from 'integration/generated/transactions/data-contracts';

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
};
