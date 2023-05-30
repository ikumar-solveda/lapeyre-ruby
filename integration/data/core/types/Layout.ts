/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { LayoutAllSlots } from '@/data/types/LayoutAllSlots';

// type TripleStack = {
// 	name: 'TripleStack';
// 	slots: {
// 		header: ContentItem[];
// 		first: ContentItem[];
// 		second: ContentItem[];
// 		third: ContentItem[];
// 		footer: ContentItem[];
// 	};
// };

// type Aside = {
// 	name: 'Aside';
// 	slots: {
// 		header: ContentItem[];
// 		first: ContentItem[];
// 		second: ContentItem[];
// 		aside: ContentItem[];
// 		footer: ContentItem[];
// 	};
// };

// type AsideExtended = {
// 	name: 'AsideExtended';
// 	slots: {
// 		header: ContentItem[];
// 		first: ContentItem[];
// 		second: ContentItem[];
// 		third: ContentItem[];
// 		fourth: ContentItem[];
// 		aside: ContentItem[];
// 		footer: ContentItem[];
// 	};
// };

export type Layout = {
	name: 'DoubleStack' | 'TripleStack' | 'Aside' | 'AsideExtended' | 'AsideExtendedPlp';
	slots: LayoutAllSlots;
};
