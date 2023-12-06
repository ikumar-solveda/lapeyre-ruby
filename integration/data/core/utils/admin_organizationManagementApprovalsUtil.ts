/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

export const updateApproval = (name: string, prev?: Record<string, true>) => {
	const rc = { ...prev };
	if (rc[name]) {
		delete rc[name];
	} else {
		Object.assign(rc, { [name]: true });
	}
	return rc;
};
