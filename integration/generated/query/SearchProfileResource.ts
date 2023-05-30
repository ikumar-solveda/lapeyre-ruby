import { SearchProfile } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class SearchProfileResource<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Search-Profile-Resource
	 * @name GetSearchProfile
	 * @summary Get the search profile.
	 * @request GET:/api/v2/documents/profiles/{profileName}
	 * @response `200` `(SearchProfile)[]` The request is completed successfully.
	 * @response `400` `(SearchProfile)[]` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `(SearchProfile)[]` The specified resource could not be found.
	 * @response `500` `(SearchProfile)[]` Internal server error. Additional details will be contained on the server logs.
	 */
	getSearchProfile = (profileName: string, params: RequestParams = {}) => {
		if (!this.traceDetails || this.traceDetails.includes('getSearchProfile')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'getSearchProfile',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<SearchProfile[], SearchProfile[]>({
			path: `/api/v2/documents/profiles/${profileName}`,
			method: 'GET',
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Search-Profile-Resource
	 * @name UpdateSearchProfile
	 * @summary Update the search profile.
	 * @request PUT:/api/v2/documents/profiles/{profileName}
	 * @response `200` `Record<string, string>` The request is completed successfully.
	 * @response `201` `Record<string, string>` The requested resource has been created.
	 * @response `400` `Record<string, string>` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `500` `Record<string, string>` Internal server error. Additional details will be contained on the server logs.
	 */
	updateSearchProfile = (profileName: string, data: string, params: RequestParams = {}) => {
		if (!this.traceDetails || this.traceDetails.includes('updateSearchProfile')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: data ?? {},
				methodName: 'updateSearchProfile',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<Record<string, string>, Record<string, string>>({
			path: `/api/v2/documents/profiles/${profileName}`,
			method: 'PUT',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Search-Profile-Resource
	 * @name CreateSearchProfile
	 * @summary Create the search profile.
	 * @request POST:/api/v2/documents/profiles/{profileName}
	 * @response `201` `Record<string, string>` The requested resource has been created.
	 * @response `400` `Record<string, string>` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `409` `Record<string, string>` The specified resource already exist.
	 * @response `500` `Record<string, string>` Internal server error. Additional details will be contained on the server logs.
	 */
	createSearchProfile = (profileName: string, data: string, params: RequestParams = {}) => {
		if (!this.traceDetails || this.traceDetails.includes('createSearchProfile')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: data ?? {},
				methodName: 'createSearchProfile',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<Record<string, string>, Record<string, string>>({
			path: `/api/v2/documents/profiles/${profileName}`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Search-Profile-Resource
	 * @name DeleteProfile
	 * @summary Delete the search profile.
	 * @request DELETE:/api/v2/documents/profiles/{profileName}
	 * @response `200` `Record<string, string>` The request is completed successfully.
	 * @response `204` `Record<string, string>` The requested completed successfully. No content is returned in the response.
	 * @response `400` `Record<string, string>` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `500` `Record<string, string>` Internal server error. Additional details will be contained on the server logs.
	 */
	deleteProfile = (profileName: string, params: RequestParams = {}) => {
		if (!this.traceDetails || this.traceDetails.includes('deleteProfile')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'deleteProfile',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<Record<string, string>, Record<string, string>>({
			path: `/api/v2/documents/profiles/${profileName}`,
			method: 'DELETE',
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Search-Profile-Resource
	 * @name GetSearchProfileList
	 * @summary Gets the search profiles.
	 * @request GET:/api/v2/documents/profiles
	 * @response `200` `(SearchProfile)[]` The request is completed successfully.
	 * @response `400` `(SearchProfile)[]` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `(SearchProfile)[]` The specified resource could not be found.
	 * @response `500` `(SearchProfile)[]` Internal server error. Additional details will be contained on the server logs.
	 */
	getSearchProfileList = (params: RequestParams = {}) => {
		if (!this.traceDetails || this.traceDetails.includes('getSearchProfileList')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'getSearchProfileList',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<SearchProfile[], SearchProfile[]>({
			path: `/api/v2/documents/profiles`,
			method: 'GET',
			format: 'json',
			...params,
		});
	};
}
