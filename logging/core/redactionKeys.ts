/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export const redactionKeys: string[] = [
	'password',
	'validationCode',
	'logonPassword',
	'*.password',
	'*.validationCode',
	'*.logonPassword',
	'*.logonPasswordVerify',
	'*.usr_logonPassword',
	'*.usr_logonPasswordVerify',
	'*.challengeAnswer',
	'*.resourceId',
	// array-wildcard nesting beyond depth of 2 does not work, e.g., following line does not redact
	//   *.MarketingSpotData[*].baseMarketingSpotActivityData[*].marketingContentDescription[*].marketingText
	//   so we redact the entire array (which is okay in this case)
	'*.MarketingSpotData[*].baseMarketingSpotActivityData[*].marketingContentDescription', //
];
