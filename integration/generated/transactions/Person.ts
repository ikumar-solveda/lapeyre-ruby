import {
	ComIbmCommerceEmarketingBeansEmailUserReceiveDataBeanIBMOptOutAll,
	ComIbmCommerceRestMemberHandlerPersonHandlerDeleteContextAttribute,
	ComIbmCommerceRestMemberHandlerPersonHandlerResetPasswordAdministratorRequest,
	ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUser,
	ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse,
	ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest,
	ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddResponse,
	ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminUpdateRequest,
	ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationUpdateRequest,
	ComIbmCommerceSecurityCommandsResetPasswordAdministratorCmd,
	ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetails,
	PersonAdministratorsToFindUserInformationByUserIdentifier,
	PersonAdministratorToPerfromActionOnUser,
	PersonAdministratorToPerfromActionOnUserDelete,
	PersonPerformActionByAdministrator,
	PersonPerson,
	PersonUpdateCurrencyAndLanguagePreferenceCmd,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Person<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Allows a CSR or CSS to reset the password for a registered user. It also allows resetting password when the CSR / CSS has established a session to act on behalf of a user.
	 *
	 * @tags Person
	 * @name PersonResetPasswordByAdmin
	 * @summary Reset password
	 * @request POST:/store/{storeId}/person/updateMemberPassword
	 * @secure
	 * @response `200` `ComIbmCommerceSecurityCommandsResetPasswordAdministratorCmd` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	personResetPasswordByAdmin = (
		storeId: string,
		query?: {
			/** The mode in which resetPassword is run. ResetPassword can be executed in an administrator session or in an on-behalf session for a user. Default value is 'resetPasswordAdmin' if no valid value was supplied. */
			mode?: 'resetPasswordAdmin' | 'resetPasswordOnBehalf';
		},
		data?: ComIbmCommerceRestMemberHandlerPersonHandlerResetPasswordAdministratorRequest,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('personResetPasswordByAdmin')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'personResetPasswordByAdmin',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceSecurityCommandsResetPasswordAdministratorCmd, void>({
			path: `/store/${storeId}/person/updateMemberPassword`,
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
	 * @description Deletes one or more values of a context attribute for a registered user by removing associated entry in the MBRATTRVAL table.
	 *
	 * @tags Person
	 * @name PersonDeleteContextAttributeForPerson
	 * @summary Delete context attribute values
	 * @request DELETE:/store/{storeId}/person/@self/contextattributes/{attributeName}/{value}
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerPersonHandlerDeleteContextAttribute` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	personDeleteContextAttributeForPerson = (
		attributeName: string,
		value: string,
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('personDeleteContextAttributeForPerson')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'personDeleteContextAttributeForPerson',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerPersonHandlerDeleteContextAttribute,
			void
		>({
			path: `/store/${storeId}/person/@self/contextattributes/${attributeName}/${value}`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Allows administrators to find users based on a query name. See each query for details on input and output.
	 *
	 * @tags Person
	 * @name PersonFindByQuery
	 * @summary Get user by query
	 * @request GET:/store/{storeId}/person
	 * @secure
	 * @response `200` `ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetails` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	personFindByQuery = (
		storeId: string,
		query: {
			/** Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_List_Summary. */
			profileName?: 'IBM_User_List_Summary' | 'IBM_User_List_Details';
			/** The query name. */
			q: 'usersICanAdmin' | 'registeredUsersICanManage';
			/** The order by field name. */
			orderByFieldName?: string;
			/** The role ID. */
			roleId?: string;
			/** The account status. */
			accountStatus?: string;
			/** The order by table name. */
			orderByTableName?: string;
			/** Logon Id of the customer to search for. */
			logonId?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			logonIdSearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** The parent organization ID. */
			parentOrgId?: string;
			/** Parent organization name to search buyers. Only used in B2B store. */
			parentOrgName?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			parentOrgNameSearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** First name of the customer to search for. */
			firstName?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			firstNameSearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** Last name of the customer to search for. */
			lastName?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			lastNameSearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** Last name of the customer to search for. */
			middleName?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			middleNameSearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** Address line 1 of the customer to search for. */
			address1?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			address1SearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** The city name of the customer to search for. */
			city?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			citySearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** The country or region name of the customer to search for. */
			country?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			countrySearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** The primary e-mail address of the customer to search for. */
			email1?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			email1SearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** The secondary e-mail address of the customer to search for. */
			email2?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			email2SearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** The primary fax number of the customer to search for. */
			fax1?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			fax1SearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** The secondary fax number of the customer to search for. */
			fax2?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			fax2SearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** Customizable field1 to search for. */
			field1?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			field1SearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** Customizable field2 to search for. */
			field2?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			field2SearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** The primary phone number of the customer to search for. */
			phone1?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			phone1SearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** The secondary phone number of the customer to search for. */
			phone2?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			phone2SearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** The state or province name of the customer to search for. */
			state?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			stateSearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** ZIP or postal code of the customer to search for. */
			zipcode?: string;
			/** The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals) */
			zipcodeSearchType?: '1' | '2' | '3' | '4' | '5' | '6' | '8';
			/** The starting index of the result. */
			startIndex?: string;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. */
			maxResults?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('personFindByQuery')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'personFindByQuery',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetails, void>({
			path: `/store/${storeId}/person`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Registers a user. When the mode is set to admin, the registration is done by an administrator.
	 *
	 * @tags Person
	 * @name PersonRegisterPersonOnUserRegistrationAdminAdd
	 * @summary Register user
	 * @request POST:/store/{storeId}/person
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddResponse` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	personRegisterPersonOnUserRegistrationAdminAdd = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The mode of the rest service. */
			mode?: 'self' | 'admin';
		},
		data?: ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest,
		params: RequestParams = {}
	) => {
		if (
			!this.traceDetails ||
			this.traceDetails.includes('personRegisterPersonOnUserRegistrationAdminAdd')
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'personRegisterPersonOnUserRegistrationAdminAdd',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddResponse,
			void
		>({
			path: `/store/${storeId}/person`,
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
	 * @description Allows administrators to find user information by user identifier.
	 *
	 * @tags Person
	 * @name PersonFindByUserIdWRolesOfUserInOrgsICanAdminProfileName
	 * @summary Get user information by identifier
	 * @request GET:/store/{storeId}/person/{userId}
	 * @secure
	 * @response `200` `PersonAdministratorsToFindUserInformationByUserIdentifier` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	personFindByUserIdWRolesOfUserInOrgsICanAdminProfileName = (
		storeId: string,
		userId: string,
		query?: {
			/** Profile name. Profiles determine the subset of data returned by a query. The default profile name is IBM_User_Display_Details. */
			profileName?:
				| 'IBM_User_Display_Details'
				| 'IBM_User_Registration_Details'
				| 'IBM_User_Top_Level_Org_Administered'
				| 'IBM_Assigned_Roles_Details'
				| 'IBM_Roles_Of_User_All'
				| 'IBM_Roles_Of_User_In_Orgs_I_Can_Admin';
		},
		params: RequestParams = {}
	) => {
		if (
			!this.traceDetails ||
			this.traceDetails.includes('personFindByUserIdWRolesOfUserInOrgsICanAdminProfileName')
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'personFindByUserIdWRolesOfUserInOrgsICanAdminProfileName',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PersonAdministratorsToFindUserInformationByUserIdentifier, void>({
			path: `/store/${storeId}/person/${userId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Allows administrators to update account data for a registered user.
	 *
	 * @tags Person
	 * @name PersonUpdatePersonByAdmin
	 * @summary Update account data
	 * @request PUT:/store/{storeId}/person/{userId}
	 * @secure
	 * @response `200` `PersonAdministratorToPerfromActionOnUser` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	personUpdatePersonByAdmin = (
		storeId: string,
		userId: string,
		data?: ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminUpdateRequest,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('personUpdatePersonByAdmin')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: data ?? {},
				methodName: 'personUpdatePersonByAdmin',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PersonAdministratorToPerfromActionOnUser, void>({
			path: `/store/${storeId}/person/${userId}`,
			method: 'PUT',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Performs an action on a user by an administrator. See each action for details on input and output.
	 *
	 * @tags Person
	 * @name PersonPerformActionByAdmin
	 * @summary Performs an action on a user by an administrator. See each action for details on input and output.
	 * @request POST:/store/{storeId}/person/{userId}
	 * @secure
	 * @response `200` `PersonPerformActionByAdministrator` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	personPerformActionByAdmin = (
		storeId: string,
		userId: string,
		query: {
			/** The action of the rest service. The assignRole action allows an administrator to assign role(s) to a registered user, while unassignRole allos an administrator to unassign role(s) from a registered user. */
			action: 'assignRole' | 'unassignRole';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('personPerformActionByAdmin')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'personPerformActionByAdmin',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PersonPerformActionByAdministrator, void>({
			path: `/store/${storeId}/person/${userId}`,
			method: 'POST',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Allows administrators to delete user
	 *
	 * @tags Person
	 * @name PersonDeletePersonByAdmin
	 * @summary Delete user (by administrator)
	 * @request DELETE:/store/{storeId}/person/{userId}
	 * @secure
	 * @response `200` `PersonAdministratorToPerfromActionOnUserDelete` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	personDeletePersonByAdmin = (storeId: string, userId: string, params: RequestParams = {}) => {
		if (!this.traceDetails || this.traceDetails.includes('personDeletePersonByAdmin')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'personDeletePersonByAdmin',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PersonAdministratorToPerfromActionOnUserDelete, void>({
			path: `/store/${storeId}/person/${userId}`,
			method: 'DELETE',
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Updates the user to include, exclude, or unassign the user from a member group.
	 *
	 * @tags Person
	 * @name PersonUpdateMemberUser
	 * @summary Update member group assignment
	 * @request POST:/store/{storeId}/person/updateMemberUser/{userId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	personUpdateMemberUser = (
		storeId: string,
		userId: string,
		data?: ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUser,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('personUpdateMemberUser')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: data ?? {},
				methodName: 'personUpdateMemberUser',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse,
			void
		>({
			path: `/store/${storeId}/person/updateMemberUser/${userId}`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Gets the account data for a registered user.
	 *
	 * @tags Person
	 * @name PersonFindPersonBySelf
	 * @summary Get account data
	 * @request GET:/store/{storeId}/person/@self
	 * @secure
	 * @response `200` `PersonPerson` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	personFindPersonBySelf = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('personFindPersonBySelf')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'personFindPersonBySelf',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PersonPerson, void>({
			path: `/store/${storeId}/person/@self`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description This API supports the following operations: <br> <br> 1. Update the registered user profile of the current user using UserRegistrationUpdateCmd. This is done when query parameter 'action' is set to 'updateUserRegistration'.  Updating the user's password is deprecated; the ResetPassword operation should be used instead, as specified in 2a.<br> <br> 2. Resetting or updating the password for unauthenticated and authenticated users. This is done when body parameter 'resetPassword' is set to 'true':<br> <br> a. Reset password while authenticated requires the following input parameters:<br> Request body parameters: <br> resetPassword : true <br> logonId 					: logonId of the registered user<br> xcred_logonPasswordOld 		: Old password of the registered user <br> logonPassword 				: New password of the user <br> xcred_logonPasswordVerify 	: The verified password of the user, which must be identical to logonPassword<br> <br> b. Reset password while unauthenticated requires the following input parameters: <br> <br> i) Using Validation Code:  <br> <u>Step 1:</u> Specify logonId and challenge answer. A validation code is then emailed to the user to be used in Step 2.<br> Request body parameters:  <br> resetPassword 	: true <br> logonId 		: The logon ID of the registered user<br> challengeAnswer : Answer to the challenge question.<br> <br> <u>Step 2:</u> Specify validation code received in the email from step 1 and a new password, to update the user's password. <br> Request body parameters:  <br> resetPassword 			  : true <br> logonId 				  : The logon ID of the registered user<br> xcred_validationCode      : The validation code generated in the above step <br> logonPassword       	  : New password of the user <br> xcred_logonPasswordVerify : The verified password of the user, which must be identical to logonPassword <br> <br> ii) Using Temporary Password (deprecated): <br> Specify logonId and challenge answer. A temporary password is then emailed to the user.<br> Request body parameters:  <br> resetPassword 	: true <br> logonId 		: The logon ID of the registered user<br> challengeAnswer : Answer to the challenge question<br>
	 *
	 * @tags Person
	 * @name PersonUpdatePersonOnUserRegistrationUpdate
	 * @summary Update current user's profile or reset password
	 * @request PUT:/store/{storeId}/person/@self
	 * @secure
	 * @response `200` `PersonAdministratorToPerfromActionOnUser` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	personUpdatePersonOnUserRegistrationUpdate = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The action of the rest service. */
			action?: 'updateUserRegistration';
		},
		data?: ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationUpdateRequest,
		params: RequestParams = {}
	) => {
		if (
			!this.traceDetails ||
			this.traceDetails.includes('personUpdatePersonOnUserRegistrationUpdate')
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'personUpdatePersonOnUserRegistrationUpdate',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PersonAdministratorToPerfromActionOnUser, void>({
			path: `/store/${storeId}/person/@self`,
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
	 * @description Changes language and currency preference in profile and in context.
	 *
	 * @tags Person
	 * @name PersonChangeLanguageCurrency
	 * @summary Change language and currency preference
	 * @request PUT:/store/{storeId}/person/@self/languageCurrency
	 * @secure
	 * @response `200` `PersonUpdateCurrencyAndLanguagePreferenceCmd` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	personChangeLanguageCurrency = (
		storeId: string,
		query: {
			/** The store identifier. */
			currency: string;
			/** The store identifier. */
			URL: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('personChangeLanguageCurrency')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'personChangeLanguageCurrency',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PersonUpdateCurrencyAndLanguagePreferenceCmd, void>({
			path: `/store/${storeId}/person/@self/languageCurrency`,
			method: 'PUT',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Finds personal opt-out. When the store level personal opt-out does not exist, the site level personal opt-out is returned.
	 *
	 * @tags Person
	 * @name PersonFindOptOutBySelfWOptOutAllProfileName
	 * @summary Get opt out preferences
	 * @request GET:/store/{storeId}/person/@self/optOut
	 * @secure
	 * @response `200` `ComIbmCommerceEmarketingBeansEmailUserReceiveDataBeanIBMOptOutAll` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	personFindOptOutBySelfWOptOutAllProfileName = (
		storeId: string,
		query?: {
			/** Profile name. Profiles determine the subset of data returned by a query.  Default profile name = IBM_optOut_email. */
			profileName?: 'IBM_optOut_email' | 'IBM_optOut_sms' | 'IBM_optOut_all';
		},
		params: RequestParams = {}
	) => {
		if (
			!this.traceDetails ||
			this.traceDetails.includes('personFindOptOutBySelfWOptOutAllProfileName')
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'personFindOptOutBySelfWOptOutAllProfileName',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceEmarketingBeansEmailUserReceiveDataBeanIBMOptOutAll,
			void
		>({
			path: `/store/${storeId}/person/@self/optOut`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
