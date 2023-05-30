/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	EMarketingSpotFreeDeliveryStory,
	EMarketingSpotHomeHeroStory,
	EMarketingSpotHomePromotionRecStory,
	EMarketingSpotCategoryRecStory,
	// EMarketingSpotProductRecStory,
	EMarketingSpotHomeGenericESpotStory,
	EMarketingSpotHomeContentCarouselStory,
} from '@/components/content/EMarketingSpot/EMarketingSpot.stories';
import { render, axe, waitForData } from '@/utils/getTestRenderer';

test('marketing spot "Free Delivery" should have no accessibility violations', async () => {
	const view = render(<EMarketingSpotFreeDeliveryStory id="Free Delivery" />);
	await waitForData(view);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});

test('marketing spot "Home Hero" should have no accessibility violations', async () => {
	const view = render(<EMarketingSpotHomeHeroStory id="Home Hero" />);
	await waitForData(view);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});

test('marketing spot "Home Promotion" should have no accessibility violations', async () => {
	const view = render(<EMarketingSpotHomePromotionRecStory id="Home_Promotion" />);
	await waitForData(view);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});

test('marketing spot "Home_CategoryRec" should have no accessibility violations', async () => {
	const view = render(<EMarketingSpotCategoryRecStory id="Home_CategoryRec" />);
	await waitForData(view);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});

// TODO Fix carousel accessibility violation: Interactive controls must not be nested
// test('marketing spot "Home_ProductRec" should have no accessibility violations', async () => {
// 	const view = render(<EMarketingSpotProductRecStory id="Home_ProductRec" />);
// 	await waitForLocalization(view);
// 	const results = await axe(view.container);
// 	expect(results).toHaveNoViolations();
// });

test('marketing spot "HomeGenericESpot" should have no accessibility violations', async () => {
	const view = render(<EMarketingSpotHomeGenericESpotStory id="HomeGenericESpot" />);
	await waitForData(view);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});

test('marketing spot "Home_ContentCarousel" should have no accessibility violations', async () => {
	const view = render(<EMarketingSpotHomeContentCarouselStory id="Home_ContentCarousel" />);
	await waitForData(view);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});
