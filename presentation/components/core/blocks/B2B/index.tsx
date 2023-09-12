/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { isB2BStore, useSettings } from '@/data/Settings';
import { FC } from 'react';

type Props = {
	is?: boolean;
	children?: JSX.Element | JSX.Element[] | string | null;
};

export const B2B: FC<Props> = ({ is = true, children }) => {
	const { settings } = useSettings();
	return is === isB2BStore(settings) ? <>{children}</> : null;
};
