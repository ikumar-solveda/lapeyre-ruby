/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

export const touchMoveListener = (listener: (...args: any[]) => void) => {
	window.addEventListener('touchmove', listener);
	return () => window.removeEventListener('touchmove', listener);
};
