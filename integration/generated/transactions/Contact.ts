import {
	ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier,
	PersonContact,
	PersonDeleteContact,
	PersonSingleContact,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Contact<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets the contacts in a person's address book. If the addressType optional query parameter is passed in, the returned contacts are filtered by addressType.
	 *
	 * @tags Contact
	 * @name ContactGetAllPersonContact
	 * @summary Get contact from address book
	 * @request GET:/store/{storeId}/person/@self/contact
	 * @secure
	 * @response `200` `PersonContact` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	contactGetAllPersonContact = (
		storeId: string,
		query?: {
			/** The addressType to filter contacts by. All contacts will be returned if a valid value is not supplied for this parameter. */
			addressType?: 'Shipping' | 'Billing' | 'ShippingAndBilling';
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('contactGetAllPersonContact')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'contactGetAllPersonContact',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PersonContact, void>({
			path: `/store/${storeId}/person/@self/contact`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Creates a new contact in a person's address book.
	 *
	 * @tags Contact
	 * @name ContactAddPersonContact
	 * @summary Create contact in address book
	 * @request POST:/store/{storeId}/person/@self/contact
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier` No response was specified.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	contactAddPersonContact = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: PersonSingleContact,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('contactAddPersonContact')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'contactAddPersonContact',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier,
			void
		>({
			path: `/store/${storeId}/person/@self/contact`,
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
	 * @description Gets a person contact by address ID.
	 *
	 * @tags Contact
	 * @name ContactFindPersonContactById
	 * @summary Get contact by address ID
	 * @request GET:/store/{storeId}/person/@self/contact/byAddressId/{addressId}
	 * @secure
	 * @response `200` `PersonSingleContact` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	contactFindPersonContactById = (
		storeId: string,
		addressId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('contactFindPersonContactById')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'contactFindPersonContactById',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PersonSingleContact, void>({
			path: `/store/${storeId}/person/@self/contact/byAddressId/${addressId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Gets a person contact by nickname.
	 *
	 * @tags Contact
	 * @name ContactFindPersonContactByNickName
	 * @summary Get contact by nickname
	 * @request GET:/store/{storeId}/person/@self/contact/{nickName}
	 * @secure
	 * @response `200` `PersonSingleContact` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	contactFindPersonContactByNickName = (
		storeId: string,
		nickName: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('contactFindPersonContactByNickName')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'contactFindPersonContactByNickName',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PersonSingleContact, void>({
			path: `/store/${storeId}/person/@self/contact/${nickName}`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Updates the contact in the address book identified by nickname.
	 *
	 * @tags Contact
	 * @name ContactUpdatePersonContact
	 * @summary Update contact by nickname
	 * @request PUT:/store/{storeId}/person/@self/contact/{nickName}
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	contactUpdatePersonContact = (
		storeId: string,
		nickName: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: PersonSingleContact,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('contactUpdatePersonContact')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'contactUpdatePersonContact',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier,
			void
		>({
			path: `/store/${storeId}/person/@self/contact/${nickName}`,
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
	 * @description Deletes the contact in the address book identified by nickname.
	 *
	 * @tags Contact
	 * @name ContactDeletePersonContact
	 * @summary Delete contact from address book
	 * @request DELETE:/store/{storeId}/person/@self/contact/{nickName}
	 * @secure
	 * @response `200` `PersonDeleteContact` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	contactDeletePersonContact = (
		storeId: string,
		nickName: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('contactDeletePersonContact')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'contactDeletePersonContact',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PersonDeleteContact, void>({
			path: `/store/${storeId}/person/@self/contact/${nickName}`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
