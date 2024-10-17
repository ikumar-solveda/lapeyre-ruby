/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
export const encodePathAsURIComponent = (path: string) =>
	path.split('/').map(encodeURIComponent).join('/');
