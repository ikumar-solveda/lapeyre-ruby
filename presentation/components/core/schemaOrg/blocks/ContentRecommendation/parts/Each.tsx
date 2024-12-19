/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { OFFER_ID, PROMOTION_KEYWORD } from '@/data/constants/schemaOrg';
import { ProcessedContent } from '@/data/types/Marketing';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import { FC, useMemo } from 'react';
import { Offer } from 'schema-dts';

export const ContentRecommendationEach: FC<{ content: ProcessedContent; emsName: string }> = (
	props
) => {
	const { emsName, content } = props;
	const { display, schema } = useMemo(() => {
		const display = !!emsName.toLocaleLowerCase().includes(PROMOTION_KEYWORD);
		const schema = display
			? JSON.stringify({
					'@type': 'Offer',
					name: content?.contentName || EMPTY_STRING,
					url: content?.contentUrl || EMPTY_STRING,
					id: content?.contentId || EMPTY_STRING,
					text: content?.text || EMPTY_STRING,
			  } as Offer)
			: undefined;
		return { display, schema };
	}, [content, emsName]);

	return display ? (
		<Head>
			{HTMLReactParser(`<script
                id="${OFFER_ID}${emsName}-${content?.contentId}"
                type="application/ld+json"
                >${schema}</script>`)}
		</Head>
	) : null;
};
