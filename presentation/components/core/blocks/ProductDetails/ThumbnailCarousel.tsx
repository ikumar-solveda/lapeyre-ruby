/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2025.
 */

import { CarouselProvider } from '@/components/blocks/Carousel/CarouselProvider';
import { CarouselSlide } from '@/components/blocks/Carousel/CarouselSlide';
import { CarouselProps } from '@/components/blocks/ProductDetails/Carousel';
import { ProductDetailsMedia } from '@/components/blocks/ProductDetails/parts/Media';
import { productDetailsThumbnailSliderSX } from '@/components/blocks/ProductDetails/styles/thumbnailSlider';
import { ChevronLeft, ChevronRight, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ButtonBack, ButtonNext, DotGroup, Slider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { FC, useMemo } from 'react';

const MD_UP_DIMS = { slideWidth: 12, slideHeight: 15, visibleSlides: 4 };
const SM_DIMS = { slideWidth: 5, slideHeight: 3, visibleSlides: 1 };
const XS_DIMS = { slideWidth: 1, slideHeight: 1, visibleSlides: 1 };

export const ProductDetailsThumbnailCarousel: FC<CarouselProps> = ({ slides, choose, index }) => {
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
				{slides.map(({ thumbnail, name, fullImage }, i) => (
					<CarouselSlide index={i} key={`${isSm}-${i}`} onFocus={() => choose(i)}>
						<ProductDetailsMedia
							src={fullImage}
							alt={name}
							isThumbnail={isThumbnail}
							isSelected={!isSm ? i === index : false}
							posterImage={thumbnail}
							isCarouselThumbnail={true}
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
