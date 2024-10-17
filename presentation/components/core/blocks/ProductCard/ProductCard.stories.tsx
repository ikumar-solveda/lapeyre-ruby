/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { ProductCard } from '@/components/blocks/ProductCard';
import { CatSEO } from '@/data/types/Category';
import { GroupingProperties, ProductDisplayPrice, ProductType } from '@/data/types/Product';
import { Meta, StoryFn } from '@storybook/react';

const groupingProperties: GroupingProperties = {
	groupCount: 3,
	groupHero: '14019',
	groupListPriceRange: ['800.0', '800.0'],
	groupOfferPriceRange: ['749.99', '749.99'],
	groupMinPriceValue: '749.99',
	groupMaxPriceValue: '749.99',
};

const seo: CatSEO = {
	id: '',
	href: '/wooden-angled-chair-lr-fntr-0001',
};

const productPrice: ProductDisplayPrice = {
	min: 749.99,
	currency: 'USD',
	offer: 749.99,
	list: 800.0,
};

const product: ProductType = {
	attachments: [],
	name: 'Wooden Angled Chair',
	partNumber: 'LR-FNTR-0001',
	shortDescription:
		'A sturdy wooden angled chair that welcomes every guest into your living space in style. Includes a matching movable leg rest.',
	longDescription: '',
	id: '14018',
	parentCatalogGroupID: '/10501/10502',
	parentCatalogEntryID: '',
	thumbnail: `/hclstore/EmeraldCAS/images/catalog/livingroom/furniture/chair2_a1_350.jpg`,
	fullImage: '',
	sequence: '',
	seo,
	type: 'product',
	hasSingleSKU: false,
	buyable: 'true',
	sellerId: '7000000000000003501',
	manufacturer: 'Home Design',
	price: [],
	attributes: [],
	numberOfSKUs: 4,
	items: [],
	merchandisingAssociations: [],
	groupingProperties,
	images: [],
	seller: '',
	productPrice,
	colorSwatches: [
		{
			attributeIdentifier: 'Color',
			id: '7000000000000003005',
			identifier: 'blonde',
			image1: '/EmeraldCAS/images/catalog/swatches/sw_blonde.png',
			image1path: '/hclstore/EmeraldCAS/images/catalog/swatches/sw_blonde.png',
			sequence: '5.0',
			unitID: 'C62',
			unitOfMeasure: 'one',
			value: 'Blonde',
		},
		{
			attributeIdentifier: 'Color',
			id: '7000000000000003009',
			identifier: 'coffee',
			image1: '/EmeraldCAS/images/catalog/swatches/sw_coffee.png',
			image1path: '/hclstore/EmeraldCAS/images/catalog/swatches/sw_coffee.png',
			sequence: '9.0',
			unitID: 'C62',
			unitOfMeasure: 'one',
			value: 'Coffee',
		},
		{
			attributeIdentifier: 'Color',
			id: '7000000000000003018',
			identifier: 'cedar',
			image1: '/EmeraldCAS/images/catalog/swatches/sw_cedar.png',
			image1path: '/hclstore/EmeraldCAS/images/catalog/swatches/sw_cedar.png',
			sequence: '10.0',
			unitID: 'C62',
			unitOfMeasure: 'one',
			value: 'Cedar',
		},
	],
	ribbons: [],
	descriptiveAttributes: [],
	definingAttributes: [],
};

export default {
	title: 'Blocks/ProductCard',
	component: ProductCard,
} as Meta<typeof ProductCard>;

const Template: StoryFn<typeof ProductCard> = (args) => <ProductCard {...args} />;

export const ProductCardStory = Template.bind({});

ProductCardStory.args = {
	product,
};

ProductCardStory.storyName = 'ProductCard';
