/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { CarouselSlider } from '@/components/blocks/Carousel';
import { StaticSlider } from '@/components/blocks/Carousel/StaticSlider';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { RenderContent } from '@/components/blocks/RenderContent';
import { carouselSlideSX } from '@/components/content/CatalogEntryRecommendation/styles/carouselSlide';
import { Product } from '@/components/content/Product';
import { useCatalogEntryRecommendation } from '@/data/Content/CatalogEntryRecommendation';
import { useContentEvents } from '@/data/Content/_ContentEvents';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DEFAULT_CAROUSEL_OPTS } from '@/data/constants/carousel';
import { COMMERCE_AI_PROJECT_KEY } from '@/data/constants/commerceAI';
import { ITEM_LIST_IDS } from '@/data/constants/gtm';
import { ContentProvider } from '@/data/context/content';
import { EventsContext } from '@/data/context/events';
import { ID } from '@/data/types/Basic';
import { CarouselOptions } from '@/data/types/Carousel';
import { GTMContainerListType } from '@/data/types/GTM';
import { ProductType } from '@/data/types/Product';
import { WidgetProperties } from '@/data/types/Slot';
import { getContractIdFromContext } from '@/utils/getContractIdFromContext';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const cardContainerMapper = (
	partNumbers: string[],
	contract: string,
	clickAction: (partNumber: string) => void
) =>
	partNumbers.map((partNumber, index) => ({
		partNumber,
		card: (
			<Product
				key={`${contract}_${partNumber}_${index}`}
				partNumber={partNumber}
				clickAction={clickAction.bind(null, partNumber)}
			/>
		),
		a11y: { 'aria-label': undefined, 'aria-labelledby': partNumber },
	}));

const emptyProperties = {} as WidgetProperties;
const EMPTY_PARTNUMBERS: string[] = [];

export const CatalogEntryRecommendation: FC<{ id: ID; properties?: WidgetProperties }> = ({
	id: _id,
	properties = emptyProperties,
}) => {
	const { emsName = '' } = properties;
	const {
		partNumbers = EMPTY_PARTNUMBERS,
		clickAction,
		loading,
		title,
		aiModelData,
	} = useCatalogEntryRecommendation(emsName, properties);

	const { onItemListView } = useContext(EventsContext);
	const { onContentClick } = useContentEvents();
	const { user } = useUser();

	const { settings } = useSettings();
	const [contract, setContract] = useState<string>(getContractIdFromContext(user?.context));
	const [products, setProducts] = useState<Record<string, ProductType | null>>({});
	const original = useMemo(
		() => cardContainerMapper(partNumbers, contract, clickAction),
		[partNumbers, contract, clickAction]
	);

	const { slides, a11yProps, _products, filtered } = useMemo(() => {
		const filtered = original.filter(
			({ partNumber }) => products[`${partNumber}_${contract}`] !== null // available unless explicitly null (onNotify)
		);
		const _products = filtered
			.filter(({ partNumber }) => !!products[`${partNumber}_${contract}`])
			.map(({ partNumber }) => products[`${partNumber}_${contract}`]);
		const slides = filtered.map(({ card }) => card);
		const a11yProps = filtered.map(({ a11y }) => a11y);
		return { slides, a11yProps, _products: _products as ProductType[], filtered };
	}, [original, products, contract]);

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
	const loc = useLocalization('productDetail');
	const listData: GTMContainerListType = useMemo(
		() => ({
			productListData: {
				listId: aiModelData?.length
					? `${settings.userData[COMMERCE_AI_PROJECT_KEY]}-${aiModelData.at(0)?.modelId}`
					: ITEM_LIST_IDS.PRODUCT_RECOMMENDATIONS,
				listName: aiModelData?.length
					? loc.commerceAIRecommendations.t()
					: loc.productRecommendations.t(),
			},
		}),
		[aiModelData, loc, settings.userData]
	);

	const onNotify = useCallback((id: string, usedContract: string, product?: ProductType) => {
		setProducts((old) => ({ ...old, [`${id}_${usedContract}`]: product ?? null }));
	}, []);

	const ctxValue = useMemo(() => ({ onNotify, ...listData }), [listData, onNotify]);

	useEffect(() => {
		// we only need to trigger updates on changes, not initial loads -- initial load updates are
		//   taken care of by the initial render's invocations of `onNotify`
		const _contract = getContractIdFromContext(user?.context);
		if (contract !== _contract) {
			setContract(_contract);
		}
	}, [user?.context]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (_products.length === filtered.length && _products.length > 0) {
			onItemListView({
				gtm: {
					products: _products,
					listPageName: listData.productListData.listName as string,
					listId: listData.productListData.listId,
					storeName: settings.storeName,
					settings,
				},
			});
		}
	}, [_products, filtered, listData, onItemListView, settings]);

	return (
		<ContentProvider value={ctxValue}>
			{title?.map((content) => (
				<RenderContent
					key={`${content.id}${content.contentId}`}
					content={content}
					onClick={onContentClick(content)}
				/>
			))}
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
		</ContentProvider>
	);
};
