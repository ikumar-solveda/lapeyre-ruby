/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useNextRouter } from '@/data/Content/_NextRouter';
import {
	getProductsByPartNumbersSWRKey,
	useProductsByPartNumbers,
} from '@/data/Content/ProductsByPartNumbers';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useCompareProductsState } from '@/data/state/useCompareProductsState';
import { ID } from '@/data/types/Basic';
import { CompareCheckObj, CompareData, Edge } from '@/data/types/Compare';
import { ProductType } from '@/data/types/Product';
import { useUser } from '@/data/User';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { cloneDeep, isEmpty, keyBy, keys, omit } from 'lodash';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { mutate } from 'swr';

export const useCompareCollectorV2 = (pageId?: ID) => {
	const theme = useTheme();
	const { settings } = useSettings();
	const { user } = useUser();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
	const MAX_COMPS = useMemo(() => (isTablet ? 3 : 4), [isTablet]);

	const {
		compareProductsData,
		actions: { update },
	} = useCompareProductsState();
	const INIT_STATE: CompareData = useMemo(
		() => ({
			max: MAX_COMPS,
			disabled: false,
			checked: {},
			storage: [],
			len: 0,
			counter: 0,
		}),
		[MAX_COMPS]
	);

	const compareState = useMemo(() => {
		const { compareData } = compareProductsData;
		return !(compareData.len > 0) || compareData.pageId !== pageId
			? cloneDeep(INIT_STATE)
			: compareData;
	}, [INIT_STATE, compareProductsData, pageId]);

	const partNumbers = useMemo(() => keys(compareState.checked).sort(), [compareState]);

	const { data: productsData } = useProductsByPartNumbers(partNumbers);

	const anchorRef = useRef<HTMLDivElement>(null);
	const [edges, setEdges] = useState<Edge>({} as Edge);
	const [open, setOpen] = useState<boolean>(false);
	const [once, setOnce] = useState(false);
	const router = useNextRouter();
	const RouteLocal = useLocalization('Routes');

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>, product: ProductType) => {
			const c = e.target.checked;
			const pn = product.partNumber;
			const { len, checked, storage, counter } = compareState;
			const newLen = len + (c ? 1 : -1);

			let newCounter = counter;
			let newStorage;
			let newChecked;

			if (c) {
				newChecked = { ...checked, [pn]: { seq: counter, product } };
				newStorage = [...storage, product];
				++newCounter;
			} else {
				newStorage = storage.map((p, i) => (i === checked[pn].seq ? undefined : p) as ProductType);
				newChecked = omit(checked, pn);
			}
			const partNumbers = keys(newChecked).sort();
			const key = getProductsByPartNumbersSWRKey({ partNumbers, settings, router, user });
			/**
			 * put into SWR cache before updating state, if there is a search request failure,
			 * the data could be inconsistent. But it is because of a failed server request, so it is acceptable.
			 */
			mutate(key, storage.filter(Boolean));
			const updated = {
				...compareState,
				len: newLen,
				disabled: newLen === MAX_COMPS,
				counter: newCounter,
				checked: newChecked,
				storage: newStorage,
				pageId,
			};
			update(updated);
		},
		[MAX_COMPS, compareState, pageId, router, settings, update, user]
	);

	const removeAll = () => {
		update(cloneDeep(INIT_STATE));
		setOnce(false);
	};

	const remove = useCallback(
		(product: ProductType) =>
			onChange(
				{ target: { checked: false } as HTMLInputElement } as ChangeEvent<HTMLInputElement>,
				product
			),
		[onChange]
	);

	const openCompare = useCallback(() => {
		router.push({
			pathname: RouteLocal.CompareProducts.route.t(),
		});
	}, [RouteLocal.CompareProducts.route, router]);

	const updateDivPlacement = useCallback((anchor: typeof anchorRef) => {
		if (anchor.current) {
			const { left } = anchor.current.getBoundingClientRect();
			setEdges({ left: `-${left}px`, width: `${document.body.clientWidth}px` });
		}
	}, []);

	const onToggle = useCallback((event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
		event.stopPropagation();
		setOpen((prev) => !prev);
	}, []);

	const onRemove = useCallback(
		(product: ProductType) => (_: MouseEvent<HTMLButtonElement>) => remove(product),
		[remove]
	);

	useEffect(() => {
		if (MAX_COMPS !== compareState.max) {
			const { len, checked, storage } = compareState;
			const updated = { disabled: len === MAX_COMPS };

			// if screen size has shrunk -- delete last few items added that no longer fit in the screen
			if (len > MAX_COMPS) {
				const toWipe = storage
					.filter(Boolean)
					.reverse()
					.slice(0, len - MAX_COMPS)
					.map(({ partNumber }) => partNumber);
				const newChecked = omit(checked, toWipe);
				const newStorage = storage.slice(0, checked[toWipe.at(-1) as string].seq);

				Object.assign(updated, {
					len: MAX_COMPS,
					disabled: true,
					counter: newStorage.length,
					checked: newChecked,
					storage: newStorage,
				});
			}
			update({ ...compareState, ...updated, max: MAX_COMPS, pageId });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [MAX_COMPS]);

	// open compare widget on first addition
	useEffect(() => {
		const o = open;
		if (compareState.len && !once && !o) {
			setOpen(true);
		}
		if (o) {
			setOnce(true);
		}
	}, [compareState, once, open]);

	useEffect(() => {
		if (!isEmpty(productsData)) {
			const productsKeyByPartNumber = keyBy(productsData, 'partNumber');
			const { checked, storage, ...rest } = compareState;
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
		const { compareData, initialized } = compareProductsData;
		if (initialized && compareData.len > 0) {
			if (compareData.pageId !== pageId) {
				removeAll();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [compareProductsData, pageId]);

	return {
		compareState,
		compareEnabled: !isMobile,
		onChange,
		removeAll,
		anchorRef,
		edges,
		open,
		setOpen,
		remove,
		updateDivPlacement,
		openCompare,
		onToggle,
		onRemove,
	};
};
