/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export type CarouselOptions = {
	readonly currentSlide?: number;
	readonly disableAnimation?: boolean;
	readonly disableKeyboard?: boolean;
	readonly hasMasterSpinner?: boolean;
	readonly imageErrorCount?: number;
	readonly imageSuccessCount?: number;
	readonly lockOnWindowScroll?: boolean;
	readonly masterSpinnerThreshold?: number;
	readonly naturalSlideHeight?: number;
	readonly naturalSlideWidth?: number;
	readonly orientation?: 'horizontal' | 'vertical';
	readonly slideSize?: number;
	readonly slideTraySize?: number;
	readonly step?: number;
	readonly dragStep?: number;
	readonly totalSlides?: number;
	readonly touchEnabled?: boolean;
	readonly dragEnabled?: boolean;
	readonly visibleSlides?: number;
	readonly infinite?: boolean;
	readonly isIntrinsicHeight?: boolean;
	readonly interval?: number;
	readonly isPlaying?: boolean;
	readonly playDirection?: 'forward' | 'backward';
};

export const CarouselOptionsKeys: (keyof CarouselOptions)[] = [
	'currentSlide',
	'disableAnimation',
	'disableKeyboard',
	'hasMasterSpinner',
	'imageErrorCount',
	'imageSuccessCount',
	'lockOnWindowScroll',
	'masterSpinnerThreshold',
	'naturalSlideHeight',
	'naturalSlideWidth',
	'orientation',
	'slideSize',
	'slideTraySize',
	'step',
	'dragStep',
	'totalSlides',
	'touchEnabled',
	'dragEnabled',
	'visibleSlides',
	'infinite',
	'isIntrinsicHeight',
	'interval',
	'isPlaying',
	'playDirection',
];
