/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { getProduct } from '@/data/Content/Product';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { getVolumePrice } from '@/data/Content/VolumePrice-Server';
import { getLocalization } from '@/data/Localization-Server';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { getComponentType } from '@/data/utils/getBundleComponentOrSkuAttributes';

const fetchLocalization = async ({ cache, context }: ContentProps) => {
	const { localeName: locale } = await getStoreLocale({ cache, context });
	await Promise.all([
		getLocalization(cache, locale, 'productDetail'),
		getLocalization(cache, locale, 'VolumePricing'),
	]);
};

export const getBundleDetailsTable = async ({ cache, id, context }: ContentProps) => {
	const partNumber = id.toString();
	const product = await getProduct(cache, partNumber, context);
	const partNumbers = product?.components
		? product.components?.flatMap((comp) => [
				...(getComponentType(comp).isItem
					? [comp.partNumber]
					: comp.sKUs?.map((sku) => sku.partNumber) ?? []),
		  ])
		: EMPTY_STRING;
	await fetchLocalization({ cache, id, context });
	await getVolumePrice({ cache, id: partNumbers as ID, context });
};
