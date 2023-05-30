/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CarouselOptions, CarouselOptionsKeys } from '@/data/types/Carousel';
import { WidgetProperties } from '@/data/types/Slot';
import { dFix } from '@/utils/floatingPoint';
import { isEmpty, pick } from 'lodash';

const INT_KEYS: Partial<Record<keyof CarouselOptions, boolean>> = {
	interval: true,
};
const BOOL_KEYS: Partial<Record<keyof CarouselOptions, boolean>> = {
	isPlaying: true,
	infinite: true,
};

export const getCarouselProperties = (
	properties: WidgetProperties | undefined,
	defaults: CarouselOptions
) => {
	if (!isEmpty(properties)) {
		// get carousel-only props
		const validProps = pick(properties, CarouselOptionsKeys);

		// fix their types
		Object.entries(validProps).forEach(([k, value]) => {
			const key = k as keyof CarouselOptions;
			if (INT_KEYS[key]) {
				validProps[key] = dFix(value, 0);
			} else if (BOOL_KEYS[key]) {
				validProps[key] = JSON.parse(value);
			}
		});

		return { ...defaults, ...validProps };
	} else {
		return defaults;
	}
};
