/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { STRING_TRUE } from '@/data/constants/catalog';
import {
	ProductAttribute,
	ProductType,
	ResponseProductAttribute,
	Selection,
} from '@/data/types/Product';
import { get, isEqual } from 'lodash';

/**
 * index product attributes by their identifier property
 * @param attrs product attribute list
 */
export const getAttrsByIdentifier = (attrs: ResponseProductAttribute[] = []) =>
	attrs.reduce(
		(byIdentifier, attr) => ({
			...byIdentifier,
			[attr.identifier]: get(attr, 'values[0].identifier') as string,
		}),
		{} as Record<string, string>
	);

/**
 * searches for the index(es) (in `list`) of a `Record` that matches exactly (all entries)
 *   the `Record` specified in `fullAttr`. If not found, tries to find the first `Record`
 *   in `list` that has matching key-value pair with key specified by `key`
 *
 * @param fullAttr full set of key-value pairs representing a sku (key=attribute identifier, value=attribute value)
 * @param key the key to search for in `list` when matching partially
 * @param list contains the attributes of various skus indexed as key-value pairs
 * @returns exact and best, where each represents the index at which the exact or best candidate was found
 */
export const search = (
	fullAttr: Record<string, string>,
	key: string,
	list: Record<string, string>[]
) => {
	const exact = list.findIndex((s) => isEqual(s, fullAttr));
	const best = exact === -1 && key ? list.findIndex((s) => s[key] === fullAttr[key]) : -1;
	return { exact, best };
};

const findSkuIndexFromProductThumbnail = (catentry: ProductType) => {
	const thumbnail = catentry.thumbnail;
	const skus = catentry.items ?? [];
	return skus.findIndex((sku) => sku.thumbnail === thumbnail);
};

const initialize = (input?: ProductType, toFind?: ProductAttribute[]): Selection | undefined => {
	if (input) {
		const skus = input.items?.length ? input.items : [input];
		let find = -1;
		let attrsByIdentifier;
		if (toFind) {
			attrsByIdentifier = getAttrsByIdentifier(toFind);
			const skusAsAttrs = skus.map((s) => getAttrsByIdentifier(s.definingAttributes));
			const { exact } = search(attrsByIdentifier, '', skusAsAttrs);
			find = exact;
		}
		if (find === -1) {
			find = findSkuIndexFromProductThumbnail(input);
		}
		const sku = skus[find === -1 ? 0 : find];
		if (!attrsByIdentifier) {
			attrsByIdentifier = getAttrsByIdentifier(sku.definingAttributes);
		}

		return {
			sku,
			quantity: 1,
			attrsByIdentifier,
			buyable: sku.buyable === STRING_TRUE,
		};
	} else {
		return undefined;
	}
};

export const mapProductDetailsData = (
	catentry: ProductType | undefined,
	parentCE: ProductType | undefined
) => {
	const { type, definingAttributes } = catentry ?? {};
	const product = parentCE ?? catentry;
	let selection;
	if (parentCE) {
		selection = initialize(parentCE, definingAttributes);
	} else if (type === 'item' || type === 'product' || type === 'variant' || type === 'package') {
		selection = initialize(catentry);
	}
	return { product, selection };
};
