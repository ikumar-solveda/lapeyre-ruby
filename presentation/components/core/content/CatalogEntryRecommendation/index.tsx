/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { FC, useMemo } from 'react';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Product } from '@/components/content/Product';
import { CarouselSlider } from '@/components/blocks/Carousel';
import { StaticSlider } from '@/components/blocks/Carousel/StaticSlider';
import { carouselSlideSX } from '@/components/content/CatalogEntryRecommendation/styles/carouselSlide';
import { useCatalogEntryRecommendation } from '@/data/Content/CatalogEntryRecommendation';
import { WidgetProperties } from '@/data/types/Slot';
import { ID } from '@/data/types/Basic';
import { CarouselOptions } from '@/data/types/Carousel';

const emptyProperties = {} as WidgetProperties;

export const CatalogEntryRecommendation: FC<{ id: ID; properties?: WidgetProperties }> = ({
	id: _id,
	properties = emptyProperties,
}) => {
	const { emsName = '' } = properties;
	const { partNumbers, clickAction, loading } = useCatalogEntryRecommendation(emsName);
	const slides = useMemo(
		() =>
			(partNumbers || []).map((partNumber) => (
				<Product
					key={partNumber}
					partNumber={partNumber}
					clickAction={clickAction.bind(null, partNumber)}
				/>
			)),
		[partNumbers, clickAction]
	);
	const a11yProps = useMemo(
		() =>
			(partNumbers || []).map((partNumber) => ({
				'aria-label': undefined,
				'aria-labelledby': partNumber,
			})),
		[partNumbers]
	);

	const theme = useTheme();
	const lgMatch = useMediaQuery(theme.breakpoints.down('lg'));
	const mdMatch = useMediaQuery(theme.breakpoints.down('md'));
	const smMatch = useMediaQuery(theme.breakpoints.down('sm'));
	const visibleSlides = useMemo(
		() => (smMatch ? 1 : mdMatch ? 2 : lgMatch ? 3 : 4),
		[lgMatch, mdMatch, smMatch]
	);

	const disabledSliding = useMemo(() => visibleSlides >= slides.length, [visibleSlides, slides]);

	const carouselProps: CarouselOptions = {
		naturalSlideWidth: 248,
		naturalSlideHeight: 300,
		visibleSlides,
		step: visibleSlides,
		infinite: true,
		dragEnabled: false,
		totalSlides: slides.length,
		isIntrinsicHeight: true,
	};

	return (
		<>
			{loading ? (
				<ProgressIndicator />
			) : disabledSliding ? (
				<StaticSlider>{slides}</StaticSlider>
			) : (
				<CarouselSlider
					a11yProps={a11yProps}
					slides={slides}
					carouselProps={carouselProps}
					carouselSlideStyles={carouselSlideSX}
				></CarouselSlider>
			)}
		</>
	);
};
