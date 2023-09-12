/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CarouselProvider } from '@/components/blocks/Carousel/CarouselProvider';
import { CarouselSlide } from '@/components/blocks/Carousel/CarouselSlide';
import { useMediaQuery, useTheme } from '@mui/material';
import { ButtonBack, ButtonNext, Slider, DotGroup } from 'pure-react-carousel';
import { FC, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ExpandLess, ExpandMore } from '@mui/icons-material';
import { ProductImage } from '@/components/blocks/ProductImage';
import { productDetailsThumbnailSliderSX } from '@/components/content/ProductDetails/styles/thumbnailSlider';
import { CarouselProps } from '@/components/content/ProductDetails/parts/Carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const MD_UP_DIMS = { slideWidth: 12, slideHeight: 15, visibleSlides: 4 };
const SM_DIMS = { slideWidth: 5, slideHeight: 3, visibleSlides: 1 };
const XS_DIMS = { slideWidth: 1, slideHeight: 1, visibleSlides: 1 };

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
export const ProductThumbnailCarousel: FC<CarouselProps> = ({ slides, choose, index }) => {
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down('md'));
	const isXs = useMediaQuery(theme.breakpoints.down('sm'));
	const isThumbnail = !isSm;
	const { slideWidth, slideHeight, visibleSlides } = isXs ? XS_DIMS : isSm ? SM_DIMS : MD_UP_DIMS;
	const showButtons = useMemo(() => slides.length > visibleSlides, [slides, visibleSlides]);

	return (
		<CarouselProvider
			naturalSlideWidth={slideWidth}
			naturalSlideHeight={slideHeight}
			visibleSlides={visibleSlides}
			step={visibleSlides}
			infinite={true}
			dragEnabled={isSm}
			totalSlides={slides.length}
			orientation={isSm ? 'horizontal' : 'vertical'}
			sx={productDetailsThumbnailSliderSX}
		>
			{showButtons && !isSm ? (
				<ButtonBack>
					<ExpandLess />
				</ButtonBack>
			) : null}

			<Slider>
				{slides.map(({ thumbnail, name }, i) => (
					<CarouselSlide index={i} key={`${isSm}-${i}`} onFocus={() => choose(i)}>
						<ProductImage
							src={thumbnail}
							alt={name}
							isThumbnail={isThumbnail}
							isSelected={!isSm ? i === index : false}
						/>
					</CarouselSlide>
				))}
			</Slider>

			{isSm ? (
				<>
					<DotGroup />
					{showButtons ? (
						<>
							<ButtonBack>
								<ChevronLeft />
							</ButtonBack>
							<ButtonNext>
								<ChevronRight />
							</ButtonNext>
						</>
					) : null}
				</>
			) : showButtons ? (
				<ButtonNext>
					<ExpandMore />
				</ButtonNext>
			) : null}
		</CarouselProvider>
	);
};
