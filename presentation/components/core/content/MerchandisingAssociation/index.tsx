/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CarouselSlider } from '@/components/blocks/Carousel';
import { StaticSlider } from '@/components/blocks/Carousel/StaticSlider';
import { ProductCard } from '@/components/blocks/ProductCard';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { carouselSlideSX } from '@/components/content/MerchandisingAssociation/styles/carouselSlide';
import { useMerchandisingAssociation } from '@/data/Content/MerchandisingAssociation';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { DEFAULT_CAROUSEL_OPTS } from '@/data/constants/carousel';
import { ITEM_LIST_IDS } from '@/data/constants/gtm';
import { ContentProvider } from '@/data/context/content';
import { EventsContext } from '@/data/context/events';
import { ID } from '@/data/types/Basic';
import { CarouselOptions } from '@/data/types/Carousel';
import { GTMContainerListType } from '@/data/types/GTM';
import { ProductType } from '@/data/types/Product';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useContext, useEffect, useMemo } from 'react';

const EMPTY_MERCHASSOCS: ProductType[] = [];
export const MerchandisingAssociation: FC<{ id: ID }> = ({ id }) => {
	const { merchAssocs = EMPTY_MERCHASSOCS, loading } = useMerchandisingAssociation(id);
	const localization = useLocalization('productDetail');
	const { onItemListView } = useContext(EventsContext);
	const { settings } = useSettings();
	const [slides, a11yProps] = useMemo(() => {
		const transform = merchAssocs.map((ma) => ({
			a11y: { 'aria-label': undefined, 'aria-labelledby': ma.partNumber },
			card: <ProductCard key={ma.partNumber} product={ma} />,
		}));
		const slides = transform.map(({ card }) => card);
		const a11yProps = transform.map(({ a11y }) => a11y);
		return [slides, a11yProps];
	}, [merchAssocs]);
	const ctxValue: GTMContainerListType = useMemo(
		() => ({
			productListData: {
				listId: ITEM_LIST_IDS.MERCHANDISING_ASSOCIATIONS,
				listName: localization.merchandisingAssociations.t(),
			},
		}),
		[localization]
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

	const carouselProps: CarouselOptions = useMemo(
		() => ({
			...DEFAULT_CAROUSEL_OPTS,
			visibleSlides,
			step: visibleSlides,
			totalSlides: slides.length,
		}),
		[slides.length, visibleSlides]
	);

	useEffect(() => {
		if (merchAssocs.length) {
			onItemListView({
				gtm: {
					products: merchAssocs,
					listPageName: localization.merchandisingAssociations.t(),
					listId: ITEM_LIST_IDS.MERCHANDISING_ASSOCIATIONS,
					storeName: settings.storeName,
					settings,
				},
			});
		}
	}, [localization, merchAssocs, onItemListView, settings]);

	return loading ? (
		<ProgressIndicator />
	) : slides.length ? (
		<ContentProvider value={ctxValue}>
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
		</ContentProvider>
	) : null;
};
