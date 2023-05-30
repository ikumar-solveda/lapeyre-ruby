/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ButtonBack, ButtonNext, Slider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CarouselProvider } from '@/components/blocks/Carousel/CarouselProvider';
import { CarouselSlide } from '@/components/blocks/Carousel/CarouselSlide';
import { carouselProviderSX } from '@/components/blocks/Carousel/styles/carouselProvider';
import { carouselSlideSX } from '@/components/blocks/Carousel/styles/carouselSlide';
import { CarouselOptions } from '@/data/types/Carousel';
import { SxProps, Theme } from '@mui/material';
import { AriaAttributes } from 'react';

type CarouselSliderProps = {
	a11yProps?: AriaAttributes[];
	slides: JSX.Element[];
	carouselProps?: CarouselOptions;
	carouselSlideStyles?: SxProps<Theme>;
};

const defaultCarouselProps = {
	naturalSlideWidth: 248,
	naturalSlideHeight: 300,
	visibleSlides: 1,
	step: 1,
	infinite: true,
	dragEnabled: false,
	totalSlides: 1,
	isIntrinsicHeight: true,
};

const EMPTY_A11_PROPS: AriaAttributes[] = [];
export const CarouselSlider = ({
	a11yProps = EMPTY_A11_PROPS,
	slides,
	carouselProps,
	carouselSlideStyles = carouselSlideSX,
}: CarouselSliderProps) => {
	const mergedProps = { ...defaultCarouselProps, ...carouselProps };

	return (
		<CarouselProvider {...mergedProps} totalSlides={slides.length} sx={carouselProviderSX}>
			<Slider>
				{slides.map((slide: JSX.Element, i: number) => (
					<CarouselSlide
						index={i}
						key={slide.key}
						sx={carouselSlideStyles}
						{...(a11yProps[i] ?? {})}
					>
						{slide}
					</CarouselSlide>
				))}
			</Slider>
			<ButtonBack>
				<ChevronLeftIcon />
			</ButtonBack>
			<ButtonNext>
				<ChevronRightIcon />
			</ButtonNext>
		</CarouselProvider>
	);
};
