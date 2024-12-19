/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Empty } from '@/components/blocks/EmptyContent/Empty';
import { emptyContentDefaultSX } from '@/components/blocks/EmptyContent/styles/default';
import { Stack, type SxProps, type Theme, Typography } from '@mui/material';
import type { FC } from 'react';

type Props = {
	title: string;
	description?: string;
	alt?: string;
	altId?: string;
	sx?: SxProps<Theme>;
};
export const EmptyContent: FC<Props> = ({
	title,
	description,
	alt,
	altId,
	sx = emptyContentDefaultSX,
}) => (
	<Stack sx={sx} spacing={1}>
		<Empty altId={altId} alt={alt ?? title} />
		<Typography variant="h6">{title}</Typography>
		{description ? <Typography>{description}</Typography> : null}
	</Stack>
);
