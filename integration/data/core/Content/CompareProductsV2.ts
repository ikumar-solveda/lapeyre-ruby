/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024
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
import {
	getProductsByPartNumbersSWRKey,
	useProductsByPartNumbers,
} from '@/data/Content/ProductsByPartNumbers';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useCompareProductsState } from '@/data/state/useCompareProductsState';
import { CompareAttribute, CompareCheckObj, ProductWithAttrMap } from '@/data/types/Compare';
import { ProductType, ResponseProductAttribute, ResponseProductType } from '@/data/types/Product';
import { useUser } from '@/data/User';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { dAdd, dDiv, dMul } from '@/data/utils/floatingPoint';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getContractIdParamFromContext } from '@/data/utils/getContractIdParamFromContext';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { isEmpty, keyBy, keys, omit, uniqBy } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { mutate } from 'swr';

const EMPTY_OBJECT = {} as Record<string, CompareCheckObj>;

const findCompAttrs = (products: ProductType[]) => {
	const attrs: CompareAttribute[] = products
		.map(({ attributes }) => attributes)
		.flat()
		.filter(({ comparable }) => comparable === STRING_TRUE)
		.map(({ identifier, name, sequence }) => ({ identifier, name, sequence }));
	const uniq = uniqBy(attrs, 'identifier').sort((a, b) =>
		a.sequence === b.sequence ? a.name.localeCompare(b.name) : dMul(a.sequence, b.sequence)
	);
	return uniq;
};

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

export const useCompareProductsV2 = () => {
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
	const { initialized, compareData } = compareProductsData;
	const { len, checked, max } = compareData;
	const partNumbers = useMemo(() => keys(checked).sort(), [checked]);

	const { data: productsData } = useProductsByPartNumbers(partNumbers);

	const prodWidths = useMemo(() => Math.floor(dDiv(85.0, max)), [max]);
	const attrWidth = useMemo(() => dAdd(100, -dMul(prodWidths, max)), [prodWidths, max]);
	const nProds = useMemo(() => Object.keys(checked ?? {}).length, [checked]);
	const [imageSrc, setImageSrc] = useState({} as Record<string, ResponseProductType>);

	const products: ProductWithAttrMap[] = useMemo(() => {
		const asArray = Object.values<CompareCheckObj>(checked ?? EMPTY_OBJECT)
			.sort((a, b) => a.seq - b.seq)
			.map(({ product }) => Object.assign({ ...product }, { attrMap: findAttrs(product) }));
		return asArray;
	}, [checked]);

	const columns = useMemo(() => {
		const temp: {
			Header: (typeof HEADERS)[number];
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
				accessor: `${p.partNumber}`,
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
					acc[v.partNumber] = v.attrMap[identifier];
					return acc;
				},
				{ [COMPARE_TABLE_ATTRIBUTE_HEADER_NAME]: name, identifier } as {
					__attr: string;
					identifier: string;
					[partNumber: string]: string | ResponseProductAttribute;
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
			...getCurrencyParamFromContext(user?.context),
			partNumber: product.partNumber,
		};

		const response = await productFetcher(true)(params, reqParams);
		const root: ResponseProductType = extractContentsArray(response)[0];
		const found = root.items.find(({ attributes }) =>
			attributes.find(({ values }) => values.find(({ id }) => id === swatchId))
		);
		if (found) {
			setImageSrc({ ...imageSrc, [product.partNumber]: found });
		}
	};

	const removeCompareProduct = useCallback(
		(partNumber: string) => {
			const { len, checked, storage, max } = compareProductsData.compareData;
			const newLen = len - 1;
			const newStorage = storage.map(
				(p, i) => (i === checked[partNumber].seq ? undefined : p) as ProductType
			);
			const newChecked = omit(checked, partNumber);
			const partNumbers = keys(newChecked).sort();
			const key = getProductsByPartNumbersSWRKey({ partNumbers, settings, router, user });
			/**
			 * put into SWR cache before updating state, if there is a search request failure,
			 * the data could be inconsistent. But it is because of a failed server request, so it is acceptable.
			 */
			mutate(key, storage.filter(Boolean));
			update({
				...compareProductsData.compareData,
				len: newLen,
				disabled: newLen === max,
				checked: newChecked,
				storage: newStorage,
			});
		},
		[compareProductsData, router, settings, update, user]
	);

	useEffect(() => {
		if (!isEmpty(productsData)) {
			const productsKeyByPartNumber = keyBy(productsData, 'partNumber');
			const { checked, storage, ...rest } = compareProductsData.compareData;
			update({
				...rest,
				checked: keys(checked).reduce(
					(acc, partNumber) => ({
						...acc,
						[partNumber]: {
							seq: checked[partNumber].seq,
							product: productsKeyByPartNumber[partNumber] ?? checked[partNumber].product,
						},
					}),
					{} as Record<string, CompareCheckObj>
				),
				storage: storage.map((product) => {
					if (!product) {
						return product;
					} else {
						const { partNumber } = product;
						return productsKeyByPartNumber[partNumber] ?? product;
					}
				}),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productsData]);

	useEffect(() => {
		if (initialized && !len) {
			router.push('/');
		}
	}, [len, initialized, router]);

	return {
		columns,
		data,
		productsByPartNumber: checked,
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
