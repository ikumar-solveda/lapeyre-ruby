import {
	CartAssignedPromotionCode,
	ComIbmCommerceRestOrderHandlerAssignedPromotionCodeHandlerApplyPromotionCodeBody,
	ComIbmCommerceRestOrderHandlerAssignedPromotionCodeHandlerApplyPromotionCodeResponse,
	ComIbmCommerceRestOrderHandlerAssignedPromotionCodeHandlerRemovePromotionCodeResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class AssignedPromotionCode<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Assigned Promotion Code
	 * @name GetAssignedPromotioncodeInfo
	 * @summary Gets assigned promotion codes for the shopping cart.
	 * @request GET:/store/{storeId}/cart/@self/assigned_promotion_code
	 * @secure
	 * @response `200` `CartAssignedPromotionCode` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `404` `void` The specified resource couldn't be found.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	getAssignedPromotioncodeInfo = (
		storeId: string,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('getAssignedPromotioncodeInfo'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'getAssignedPromotioncodeInfo',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartAssignedPromotionCode, void>({
			path: `/store/${storeId}/cart/@self/assigned_promotion_code`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Assigned Promotion Code
	 * @name CartSelfAssignedPromotionCodeCreate
	 * @summary Applies promotion codes to the shopping cart.
	 * @request POST:/store/{storeId}/cart/@self/assigned_promotion_code
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerAssignedPromotionCodeHandlerApplyPromotionCodeResponse` No response was specified
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	cartSelfAssignedPromotionCodeCreate = (
		storeId: string,
		data: ComIbmCommerceRestOrderHandlerAssignedPromotionCodeHandlerApplyPromotionCodeBody,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartSelfAssignedPromotionCodeCreate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartSelfAssignedPromotionCodeCreate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerAssignedPromotionCodeHandlerApplyPromotionCodeResponse,
			void
		>({
			path: `/store/${storeId}/cart/@self/assigned_promotion_code`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Assigned Promotion Code
	 * @name CartSelfAssignedPromotionCodeDelete
	 * @summary Removes promotion codes from the shopping cart.
	 * @request DELETE:/store/{storeId}/cart/@self/assigned_promotion_code/{promoCode}
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerAssignedPromotionCodeHandlerRemovePromotionCodeResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartSelfAssignedPromotionCodeDelete = (
		storeId: string,
		promoCode: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartSelfAssignedPromotionCodeDelete'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartSelfAssignedPromotionCodeDelete',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerAssignedPromotionCodeHandlerRemovePromotionCodeResponse,
			void
		>({
			path: `/store/${storeId}/cart/@self/assigned_promotion_code/${promoCode}`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
