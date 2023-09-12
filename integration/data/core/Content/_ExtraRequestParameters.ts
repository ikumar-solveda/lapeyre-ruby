/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { extractParamsOfConcern, useNextRouter } from '@/data/Content/_NextRouter';
import { constructClientPreviewTokenHeaderRequestParams } from '@/data/utils/constructRequestParams';
import { useMemo } from 'react';

/**
 * Build extra header parameter, in particular WCPreviewToken header.
 * @returns header parameters with PreviewToken
 */
export const useExtraRequestParameters = () => {
	const { asPath } = useNextRouter();
	const {
		queryOfConcern: { WCPreviewToken: previewToken },
	} = extractParamsOfConcern(asPath);
	const params = useMemo(
		() => constructClientPreviewTokenHeaderRequestParams(previewToken),
		[previewToken]
	);
	return params;
};
