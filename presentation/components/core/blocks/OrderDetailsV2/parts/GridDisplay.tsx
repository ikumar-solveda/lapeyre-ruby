/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Grid, GridProps, Stack } from '@mui/material';
import { Children, FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<Record<string, any>> & { gridItemProps?: GridProps };

export const OrderDetailsV2GridDisplay: FC<Props> = ({
	children,
	gridItemProps = {},
	...props
}) => {
	const childrenArray = Children.toArray(children);
	return (
		<Grid container spacing={2} {...props}>
			{childrenArray.map((child, i) => (
				<Grid key={i} item md={4} xs={12} {...gridItemProps}>
					<Stack spacing={2}>{child}</Stack>
				</Grid>
			))}
		</Grid>
	);
};
