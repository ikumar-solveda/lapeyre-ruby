/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Grid, Stack } from '@mui/material';
import { Children, FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<Record<string, any>>;

/** @deprecated  see `OrderDetailsV2` */
export const OrderDetailsGridDisplay: FC<Props> = ({ children, ...props }) => {
	const childrenArray = Children.toArray(children);
	return (
		<Grid container spacing={2} {...props}>
			{childrenArray.map((child, i) => (
				<Grid key={i} item md={4} xs={12}>
					<Stack spacing={2}>{child}</Stack>
				</Grid>
			))}
		</Grid>
	);
};
