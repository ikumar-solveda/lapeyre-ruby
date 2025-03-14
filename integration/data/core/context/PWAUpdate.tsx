/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { Serwist } from '@serwist/window';
import {
	FC,
	PropsWithChildren,
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

declare global {
	interface Window {
		serwist: Serwist;
	}
}

export type PWAUpdateContextType = {
	showNotification: boolean;
	confirm: (confirmed: boolean) => void;
};

export const PWAUpdateContext = createContext<PWAUpdateContextType>({} as PWAUpdateContextType);

/**
 * Optional context provider for showing a notification when a new version of the PWA is installed.
 */
export const PWAUpdateProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isControlling, setIsControlling] = useState<boolean>(false);
	const [controllingHandled, setControllingHandled] = useState<boolean>(false);
	const showNotification = useMemo(
		() => isControlling && !controllingHandled,
		[isControlling, controllingHandled]
	);
	const confirm = useCallback((confirmed: boolean) => {
		setControllingHandled(true);
		if (confirmed) {
			window.location.reload();
		}
	}, []);

	useEffect(() => {
		if ('serviceWorker' in navigator && window.serwist !== undefined) {
			window.serwist.addEventListener('controlling', () => {
				setIsControlling(true);
			});
		}
	}, []);

	return (
		<PWAUpdateContext.Provider value={{ confirm, showNotification }}>
			{children}
		</PWAUpdateContext.Provider>
	);
};
