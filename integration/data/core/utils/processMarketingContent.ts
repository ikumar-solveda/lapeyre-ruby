/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	MARKETING_SPOT_DATA_TYPE,
	CONTENT_FORMAT_FILE,
	CONTENT_FORMAT_TEXT,
	CONTENT_MIME_TYPE_IMAGE,
} from '@/data/constants/marketing';
import { ProcessedContent } from '@/data/types/Marketing';
import { ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainer } from 'integration/generated/transactions/data-contracts';
// baseMarketingSpotDataType === 'MarketingContent'
// no DX support
/**
 * "contentFormatName": "Text"
 * "contentFormatName": "File"
 *        "contentMimeType": "image", e.g. logo
 *        attachmentAsset list.
 */

type BaseMarketingSpotData =
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainer;

export const processMarketingContent = (content: BaseMarketingSpotData): ProcessedContent => {
	if (content.baseMarketingSpotDataType === MARKETING_SPOT_DATA_TYPE.CONTENT) {
		if (content.contentFormatName === CONTENT_FORMAT_TEXT) {
			return {
				id: content.baseMarketingSpotActivityID,
				text: content.marketingContentDescription?.at(0)?.marketingText || '',
				contentUrl: content.contentUrl,
			};
		}
		if (
			content.contentFormatName === CONTENT_FORMAT_FILE &&
			content.contentMimeType === CONTENT_MIME_TYPE_IMAGE
		) {
			return {
				id: content.baseMarketingSpotActivityID,
				contentUrl: content.contentUrl,
				asset: content.attachmentAsset?.at(0),
				assetDescription: content.attachmentDescription?.at(0),
			};
		}
	}
	return {};
	// TODO List of attachments.
};
