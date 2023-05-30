/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SessionErrorType } from '@/data/types/Error';
import { FC, createContext, useState, PropsWithChildren } from 'react';

export type SessionErrorContextType = {
	sessionError: SessionErrorType | null;
	setSessionError: (error: SessionErrorType | null) => void;
};

export const SessionErrorContext = createContext<SessionErrorContextType>(
	{} as SessionErrorContextType
);

export const SessionErrorProvider: FC<PropsWithChildren> = ({ children }) => {
	const [sessionError, setSessionError] = useState<SessionErrorType | null>(null);

	return (
		<SessionErrorContext.Provider value={{ sessionError, setSessionError }}>
			{children}
		</SessionErrorContext.Provider>
	);
};
