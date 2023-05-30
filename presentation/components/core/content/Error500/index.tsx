/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { error500ContainerSX } from '@/components/content/Error500/styles/container';
import { error500TypographySX } from '@/components/content/Error500/styles/typography';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { Paper, Typography } from '@mui/material';
import { FC } from 'react';

export const Error500: FC<{ id: ID }> = () => {
	const ErrorsNLS = useLocalization('error-message');

	return (
		<Paper sx={error500ContainerSX}>
			<Typography component="div" variant="subtitle2" sx={error500TypographySX}>
				{ErrorsNLS.HTTP_500_INTERNAL_SERVER_ERROR.t()}
			</Typography>
		</Paper>
	);
};
