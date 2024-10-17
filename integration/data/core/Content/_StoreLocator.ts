/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ByPhysicalStoreIdParams } from '@/data/constants/storeLocator';
import { ID } from '@/data/types/Basic';
import { LatLng, SelectedStoreLocator, StoreDetails, StoreLocator } from '@/data/types/Store';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { transactionsStoreLocator } from 'integration/generated/transactions';
import {
	StorelocatorStorelocator,
	StorelocatorStorelocatorItem,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';

export const dataMap = (data: StorelocatorStorelocator): StoreDetails[] => {
	const physicalStores =
		data?.PhysicalStore?.map(
			(s: StorelocatorStorelocatorItem) =>
				({
					id: s.uniqueID,
					storeName: s.Description?.at(0)?.displayStoreName,
					physicalStoreName: s.storeName,
					storeFullAddress: `${s.addressLine?.at(0)}, ${s.city} ${s.stateOrProvinceName} ${
						s.postalCode
					}`,
					phone: s.telephone1,
					coordinates: {
						lng: Number(s.longitude?.trim()),
						lat: Number(s.latitude?.trim()),
					} as LatLng,
					attributes: s.Attribute,
					x_defaultFulfillmentCenterId: s.x_defaultFulfillmentCenterId,
					x_defaultFulfillmentCenterExtId: s.x_defaultFulfillmentCenterExtId,
				} as StoreDetails)
		) ?? [];
	return physicalStores;
};

export const onLocationUpdate = (
	data: StorelocatorStorelocator | undefined,
	storeLocator: SelectedStoreLocator,
	preferredCenter: LatLng,
	context: StoreLocator
) => {
	const noResults = data?.recordSetCount === '0' && data?.recordSetComplete;
	const physicalOrNoResults = data?.PhysicalStore || noResults;
	const noSearch = physicalOrNoResults ? false : true;
	const doCenter = physicalOrNoResults || !storeLocator.selectedStore?.storeName;
	const storeList = doCenter ? (data?.PhysicalStore ? dataMap(data) : []) : undefined;
	return {
		noSearch,
		center: doCenter ? preferredCenter : context.center,
		storeList: storeList ?? context.storeList,
	};
};

export const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		latitude: string,
		longitude: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		params: RequestParams
	) => {
		try {
			const data = await transactionsStoreLocator(pub).storeLocatorFindStores(
				storeId,
				latitude,
				longitude,
				query,
				params
			);
			return data;
		} catch (error) {
			errorWithId(getRequestId(context), '_StoreLocator: fetcher error', { error });
		}
	};

export const byPhysicalStoreIdFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ storeId, physicalStoreId, query = {}, params }: ByPhysicalStoreIdParams) => {
		try {
			const data = dataMap(
				await transactionsStoreLocator(pub).storeLocatorFindByStoreUniqueId(
					storeId,
					physicalStoreId,
					query,
					params
				)
			).at(0);
			return data;
		} catch (error) {
			errorWithId(getRequestId(context), '_StoreLocator: fetcher error', { error });
			if (!pub) {
				return undefined;
			}
			throw error;
		}
	};
