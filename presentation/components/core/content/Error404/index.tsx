/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { error404ContainerSX } from '@/components/content/Error404/styles/container';
import { error404TypographySX } from '@/components/content/Error404/styles/typography';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { Paper, Typography } from '@mui/material';
import { FC } from 'react';

export const Error404: FC<{ id: ID }> = () => {
	const ErrorsNLS = useLocalization('error-message');

	return (
		<Paper sx={error404ContainerSX}>
			<Typography component="div" variant="subtitle2" sx={error404TypographySX}>
				{ErrorsNLS.HTTP_404_NOT_FOUND.t()}
			</Typography>
		</Paper>
	);
};
