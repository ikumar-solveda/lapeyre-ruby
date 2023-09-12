/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { STRING_TRUE } from '@/data/constants/catalog';
import {
	COMPARE_TABLE_ADD_PRODUCT_HEADER_NAME,
	COMPARE_TABLE_ATTRIBUTE_HEADER_NAME,
	COMPARE_TABLE_PRODUCT_HEADER_NAME,
	HEADERS,
} from '@/data/constants/compare';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { productFetcher } from '@/data/Content/_Product';
import { getLocalization, useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useCompareProductsState } from '@/data/state/useCompareProductsState';
import { CompareAttribute, CompareCheckObj, ProductWithAttrMap } from '@/data/types/Compare';
import { ContentProps } from '@/data/types/ContentProps';
import { ProductType, ResponseProductAttribute, ResponseProductType } from '@/data/types/Product';
import { useUser } from '@/data/User';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { dAdd, dDiv, dMul } from '@/data/utils/floatingPoint';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getContractIdParamFromContext } from '@/data/utils/getContractIdParamFromContext';
import { omit, uniqBy } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

export const getCompareProducts = async ({ cache, id: _id, context }: ContentProps) => {
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'compare'),
		getLocalization(cache, context.locale || 'en-US', 'PriceDisplay'),
	]);
};

export const useCompareProducts = () => {
	const {
		compareProductsData,
		actions: { update },
	} = useCompareProductsState();
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId, defaultCatalogId: catalogId } = getClientSideCommon(settings, router);
	const { user } = useUser();
	const reqParams = useExtraRequestParameters();
	const localization = useLocalization('compare');
	const { len, checked, storage, max } = compareProductsData.compareData;
	const [productsById, setProdsById] = useState({} as Record<string, CompareCheckObj>);

	const prodWidths = useMemo(() => Math.floor(dDiv(85.0, max)), [max]);
	const attrWidth = useMemo(() => dAdd(100, -dMul(prodWidths, max)), [prodWidths, max]);
	const nProds = useMemo(() => Object.keys(productsById ?? {}).length, [productsById]);
	const [imageSrc, setImageSrc] = useState({} as Record<string, ResponseProductType>);

	const findAttrs = (product: ProductType) => {
		const attrMap = product.attributes.reduce(
			(m: Record<string, ResponseProductAttribute>, v: ResponseProductAttribute) => {
				m[v.identifier] = v;
				return m;
			},
			{}
		);
		return attrMap;
	};

	const findCompAttrs = (products: ProductType[]) => {
		const attrs: CompareAttribute[] = [];
		products.forEach((p) => {
			p.attributes
				.filter(({ comparable }) => comparable === STRING_TRUE)
				.forEach(({ identifier, name, sequence }) => attrs.push({ identifier, name, sequence }));
		});
		const uniq = uniqBy(attrs, 'identifier').sort((a, b) =>
			a.sequence === b.sequence ? a.name.localeCompare(b.name) : dMul(a.sequence, b.sequence)
		);
		return uniq;
	};

	const products: ProductWithAttrMap[] = useMemo(() => {
		const asArray = Object.values<CompareCheckObj>(productsById)
			.sort((a, b) => a.seq - b.seq)
			.map(({ product }) => Object.assign(product, { attrMap: findAttrs(product) }));
		return asArray;
	}, [productsById]);

	const columns = useMemo(() => {
		const temp: {
			Header: typeof HEADERS[number];
			accessor: string;
		}[] = [
			{
				Header: COMPARE_TABLE_ATTRIBUTE_HEADER_NAME,
				accessor: COMPARE_TABLE_ATTRIBUTE_HEADER_NAME,
			},
		];
		products.map((p: ProductType) => {
			temp.push({
				Header: COMPARE_TABLE_PRODUCT_HEADER_NAME,
				accessor: `${p.id}`,
			});
		});
		// eslint-disable-next-line functional/no-loop-statement
		for (let i = temp.length; i <= max; ++i) {
			temp.push({
				Header: COMPARE_TABLE_ADD_PRODUCT_HEADER_NAME,
				accessor: `placeholder-${i}`,
			});
		}
		return temp;
	}, [products, max]);

	const data = useMemo(() => {
		const attrs = findCompAttrs(products);
		return attrs.map(({ identifier, name }) =>
			products.reduce(
				(acc, v: ProductWithAttrMap) => {
					acc[v.id] = v.attrMap[identifier];
					return acc;
				},
				{ [COMPARE_TABLE_ATTRIBUTE_HEADER_NAME]: name, identifier } as {
					__attr: string;
					identifier: string;
					[id: string]: string | ResponseProductAttribute;
				}
			)
		);
	}, [products]);

	const attrValueDisplay = (attr: ResponseProductAttribute) => {
		const attrValues = attr?.values ?? [{ value: localization.notavl.t() }];
		const textValues: string[] = [];
		const imageValues: string[] = [];
		attrValues.forEach(({ image1path, value }) => {
			const images = image1path?.length
				? Array.isArray(image1path)
					? image1path
					: [image1path]
				: [];
			const attrs = Array.isArray(value) ? value : [value];
			if (images.length) {
				imageValues.push(...images.map((imagePath) => imagePath));
			} else {
				textValues.push(...attrs);
			}
		});
		return { imageValues, textValues };
	};

	const changeThumbnail = async (product: ProductType, swatchId: string) => {
		const params = {
			storeId,
			catalogId,
			langId,
			...getContractIdParamFromContext(user?.context),
			partNumber: product.partNumber,
		};

		const response = await productFetcher(true)(params, reqParams);
		const root: ResponseProductType = extractContentsArray(response)[0];
		const found = root.items.find(({ attributes }) =>
			attributes.find(({ values }) => values.find(({ id }) => id === swatchId))
		);
		if (found) {
			setImageSrc({ ...imageSrc, [product.id]: found });
		}
	};

	const updateCompareData = (id: string) => {
		const newLen = len - 1;
		const newStorage = storage.map(
			(p, i) => (i === checked[id].seq ? undefined : p) as ProductType
		);
		const newChecked = omit(checked, id);

		update({
			...compareProductsData.compareData,
			len: newLen,
			disabled: newLen === max,
			checked: newChecked,
			storage: newStorage,
		});
	};

	const removeCompareProduct = (id: string) => {
		delete productsById[id];
		setProdsById({ ...productsById });
		updateCompareData(id);
	};

	useEffect(() => {
		setProdsById({ ...checked });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!len) {
			router.push('/');
		}
	}, [len, router]);

	return {
		columns,
		data,
		productsById,
		prodWidths,
		prodWidth: prodWidths,
		attrWidth,
		imageSrc,
		nProds,
		attrValueDisplay,
		removeCompareProduct,
		changeThumbnail,
	};
};
