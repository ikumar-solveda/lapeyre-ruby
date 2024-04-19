/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable/modern';
import { Img } from '@/components/blocks/MaterialImage';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { FC } from 'react';

export const MUI_ELEMENTS: Record<string, OverridableComponent<any>> = {
	Box,
	Button,
	Container,
	Grid,
	Paper,
};

export const SPECIAL_TAGS: Record<string, FC<any>> = {
	a: Linkable,
	button: Button,
	div: Box,
	img: Img,
};

export const TYPOGRAPHY_TAGS: Record<string, OverridableComponent<any>> = [
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'p:body1',
	'strong',
	'overline',
].reduce(
	(named, key) => ({
		...named,
		[key.split(':').at(0) || '']: (props: any) => (
			<Typography variant={key.split(':').at(-1)} {...props} />
		),
	}),
	{}
);
