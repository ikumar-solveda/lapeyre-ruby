/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

export const blurActiveInputElement = (id: string) => (_event: React.UIEvent<HTMLElement>) => {
	if (document.activeElement?.id === id) {
		(document.activeElement as HTMLInputElement).blur();
	}
};
