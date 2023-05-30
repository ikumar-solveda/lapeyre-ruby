/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { cardContentSX } from '@/components/blocks/Card/styles/cardContent';
import { CardContent, Divider, Grid } from '@mui/material';

type Props = {
	content: JSX.Element;
	divider?: boolean;
};
export const CardHeader: FC<Props> = ({ content, divider }) =>
	content ? (
		<>
			<Grid item xs={false} sx={{ width: '100%' }}>
				<CardContent sx={cardContentSX}>{content}</CardContent>
			</Grid>
			{divider ? <Divider /> : null}
		</>
	) : null;
