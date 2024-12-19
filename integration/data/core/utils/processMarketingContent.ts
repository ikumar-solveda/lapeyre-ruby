/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	CONTENT_FORMAT_FILE,
	CONTENT_FORMAT_TEXT,
	MARKETING_SPOT_DATA_TYPE,
} from '@/data/constants/marketing';
import { ProcessedContent } from '@/data/types/Marketing';
import type {
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainer,
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerMarketingSpotDataTitleContainer,
} from 'integration/generated/transactions/data-contracts';
// baseMarketingSpotDataType === 'MarketingContent'
// no DX support
/**
 * "contentFormatName": "Text"
 * "contentFormatName": "File"
 *        "contentMimeType": "image", e.g. logo
 *        attachmentAsset list.
 */

type BaseMarketingSpotData =
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainer &
		ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerMarketingSpotDataTitleContainer;

export const processMarketingContent = (content: BaseMarketingSpotData): ProcessedContent => {
	if (
		(content.baseMarketingSpotDataType ?? content.marketingSpotDataTitleDataType) ===
		MARKETING_SPOT_DATA_TYPE.CONTENT
	) {
		const { contentId, contentName } = content;
		if (content.contentFormatName === CONTENT_FORMAT_TEXT) {
			return {
				id: content.baseMarketingSpotActivityID ?? content.marketingSpotDataTitleActivityID,
				text: content.marketingContentDescription?.at(0)?.marketingText || '',
				contentUrl: content.contentUrl,
				contentId,
				contentName,
			};
		}
		if (content.contentFormatName === CONTENT_FORMAT_FILE) {
			return {
				id: content.baseMarketingSpotActivityID ?? content.marketingSpotDataTitleActivityID,
				contentUrl: content.contentUrl,
				asset: content.attachmentAsset?.at(0),
				assetDescription: content.attachmentDescription?.at(0),
				assetList: content.attachmentAsset,
				contentId,
				contentName,
			};
		}
	}
	return {};
};
