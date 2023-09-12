import {
	InventoryavailabilityInventoryavailability,
	InventoryavailabilityInventoryavailabilityByorderid,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class InventoryAvailability<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets inventory details for the specified product by its identifier (PartNumber). Multiple partNumbers can be passed to the URI separated by a comma (,).
	 *
	 * @tags Inventory Availability
	 * @name InventoryAvailabilityGetInventoryAvailabilityByPartNumber
	 * @summary Get details by part number
	 * @request GET:/store/{storeId}/inventoryavailability/byPartNumber/{partNumbers}
	 * @secure
	 * @response `200` `InventoryavailabilityInventoryavailability` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` If any of the specified product identifiers could not be found, or none of the specified online/physical stores exist.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	inventoryAvailabilityGetInventoryAvailabilityByPartNumber = (
		storeId: string,
		partNumbers: string,
		query?: {
			/** The Marketplace Seller ID. Multiple values are separated by commas. Example: sellerId=1,2 */
			sellerId?: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The online store name. */
			onlineStoreName?: string;
			/** The physical store names. Separate multiple values with a comma for example, physicalStoreName=China mall,Sales mall. */
			physicalStoreName?: string;
			/** User name to act on behalf of. */
			forUser?: string;
			/** User identifier to act on behalf of. */
			forUserId?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails ||
				this.traceDetails.includes('inventoryAvailabilityGetInventoryAvailabilityByPartNumber'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'inventoryAvailabilityGetInventoryAvailabilityByPartNumber',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<InventoryavailabilityInventoryavailability, void>({
			path: `/store/${storeId}/inventoryavailability/byPartNumber/${partNumbers}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets inventory details for the specified order by it's identifier (order Id).
	 *
	 * @tags Inventory Availability
	 * @name InventoryAvailabilityGetInventoryOverallAvailabilityByOrderId
	 * @summary Get details by order ID
	 * @request GET:/store/{storeId}/inventoryavailability/byOrderId/{orderId}
	 * @secure
	 * @response `200` `InventoryavailabilityInventoryavailabilityByorderid` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` If any of the specified order identifiers could not be found, or none of the specified online/physical stores exist.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId = (
		storeId: string,
		orderId: string,
		query: {
			/** The physical store identifiers. Check inventory availability in provided physical stores. Multiple values are separated by commas for example, physicalStoreId=10001,10002. */
			physicalStoreId: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The online store identifier. */
			onlineStoreId?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails ||
				this.traceDetails.includes('inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<InventoryavailabilityInventoryavailabilityByorderid, void>({
			path: `/store/${storeId}/inventoryavailability/byOrderId/${orderId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets inventory details for the specified product by its catalog entry ID. Multiple product IDs can be passed to the URI separated by a comma (,).
	 *
	 * @tags Inventory Availability
	 * @name InventoryAvailabilityGetInventoryAvailabilityByProductId
	 * @summary Get details by product identifier
	 * @request GET:/store/{storeId}/inventoryavailability/{productIds}
	 * @secure
	 * @response `200` `InventoryavailabilityInventoryavailability` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` If any of the specified product identifiers could not be found, or none of the specified online/physical stores exist.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	inventoryAvailabilityGetInventoryAvailabilityByProductId = (
		storeId: string,
		productIds: string,
		query?: {
			/** The Marketplace Seller ID. Multiple values are separated by commas. Example: sellerId=1,2 */
			sellerId?: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The online store identifier. */
			onlineStoreId?: string;
			/** The physical store identifiers. Multiple values are separated by commas. Example: physicalStoreId=10001,10002. */
			physicalStoreId?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails ||
				this.traceDetails.includes('inventoryAvailabilityGetInventoryAvailabilityByProductId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'inventoryAvailabilityGetInventoryAvailabilityByProductId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<InventoryavailabilityInventoryavailability, void>({
			path: `/store/${storeId}/inventoryavailability/${productIds}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
