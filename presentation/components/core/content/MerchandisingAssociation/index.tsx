/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useMemo } from 'react';
import { Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CarouselSlider } from '@/components/blocks/Carousel';
import { StaticSlider } from '@/components/blocks/Carousel/StaticSlider';
import { ProductCard } from '@/components/blocks/ProductCard';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { carouselSlideSX } from '@/components/content/MerchandisingAssociation/styles/carouselSlide';
import { useMerchandisingAssociation } from '@/data/Content/MerchandisingAssociation';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { CarouselOptions } from '@/data/types/Carousel';
import { ProductType } from '@/data/types/Product';

const EMPTY_MERCHASSOCS: ProductType[] = [];
export const MerchandisingAssociation: FC<{ id: ID }> = ({ id }) => {
	const { merchAssocs = EMPTY_MERCHASSOCS, loading } = useMerchandisingAssociation(id);
	const localization = useLocalization('productDetail');

	const slides = useMemo(
		() => merchAssocs.map((ma) => <ProductCard key={ma.partNumber} product={ma} />),
		[merchAssocs]
	);
	const a11yProps = useMemo(
		() => merchAssocs.map((ma) => ({ 'aria-label': undefined, 'aria-labelledby': ma.partNumber })),
		[merchAssocs]
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

	return loading ? (
		<ProgressIndicator />
	) : slides.length ? (
		<>
			<Typography variant="h4">{localization.recommendedProdTitle.t()}</Typography>
			{disabledSliding ? (
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
	) : null;
};
