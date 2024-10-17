/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

export type StoreInventoryContextType = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export const StoreInventoryContext = createContext<StoreInventoryContextType>(
	{} as StoreInventoryContextType
);

export const StoreInventoryProvider: FC<PropsWithChildren> = ({ children }) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<StoreInventoryContext.Provider value={{ open, setOpen }}>
			{children}
		</StoreInventoryContext.Provider>
	);
};
