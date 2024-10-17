/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EventsProvider } from '@/data/context/events';
import { NotificationsProvider } from '@/data/context/notifications';
import { SessionErrorProvider } from '@/data/context/sessionError';
import { StoreInventoryProvider } from '@/data/context/storeInventory';
import { ValidateLocaleRequestProvider } from '@/data/context/validateLocaleRequest';
import { FC, PropsWithChildren } from 'react';

export const AppContextProviders: FC<PropsWithChildren> = ({ children }) => (
	<EventsProvider>
		<SessionErrorProvider>
			<NotificationsProvider>
				<ValidateLocaleRequestProvider>
					<StoreInventoryProvider>{children}</StoreInventoryProvider>
				</ValidateLocaleRequestProvider>
			</NotificationsProvider>
		</SessionErrorProvider>
	</EventsProvider>
);
