/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useEffect, useState } from 'react';

const calc = (doc: Document | undefined) => {
	const { clientWidth = 0, clientHeight = 0 } = doc?.documentElement ?? {};
	const w = clientWidth / 16.0;
	const h = clientHeight / 16.0;
	const w_px = clientWidth;
	const h_px = clientHeight;
	return { w, h, w_px, h_px };
};
export const useWinDimsInEM = () => {
	const doc = typeof document !== 'undefined' ? document : ({} as Document);
	const [dims, setDims] = useState(calc(doc));

	useEffect(() => {
		const calcResize = () => setDims(() => calc(doc));
		window.addEventListener('resize', calcResize);
		return () => window.removeEventListener('resize', calcResize);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return dims;
};
