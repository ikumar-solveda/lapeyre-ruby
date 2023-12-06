/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import { ShippingModesResponse } from '@/data/types/AllowedShipMode';
import { ID } from '@/data/types/Basic';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { error as logError } from '@/data/utils/loggerUtil';
import { transactionsShippingInfo } from 'integration/generated/transactions';
import { ComIbmCommerceRestOrderHandlerCartHandlerShippingModes } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { intersectionBy, keyBy } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { useMemo } from 'react';
import useSWR from 'swr';

const DATA_KEY = 'ALLOWABLE_SHIPPING_MODES';

const allowableShippingModesDataMap = ({
	usableShippingMode = [],
}: ComIbmCommerceRestOrderHandlerCartHandlerShippingModes) =>
	keyBy(
		intersectionBy(usableShippingMode, 'shipModeId').filter(
			(mode) => mode.shipModeCode !== SHIP_MODE_CODE_PICKUP
		),
		'shipModeId'
	);

const allowableShippingModesFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		params: RequestParams
	): Promise<ShippingModesResponse | undefined> => {
		try {
			const res = (await transactionsShippingInfo(pub).cartGetAllowableShippingModes(
				storeId,
				query,
				params
			)) as ShippingModesResponse;
			return res;
		} catch (error) {
			if (pub) {
				throw error;
			}
			logError(
				context?.req,
				'_AllowableShippingModes: allowableShippingModesFetcher: error: %o',
				error
			);
			return undefined;
		}
	};

export const useAllowableShippingModes = () => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const router = useNextRouter();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { data, error } = useSWR(
		storeId ? [{ storeId, query: { langId } }, DATA_KEY] : null,
		async ([props]) => allowableShippingModesFetcher(true)(props.storeId, props.query, params),
		{ revalidateOnFocus: false }
	);

	const { allowableShippingModes, pickupInStoreShipMode } = useMemo(() => {
		const allowableShippingModes = data ? allowableShippingModesDataMap(data) : data;
		const pickupInStoreShipMode = data
			? data.usableShippingMode.find((mode) => mode?.shipModeCode === SHIP_MODE_CODE_PICKUP)
			: data;
		return { allowableShippingModes, pickupInStoreShipMode };
	}, [data]);

	return {
		loading: !error && !data,
		error,
		allowableShippingModes,
		pickupInStoreShipMode,
	};
};
