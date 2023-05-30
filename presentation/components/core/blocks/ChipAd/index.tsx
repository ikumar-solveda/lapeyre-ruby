/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { chipAdSX } from '@/components/blocks/ChipAd/style';
import { Chip, ChipProps } from '@mui/material';
import { FC, useMemo } from 'react';

type Props = ChipProps & {
	identifier: string;
	value: string;
};

export const ChipAd: FC<Props> = ({ identifier, value: label, sx: _sx, ...props }) => {
	const name = identifier.replace(
		/(\w)(\S+)/g,
		(m, s0, s1) => `${s0.toUpperCase()}${s1.toLowerCase()}`
	);
	const sx = useMemo(() => ({ ..._sx, ...chipAdSX(name) }), [name, _sx]);
	return <Chip {...{ label, sx, ...props }} />;
};
