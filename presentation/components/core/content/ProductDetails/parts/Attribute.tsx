/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React from 'react';
import { Typography, Stack } from '@mui/material';
import { SWATCH } from '@/data/constants/catalog';

type ProductAttributeProps = {
	title: string;
	element: JSX.Element;
	swatchValue: string | string[];
	attributeType: string;
};

export const ProductAttribute: React.FC<ProductAttributeProps> = ({
	title,
	element,
	swatchValue,
	attributeType,
}: any) => (
	<Stack spacing={1}>
		<Typography variant="body2">
			{title}
			<Typography variant="body1" component="span">
				{attributeType === SWATCH ? ': ' + swatchValue : null}
			</Typography>
		</Typography>
		{element}
	</Stack>
);
