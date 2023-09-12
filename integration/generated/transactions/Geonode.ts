import { GeonodeGeonode, GeonodeGeonodes } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Geonode<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets the geo nodes by the parent geo node unique ID. The response schema will flatten the result if a single object is returned in the list.
	 *
	 * @tags Geonode
	 * @name GeonodeFindGeoByParentGeoId
	 * @summary Gets by parent unique ID
	 * @request GET:/store/{storeId}/geonode/byParentGeoNode/{parentgeoid}
	 * @secure
	 * @response `200` `GeonodeGeonode` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	geonodeFindGeoByParentGeoId = (
		storeId: string,
		parentgeoid: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('geonodeFindGeoByParentGeoId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'geonodeFindGeoByParentGeoId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<GeonodeGeonode, void>({
			path: `/store/${storeId}/geonode/byParentGeoNode/${parentgeoid}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Finds geo nodes based on query name. See each query for details on input and output.
	 *
	 * @tags Geonode
	 * @name GeonodeFindByQuery
	 * @summary Get by query
	 * @request GET:/store/{storeId}/geonode
	 * @secure
	 * @response `200` `(GeonodeGeonode | GeonodeGeonodes)` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	geonodeFindByQuery = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byGeoNodeTypeAndName';
			/** The store type. */
			type: 'CITY' | 'CNTY' | 'PROV' | 'STAT';
			/** The store name. */
			name: string;
			/** The site level search flag.  If it is 'true', a site level search will be performed; otherwise, a store level search will be performed.  Optional parameter; when it is not set, it is defaulted to 'true'.. */
			siteLevelSearch?: 'true' | 'false';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('geonodeFindByQuery'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'geonodeFindByQuery',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<GeonodeGeonode | GeonodeGeonodes, void>({
			path: `/store/${storeId}/geonode`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets the top geo nodes for the site. The response schema will flatten the result if a single object is returned in the list.
	 *
	 * @tags Geonode
	 * @name GeonodeFindTopGeoNodes
	 * @summary Gets by site top-nodes
	 * @request GET:/store/{storeId}/geonode/byTopGeoNode
	 * @secure
	 * @response `200` `GeonodeGeonode` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	geonodeFindTopGeoNodes = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The site level search flag.  If it is 'true', a site level search will be performed; otherwise, a store level search will be performed.  Optional parameter; when it is not set, it is defaulted to 'true'.. */
			siteLevelSearch?: 'true' | 'false';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('geonodeFindTopGeoNodes'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'geonodeFindTopGeoNodes',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<GeonodeGeonode, void>({
			path: `/store/${storeId}/geonode/byTopGeoNode`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
