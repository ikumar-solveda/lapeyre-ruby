/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useWinDimsInEM } from '@/utils/useWinDimsInEM';
import { Select as MatSelect, SelectProps } from '@mui/material';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const SelectWithResize = <T extends unknown>(props: PropsWithChildren<SelectProps<T>>) => {
	const { children, ...rest } = props;
	const { native, open: _open } = rest;

	const [open, setOpen] = useState<boolean>(!!_open);
	const onOpen = useCallback((_event: unknown) => setOpen(() => true), []);
	const onClose = useCallback((_event: unknown) => setOpen(() => false), []);
	const { w_px } = useWinDimsInEM();

	useEffect(() => {
		if (open) {
			onClose(null);
			setTimeout(() => onOpen(null), 1);
		}
	}, [w_px]); // eslint-disable-line react-hooks/exhaustive-deps

	return native ? (
		<MatSelect {...rest}>{children}</MatSelect>
	) : (
		<MatSelect {...{ ...rest, open, onOpen, onClose }}>{children}</MatSelect>
	);
};
