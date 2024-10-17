/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_ALLOWABLE_SHIPPING_MODES } from '@/data/constants/dataKey';
import { SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import { ShippingModesResponse } from '@/data/types/AllowedShipMode';
import { ID } from '@/data/types/Basic';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { transactionsShippingInfo } from 'integration/generated/transactions';
import { ComIbmCommerceRestOrderHandlerCartHandlerShippingModes } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { keyBy } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { useMemo } from 'react';
import useSWR from 'swr';

const allowableShippingModesDataMap = ({
	usableShippingMode = [],
}: ComIbmCommerceRestOrderHandlerCartHandlerShippingModes) =>
	keyBy(
		usableShippingMode.filter((mode) => mode.shipModeCode !== SHIP_MODE_CODE_PICKUP),
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
			return (await transactionsShippingInfo(pub).cartGetAllowableShippingModes(
				storeId,
				query,
				params
			)) as ShippingModesResponse;
		} catch (error) {
			if (pub) {
				throw error;
			}
			errorWithId(
				getRequestId(context),
				'_AllowableShippingModes: allowableShippingModesFetcher: error: %o',
				{ error }
			);
			return undefined;
		}
	};

export const useAllowableShippingModesByContract = (contractParam: { contractId: string[] }) => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const router = useNextRouter();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { data, error } = useSWR(
		storeId
			? [{ storeId, query: { langId, ...contractParam } }, DATA_KEY_ALLOWABLE_SHIPPING_MODES]
			: null,
		async ([props]) => allowableShippingModesFetcher(true)(props.storeId, props.query, params)
	);

	const { allowableShippingModes, pickupInStoreShipMode, deliveryShipMode } = useMemo(() => {
		const allowableShippingModes = data ? allowableShippingModesDataMap(data) : data;
		const pickupInStoreShipMode = data
			? data.usableShippingMode?.find((mode) => mode?.shipModeCode === SHIP_MODE_CODE_PICKUP)
			: data;
		const deliveryShipMode = data
			? data.usableShippingMode?.find((mode) => mode?.shipModeCode !== SHIP_MODE_CODE_PICKUP)
			: data;
		return { allowableShippingModes, pickupInStoreShipMode, deliveryShipMode };
	}, [data]);

	return {
		loading: !error && !data,
		error,
		allowableShippingModes,
		pickupInStoreShipMode,
		deliveryShipMode,
	};
};
