/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { swatchSX } from '@/components/blocks/Swatch/style';
import { IconButton, IconButtonProps } from '@mui/material';
import { FC } from 'react';
import { Check } from '@mui/icons-material';
import { combineSX } from '@/utils/combineSX';
import { useImagePath } from '@/data/Content/_ImagePath';

type SwatchProps = IconButtonProps & {
	selected?: boolean;
	image?: string;
};

export const Swatch: FC<SwatchProps> = ({
	selected = false,
	image: img = '',
	sx,
	onClick,
	...props
}) => {
	const image = useImagePath(img);
	return (
		<IconButton
			size="large"
			sx={combineSX([swatchSX({ selected, image, clickable: !!onClick }), sx])}
			onClick={onClick}
			{...props}
		>
			{selected ? <Check fontSize="small" /> : null}
		</IconButton>
	);
};
