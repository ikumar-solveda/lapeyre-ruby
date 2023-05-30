/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CATEGORY_DISPLAY, EMSTYPE_LOCAL, PRODUCT_DISPLAY } from '@/data/constants/marketing';
import { ParsedUrlQuery } from 'querystring';
import { PageDataFromId } from '@/data/types/PageDataFromId';
import { Slot } from '@/data/types/Slot';
import { ID } from '@/data/types/Basic';

export const getESpotQueryParams = (
	pageData: PageDataFromId | undefined,
	_query: ParsedUrlQuery
): object => {
	switch (pageData?.tokenName) {
		case 'CategoryToken':
			return {
				categoryId: pageData.tokenValue,
				DM_ReqCmd: CATEGORY_DISPLAY,
			};
		case 'ProductToken':
			return {
				productId: pageData.tokenValue,
				DM_ReqCmd: PRODUCT_DISPLAY,
			};
		default:
			return {};
	}
};

type GetESpotParamsProps = {
	pageData: PageDataFromId | undefined;
	query: ParsedUrlQuery;
	emsName: ID;
	queryBase: Record<string, any>;
};

type ESpotParams = {
	emsName: ID;
	query: Record<string, any>;
};

export const getESpotParams = ({
	pageData,
	query,
	emsName,
	queryBase,
}: GetESpotParamsProps): ESpotParams => {
	if (pageData !== undefined) {
		const pageIdentifier =
			pageData.tokenName === 'StaticPagesToken' ? pageData.identifier : pageData.tokenExternalValue;
		const find = (pageData.layout?.slots ?? ([] as Slot[]))
			.flatMap((slot) => slot.widgets)
			.map((w) => w.properties)
			.filter(Boolean)
			.find((w) => w?.emsName === emsName);
		if (find) {
			// try to find matching eSpot in current layout -- if found, use track parameters, otherwise ignore
			return {
				emsName:
					find.emsType === EMSTYPE_LOCAL && pageIdentifier
						? pageIdentifier.replace(' ', '') + emsName
						: emsName,
				query: { ...queryBase, ...getESpotQueryParams(pageData, query) },
			};
		}
	}
	return {
		emsName,
		query: { langId: queryBase.langId },
	};
};
