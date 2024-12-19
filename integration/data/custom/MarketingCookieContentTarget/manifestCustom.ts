/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

/**
 * The manifest contains a list of cookie names with boolean values to determine
 * if the cookie content target is enabled or not for each cookie name.
 *
 * If set to true, the cookie content will be sent to the eSpot service; if false, it will not.
 *
 * If the cookie name is not present in the manifest, the default value is false.
 *
 * If you want to override the default value from the core manifest, add the cookie name with the
 * false value in the manifestCustom.
 *
 * `ALL` is a RESERVED KEYWORD. DO NOT USE it as a cookie name in your marketing activities
 * configuration. It indicates whether all cookies need to be sent to the eSpot service or not.
 *
 * IMPORTANT: Setting ALL to true is highly discouraged. It will send all cookies to the eSpot
 * service during server-side rendering, including those httpOnly cookies. However, those cookies are
 * not accessible at the client side, and will not be sent to the eSpot service at the browser during
 * hydration and client-side rendering. This will potentially cause hydration errors due to
 * inconsistency between server-side and client-side rendering.
 */
export const dataMarketingCookieContentTargetManifestCustom: { [name: string]: boolean } = {
	// add custom cookie name with boolean value here.
};
