/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CarouselSlider } from '@/components/blocks/Carousel';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { useContentCarousel } from '@/data/Content/ContentCarousel';
import { ID } from '@/data/types/Basic';
import { WidgetProperties } from '@/data/types/Slot';
import { CarouselOptions } from '@/data/types/Carousel';
import { renderContent } from '@/utils/renderContent';
import { FC, useMemo } from 'react';
import { getCarouselProperties } from '@/utils/getCarouselProperties';

const defaultProps: CarouselOptions = {
	naturalSlideWidth: 600,
	naturalSlideHeight: 400,
	visibleSlides: 1,
};
const emptyProperties = {} as WidgetProperties;

export const ContentCarousel: FC<{ id: ID; properties?: WidgetProperties }> = ({
	id: _id,
	properties = emptyProperties,
}) => {
	const { emsName = '' } = properties;
	const { data, loading } = useContentCarousel(emsName);
	const carouselProps = useMemo(
		() => getCarouselProperties(properties, defaultProps),
		[properties]
	);
	const slides = useMemo(
		() => (data || []).map(renderContent).filter(Boolean),
		[data]
	) as JSX.Element[];

	return (
		<>
			{loading ? (
				<ProgressIndicator />
			) : (
				<CarouselSlider slides={slides} carouselProps={carouselProps}></CarouselSlider>
			)}
		</>
	);
};
