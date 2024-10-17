/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { touchMoveListener } from '@/utils/touchMoveListener';
import { useWinDimsInEM } from '@/utils/useWinDimsInEM';
import { SxProps, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Autocomplete, AutocompleteProps } from '@react-google-maps/api';
import { FC, PropsWithChildren, RefObject, useCallback, useEffect } from 'react';

const StyledGoogleMapsAutocomplete = styled(Autocomplete)({});

type Props = PropsWithChildren<
	AutocompleteProps & {
		searchTextFieldRef: RefObject<HTMLInputElement>;
		sx?: SxProps<Theme>;
	}
>;

export const GoogleMapsAutocompleteWithResize: FC<Props> = ({
	children,
	searchTextFieldRef,
	...rest
}) => {
	const { w_px } = useWinDimsInEM();

	const onClose = useCallback(() => {
		if (document.activeElement === searchTextFieldRef.current) {
			searchTextFieldRef.current?.blur();
		}
	}, [searchTextFieldRef]);

	useEffect(() => {
		onClose();
	}, [w_px]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		touchMoveListener(onClose);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return <StyledGoogleMapsAutocomplete {...rest}>{children}</StyledGoogleMapsAutocomplete>;
};
