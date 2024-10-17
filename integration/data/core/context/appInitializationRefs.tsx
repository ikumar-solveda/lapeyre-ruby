/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { FC, MutableRefObject, PropsWithChildren, createContext, useMemo, useRef } from 'react';

const refObject = {
	guestInitialized: false,
};
export type AppInitializationRefContextType = {
	ref: MutableRefObject<Record<string, any>>;
};

export const AppInitializationRefContext = createContext<AppInitializationRefContextType>({
	ref: { current: {} },
} as unknown as AppInitializationRefContextType);

export const AppInitializationRefProvider: FC<PropsWithChildren> = ({ children }) => {
	const ref = useRef<Record<string, any>>(refObject);
	const value = useMemo(() => ({ ref }), []);

	return (
		<AppInitializationRefContext.Provider value={value}>
			{children}
		</AppInitializationRefContext.Provider>
	);
};
