/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

export type ValidateLocaleRequestContextType = {
	validateRequested: boolean;
	setValidateRequested: Dispatch<SetStateAction<boolean>>;
};
export const ValidateLocaleRequestContext = createContext<ValidateLocaleRequestContextType>(
	{} as ValidateLocaleRequestContextType
);

/**
 * Provides a context to share whether requested to validate locale or not.
 *
 * @component
 * @example
 * ```tsx
 * <ValidateLocaleRequestProvider>
 *   <App />
 * </ValidateLocaleRequestProvider>
 * ```
 */
export const ValidateLocaleRequestProvider: FC<PropsWithChildren> = ({ children }) => {
	const [validateRequested, setValidateRequested] = useState(false);
	return (
		<ValidateLocaleRequestContext.Provider value={{ validateRequested, setValidateRequested }}>
			{children}
		</ValidateLocaleRequestContext.Provider>
	);
};
