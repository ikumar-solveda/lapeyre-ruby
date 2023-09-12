/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CarouselSlider } from '@/components/blocks/Carousel';
import { StaticSlider } from '@/components/blocks/Carousel/StaticSlider';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { carouselSlideSX } from '@/components/content/CatalogEntryRecommendation/styles/carouselSlide';
import { Product } from '@/components/content/Product';
import { useCatalogEntryRecommendation } from '@/data/Content/CatalogEntryRecommendation';
import { useUser } from '@/data/User';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { CarouselOptions } from '@/data/types/Carousel';
import { ProductType } from '@/data/types/Product';
import { WidgetProperties } from '@/data/types/Slot';
import { getContractIdFromContext } from '@/utils/getContractIdFromContext';
import { useMediaQuery, useTheme } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';

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
	} = useCatalogEntryRecommendation(emsName);
	const { user } = useUser();

	const [contract, setContract] = useState<string>(getContractIdFromContext(user?.context));
	const [invalid, setInvalid] = useState<Record<string, boolean>>({});
	const original = useMemo(
		() => cardContainerMapper(partNumbers, contract, clickAction),
		[partNumbers, contract, clickAction]
	);

	const { slides, a11yProps } = useMemo(() => {
		const filtered = original.filter(({ partNumber }) => !invalid[`${partNumber}_${contract}`]);
		const slides = filtered.map(({ card }) => card);
		const a11yProps = filtered.map(({ a11y }) => a11y);
		return { slides, a11yProps };
	}, [invalid, original, contract]);

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

	const onNotify = (id: string, usedContract: string, product: ProductType) =>
		setInvalid((old) => ({ ...old, [`${id}_${usedContract}`]: !product }));
	useEffect(() => {
		// we only need to trigger updates on changes, not initial loads -- initial load updates are
		//   taken care of by the initial render's invocations of `onNotify`
		const _contract = getContractIdFromContext(user?.context);
		if (contract !== _contract) {
			setContract(_contract);
		}
	}, [user?.context]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<ContentProvider value={{ onNotify }}>
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
