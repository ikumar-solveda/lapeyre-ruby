/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { combineSX } from '@/utils/combineSX';
import { SxProps, Theme } from '@mui/material';

type PropsObject = Record<string, SxProps<Theme>>;

type StateTheme = { ownerState: { className?: string; variant?: string }; theme: Theme };

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
	const combinedStyles = combineSX([styles, custom?.styles]);
	return ({ ownerState, theme }: StateTheme) =>
		theme.unstable_sx(
			combineSX([
				(ownerState?.variant && combinedVariants[ownerState.variant]) || {},
				combinedStyles as Record<string, unknown>,
			])
		);
};
