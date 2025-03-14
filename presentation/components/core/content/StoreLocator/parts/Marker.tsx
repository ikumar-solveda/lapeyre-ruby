/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { useStoreLocator } from '@/data/Content/StoreLocator';
import { ContentContext } from '@/data/context/content';
import type { StoreDetails } from '@/data/types/Store';
import { useTheme } from '@mui/material/styles';
import { type FC, useContext, useEffect } from 'react';

type StoreLocatorMarkerProps = {
	store: StoreDetails;
	index: number;
	map?: google.maps.Map;
};

const loadMarker = async (
	store: StoreDetails,
	index: number,
	map: google.maps.Map | undefined,
	fillColor: string,
	onMarkerClick: (e: google.maps.MapMouseEvent, index: number) => void
) => {
	if (!map) return;

	const { AdvancedMarkerElement, PinElement } = (await google.maps.importLibrary(
		'marker'
	)) as google.maps.MarkerLibrary;

	const pin = new PinElement({
		glyph: `${index + 1}`,
		background: fillColor,
		glyphColor: 'white',
		borderColor: fillColor,
	});

	const marker = new AdvancedMarkerElement({
		position: store.coordinates,
		map,
		title: `${index + 1}. ${store.storeName}`,
		content: pin.element,
		gmpClickable: true,
	});

	marker.addListener('click', (e: google.maps.MapMouseEvent) => onMarkerClick(e, index));

	return () => {
		marker.map = null;
	};
};

export const StoreLocatorMarker: FC<StoreLocatorMarkerProps> = ({ store, index, map }) => {
	const { onMarkerClick, clickedIndex } = useContext(ContentContext) as ReturnType<
		typeof useStoreLocator
	>;

	const { palette } = useTheme();

	useEffect(() => {
		const fillColor = clickedIndex === index ? palette.primary.main : palette.secondary.main;
		loadMarker(store, index, map, fillColor, onMarkerClick);
	}, [store, index, map, onMarkerClick, clickedIndex, palette]);

	return null;
};
