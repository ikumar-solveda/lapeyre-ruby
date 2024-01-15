/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CarouselSlider } from '@/components/blocks/Carousel';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { RenderContent } from '@/components/blocks/RenderContent';
import { useContentCarousel } from '@/data/Content/ContentCarousel';
import { useContentEvents } from '@/data/Content/_ContentEvents';
import { ID } from '@/data/types/Basic';
import { CarouselOptions } from '@/data/types/Carousel';
import { WidgetProperties } from '@/data/types/Slot';
import { getCarouselProperties } from '@/utils/getCarouselProperties';
import { renderContent } from '@/utils/renderContent';
import { Box } from '@mui/material';
import { FC, useMemo } from 'react';

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
	const { data, title, loading } = useContentCarousel(emsName);
	const { onContentClick } = useContentEvents();

	const carouselProps = useMemo(
		() => getCarouselProperties(properties, defaultProps),
		[properties]
	);
	const slides = useMemo(
		() => (data || []).map((c) => renderContent(c, onContentClick(c))).filter(Boolean),
		[data, onContentClick]
	) as JSX.Element[];

	return (
		<>
			{loading ? (
				<ProgressIndicator />
			) : (
				<Box>
					{title?.map((content) => (
						<RenderContent
							key={`${content.id}${content.contentId}`}
							content={content}
							onClick={onContentClick(content)}
						/>
					))}
					<CarouselSlider slides={slides} carouselProps={carouselProps}></CarouselSlider>
				</Box>
			)}
		</>
	);
};
