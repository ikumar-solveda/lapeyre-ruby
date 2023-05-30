/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export type CSRUserContext = {
	WCToken: string;
	userId: string;
	WCTrustedToken: string;
	details: any;
	forUserId: string;
};

export type FetchOptionsType = { url: string; options: RequestInit | undefined };
export type ProcessedFetchOption =
	| {
			reqUrl: RequestInfo;
			options: RequestInit;
	  }
	| undefined;
