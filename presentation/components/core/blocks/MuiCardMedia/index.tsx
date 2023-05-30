/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useImagePath } from '@/data/Content/_ImagePath';
import { CardMedia, CardMediaTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ComponentProps } from 'react';

type Props = ComponentProps<OverridableComponent<CardMediaTypeMap<Record<string, unknown>, 'div'>>>;
export const MuiCardMedia = (props: Props) => {
	const { image: img, ...rest } = props;
	const image = useImagePath(img ?? '');
	return <CardMedia {...rest} image={image} />;
};
