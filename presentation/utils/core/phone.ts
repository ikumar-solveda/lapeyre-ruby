/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

export const formatPhone_NorthAmerica = (phone?: string): string | undefined => {
	let rc: string | undefined;
	if (phone) {
		const sep = phone.split('.');
		rc = `(${sep[0]}) ${sep[1]}-${sep[2]}`;
	}
	return rc;
};
