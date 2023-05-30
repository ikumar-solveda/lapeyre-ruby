/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext, useMemo } from 'react';
import { useTheme } from '@mui/material';
import { Marker } from '@react-google-maps/api';
import { StoreDetails } from '@/data/types/Store';
import { ContentContext } from '@/data/context/content';
import { useStoreLocator } from '@/data/Content/StoreLocator';

type StoreLocatorMarkerProps = {
	store: StoreDetails;
	index: number;
};

export const StoreLocatorMarker: FC<StoreLocatorMarkerProps> = (props) => {
	const { store, index } = props;
	const { onMarkerClick, clickedIndex } = useContext(ContentContext) as ReturnType<
		typeof useStoreLocator
	>;

	const { palette } = useTheme();
	const fillColor = clickedIndex === index ? palette.primary.main : palette.secondary.main;

	const googleMapSymbol: google.maps.Symbol = useMemo(
		() => ({
			path: 'M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z',
			fillColor,
			strokeWeight: 0,
			fillOpacity: 1,
			rotation: 0,
			scale: 2,
			labelOrigin: new google.maps.Point(12, 9),
			anchor: new google.maps.Point(15, 30),
		}),
		[fillColor]
	);

	const googleMapMarkerLabel: google.maps.MarkerLabel = useMemo(
		() => ({
			color: 'white',
			text: String(index + 1),
		}),
		[index]
	);

	return (
		<Marker
			label={googleMapMarkerLabel}
			icon={googleMapSymbol}
			position={store.coordinates}
			onClick={(e) => onMarkerClick(e, index)}
		/>
	);
};
