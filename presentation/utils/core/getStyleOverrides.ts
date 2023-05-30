/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getSX } from '@/utils/getSX';
import { SxProps, Theme } from '@mui/material';

type PropsObject = Record<string, SxProps>;

type StateTheme = { ownerState: { className?: string; variant?: string } };

type AddVars = {
	styles?: SxProps<Theme>;
	variants?: PropsObject;
	custom?: {
		styles?: SxProps<Theme>;
		variants?: PropsObject;
	};
};

export const getStyleOverrides = ({ styles, variants, custom }: AddVars) => {
	const combinedVariants = { ...variants, ...custom?.variants };
	const combinedStyles = { ...styles, ...custom?.styles };
	return ({ ownerState }: StateTheme) =>
		getSX({
			...((ownerState?.variant && combinedVariants[ownerState.variant]) || {}),
			...(combinedStyles as Record<string, unknown>),
		});
};
