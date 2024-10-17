/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useCompareProductsState } from '@/data/state/useCompareProductsState';
import { ID } from '@/data/types/Basic';
import { CompareData, Edge } from '@/data/types/Compare';
import { ProductType } from '@/data/types/Product';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { cloneDeep, omit } from 'lodash';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

/** @deprecated, use  `useCompareCollectorV2` */
export const useCompareCollector = (pageId?: ID) => {
	const theme = useTheme();
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

	const [compareState, setCompareState] = useState<CompareData>(cloneDeep(INIT_STATE));

	const anchorRef = useRef<HTMLDivElement>(null);
	const [edges, setEdges] = useState<Edge>({} as Edge);
	const [open, setOpen] = useState<boolean>(false);
	const [once, setOnce] = useState(false);
	const router = useNextRouter();
	const RouteLocal = useLocalization('Routes');

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>, product: ProductType) =>
			setCompareState((old) => {
				const c = e.target.checked;
				const id = product.id;
				const { len, checked, storage, counter } = compareState;
				const newLen = len + (c ? 1 : -1);

				let newCounter = counter;
				let newStorage;
				let newChecked;

				if (c) {
					newChecked = { ...checked, [id]: { seq: counter, product } };
					newStorage = [...storage, product];
					++newCounter;
				} else {
					newStorage = storage.map(
						(p, i) => (i === checked[id].seq ? undefined : p) as ProductType
					);
					newChecked = omit(checked, id);
				}
				return {
					...old,
					len: newLen,
					disabled: newLen === MAX_COMPS,
					counter: newCounter,
					checked: newChecked,
					storage: newStorage,
					pageId,
				};
			}),
		[MAX_COMPS, compareState, pageId]
	);

	const removeAll = () => {
		setCompareState(cloneDeep(INIT_STATE));
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
			setCompareState((old) => {
				const { len, checked, storage } = old;
				const updated = { disabled: len === MAX_COMPS };

				// if screen size has shrunk -- delete last few items added that no longer fit in the screen
				if (len > MAX_COMPS) {
					const toWipe = storage
						.filter(Boolean)
						.reverse()
						.slice(0, len - MAX_COMPS)
						.map(({ id }) => id);
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

				return { ...old, ...updated, max: MAX_COMPS, pageId };
			});
		}
	}, [MAX_COMPS]); // eslint-disable-line react-hooks/exhaustive-deps

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
		update(compareState);
	}, [compareState]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (compareProductsData.compareData.len > 0) {
			if (compareProductsData.compareData.pageId !== pageId) {
				removeAll();
			} else {
				setCompareState(compareProductsData.compareData);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
