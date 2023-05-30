/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Stack, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { FC, useEffect, useState } from 'react';
import { Linkable } from '@/components/blocks/Linkable';
import { useLocalization } from '@/data/Localization';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { headerLocateStoreSX } from '@/components/content/Header/styles/locateStore';
import { headerLinkSX } from '@/components/content/Header/styles/link';

export const HeaderLocateStore: FC = () => {
	const StoreLocator = useLocalization('StoreLocator');
	const RouteLocal = useLocalization('Routes');
	const { storeLocator } = useStoreLocatorState();
	const select = StoreLocator.locateStore.t();
	const [chosen, setChosen] = useState<string>();

	// useEffect used here to avoid text-render difference between server and client --
	//   the selected-store is stored in session (client-side) only
	useEffect(() => setChosen(storeLocator.selectedStore?.storeName), [storeLocator.selectedStore]);

	return (
		<Linkable href={`/${RouteLocal.StoreLocator.route.t()}`} sx={headerLinkSX} aria-label={select}>
			<Stack alignItems="center">
				<LocationOnOutlinedIcon />
				<Typography sx={headerLocateStoreSX}>{chosen ?? select}</Typography>
			</Stack>
		</Linkable>
	);
};
