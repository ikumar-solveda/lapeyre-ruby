import {
	ComIbmCommerceRestWishlistHandlerWishlistHandlerCreateBodyParameterDescription,
	ComIbmCommerceRestWishlistHandlerWishlistHandlerDeleteWishListResponse,
	ComIbmCommerceRestWishlistHandlerWishlistHandlerProcessBodyParameterDescription,
	ComIbmCommerceRestWishlistHandlerWishlistHandlerUpdateBodyParameterDescription,
	ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListResponse,
	ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListUpdateResponse,
	WishlistWishlist,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Wishlist<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets all of the shopper's wish lists.
	 *
	 * @tags Wishlist
	 * @name WishlistFindWishlist
	 * @summary Get all wish lists
	 * @request GET:/store/{storeId}/wishlist/@self
	 * @secure
	 * @response `200` `WishlistWishlist` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	wishlistFindWishlist = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/**
			 * Page number. Valid values are positive integers starting at 1. Use pageNumber with pageSize.
			 * @format int32
			 */
			pageNumber?: number;
			/**
			 * Page size. Used to limit the amount of data returned by a query. Valid values are integers starting with 1. Use pageSize with pageNumber.
			 * @format int32
			 */
			pageSize?: number;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('wishlistFindWishlist')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'wishlistFindWishlist',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<WishlistWishlist, void>({
			path: `/store/${storeId}/wishlist/@self`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Gets the shopper's default wish list.
	 *
	 * @tags Wishlist
	 * @name WishlistFindWishlistByUserIdDefault
	 * @summary Get default wish list
	 * @request GET:/store/{storeId}/wishlist/@default
	 * @secure
	 * @response `200` `WishlistWishlist` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	wishlistFindWishlistByUserIdDefault = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('wishlistFindWishlistByUserIdDefault')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'wishlistFindWishlistByUserIdDefault',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<WishlistWishlist, void>({
			path: `/store/${storeId}/wishlist/@default`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Gets the shopper's wish list items by wish list ExternalId or by ExternalId and GuestAccesskey. If only ExternalId is specified, the user must be authenticated.
	 *
	 * @tags Wishlist
	 * @name WishlistFindWishlistItemsByExternalId
	 * @summary Get with list items by external ID
	 * @request GET:/store/{storeId}/wishlist/{externalId}/item
	 * @secure
	 * @response `200` `WishlistWishlist` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	wishlistFindWishlistItemsByExternalId = (
		externalId: string,
		storeId: string,
		query: {
			/**
			 * Page number. Valid values are positive integers starting at 1. Use pageNumber with pageSize.
			 * @format int32
			 */
			pageNumber: number;
			/**
			 * Page size. Used to limit the amount of data returned by a query. Valid values are integers starting with 1. Use pageSize with pageNumber.
			 * @format int32
			 */
			pageSize: number;
			/** Wish list guest access key. */
			guestAccessKey?: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('wishlistFindWishlistItemsByExternalId')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'wishlistFindWishlistItemsByExternalId',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<WishlistWishlist, void>({
			path: `/store/${storeId}/wishlist/${externalId}/item`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Gets the shopper's wish list by ExternalId or by ExternalId and GuestAccesskey. If only ExternalId is specified, the user must be authenticated.  If ExternalId in not specified then it will be  redirected to /store/{storeId}/wishlist and will give userId not defined.
	 *
	 * @tags Wishlist
	 * @name WishlistFindWishlistByExternalId
	 * @summary Get wish list by external ID
	 * @request GET:/store/{storeId}/wishlist/{externalId}
	 * @secure
	 * @response `200` `WishlistWishlist` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	wishlistFindWishlistByExternalId = (
		externalId: string,
		storeId: string,
		query?: {
			/** Wish list guest access key. */
			guestAccessKey?: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('wishlistFindWishlistByExternalId')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'wishlistFindWishlistByExternalId',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<WishlistWishlist, void>({
			path: `/store/${storeId}/wishlist/${externalId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Updates the wish list to change the description or to add or update an item.
	 *
	 * @tags Wishlist
	 * @name WishlistUpdateWishlist
	 * @summary Update wish list
	 * @request PUT:/store/{storeId}/wishlist/{externalId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListUpdateResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	wishlistUpdateWishlist = (
		storeId: string,
		externalId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** When set to true, a new item in a request is added to the wish list. When false or missing, the wish list description and/or item is updated with the information in the request. Default is false. */
			addItem?: 'true' | 'false';
		},
		data?: ComIbmCommerceRestWishlistHandlerWishlistHandlerUpdateBodyParameterDescription,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('wishlistUpdateWishlist')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'wishlistUpdateWishlist',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListUpdateResponse,
			void
		>({
			path: `/store/${storeId}/wishlist/${externalId}`,
			method: 'PUT',
			query: query,
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Processes a wish list.
	 *
	 * @tags Wishlist
	 * @name WishlistProcessWishlist
	 * @summary Process wish list
	 * @request POST:/store/{storeId}/wishlist/{externalId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListResponse` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	wishlistProcessWishlist = (
		storeId: string,
		externalId: string,
		query?: {
			/** The action of the rest service. Action parameter is required for storing announcement */
			action?: 'announce';
		},
		data?: ComIbmCommerceRestWishlistHandlerWishlistHandlerProcessBodyParameterDescription,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('wishlistProcessWishlist')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'wishlistProcessWishlist',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListResponse,
			void
		>({
			path: `/store/${storeId}/wishlist/${externalId}`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Deletes a wish list or delete an item from a wish list. Specify an itemId or a productId to delete only that item from the wish list; otherwise the entire wish list is deleted. When both itemId and productId are provided, itemId is used ONLY.
	 *
	 * @tags Wishlist
	 * @name WishlistDeleteWishlist
	 * @summary Delete wish list or wish list item
	 * @request DELETE:/store/{storeId}/wishlist/{externalId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestWishlistHandlerWishlistHandlerDeleteWishListResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	wishlistDeleteWishlist = (
		storeId: string,
		externalId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** Specifies the ID of the wish list item to delete. If this parameter and productId are missing or blank, the entire wish list is deleted. */
			itemId?: string;
			/** Specifies the id of the wish list product to delete. If this parameter and itemId are missing or blank, the entire wish list is deleted. */
			productId?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('wishlistDeleteWishlist')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'wishlistDeleteWishlist',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestWishlistHandlerWishlistHandlerDeleteWishListResponse,
			void
		>({
			path: `/store/${storeId}/wishlist/${externalId}`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Get the wishlists for a specific user.
	 *
	 * @tags Wishlist
	 * @name WishlistGetWishlist
	 * @summary Get the wishlists for a specific user
	 * @request GET:/store/{storeId}/wishlist
	 * @secure
	 * @response `200` `WishlistWishlist` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	wishlistGetWishlist = (
		storeId: string,
		query: {
			/** The user ID. */
			userId: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The pageSize must be specified for paging to work. */
			pageNumber?: number;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The pageNumber must be specified for paging to work. */
			pageSize?: number;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('wishlistGetWishlist')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'wishlistGetWishlist',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<WishlistWishlist, void>({
			path: `/store/${storeId}/wishlist`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Creates a wish list. The wish list can contain items, or be empty.
	 *
	 * @tags Wishlist
	 * @name WishlistCreateWishlist
	 * @summary Create wish list
	 * @request POST:/store/{storeId}/wishlist
	 * @secure
	 * @response `200` `ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListResponse` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	wishlistCreateWishlist = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestWishlistHandlerWishlistHandlerCreateBodyParameterDescription,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('wishlistCreateWishlist')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'wishlistCreateWishlist',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListResponse,
			void
		>({
			path: `/store/${storeId}/wishlist`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
}
