/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { SvgIcon } from '@mui/material';
import { storeLocatorMarkerIconSX } from '@/components/content/StoreLocator/styles/markerIcon';

export const StoreLocatorMarkerIcon: FC<{ label: string; selected?: boolean }> = ({
	label,
	selected,
}) => (
	<SvgIcon sx={storeLocatorMarkerIconSX(selected)}>
		<path d="M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z" />
		<text fontSize="10" fill="white" x="12" y="13" textAnchor="middle">
			{label}
		</text>
	</SvgIcon>
);
