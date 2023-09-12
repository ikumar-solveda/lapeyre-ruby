/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { cancelButtonSX } from '@/components/blocks/Card/styles/cancelButton';
import { cardActionsSX } from '@/components/blocks/Card/styles/cardActions';
import { confirmSX } from '@/components/blocks/Card/styles/confirm';
import { confirmButtonSX } from '@/components/blocks/Card/styles/confirmButton';
import { Linkable } from '@/components/blocks/Linkable';
import { OneClick } from '@/components/blocks/OneClick';
import { Box, CardActions, Grid, Typography } from '@mui/material';
import { kebabCase } from 'lodash';
import { FC, useCallback, useState } from 'react';

type Props = {
	actions: any[];
	cancelLabel?: string;
	confirmLabel?: string;
	testId: string;
};
export const UserActions: FC<Props> = ({ actions, cancelLabel, confirmLabel, testId }) => {
	const [confirmState, setConfirmState] = useState<boolean>(false);
	const [confirmActionIndex, setConfirmActionIndex] = useState<number>(0);

	const toggleConfirm = useCallback(
		(index: number) => () => {
			setConfirmState((old) => !old);
			setConfirmActionIndex(index);
		},
		[]
	);

	const onConfirm = async () => {
		await actions[confirmActionIndex]?.handleClick();
		toggleConfirm(0)();
	};

	const onCancel = useCallback(() => toggleConfirm(0)(), [toggleConfirm]);
	const onAction = useCallback(
		(v: any, index: number) => (v.enableConfirmation ? toggleConfirm(index) : v.handleClick),
		[toggleConfirm]
	);

	return (
		<Grid container alignItems="stretch" justifyContent="flex-start" item xs={false}>
			<CardActions sx={{ ...cardActionsSX, p: 2 }}>
				{actions.map((v: any, index: number) => (
					<Grid item key={`${v.text}_${index}`}>
						{v.link ? (
							<Linkable
								id={kebabCase(`${testId}-${v.text}`)}
								data-testid={kebabCase(`${testId}-${v.text}`)}
								href={v.link}
							>
								{v.text}
							</Linkable>
						) : (
							<OneClick
								data-testid={kebabCase(`${testId}-${v.text}`)}
								id={kebabCase(`${testId}-${v.text}`)}
								variant={v.variant ?? 'contained'}
								disabled={v.disable ?? false}
								onClick={onAction(v, index)}
							>
								<Typography>{v.text}</Typography>
							</OneClick>
						)}
					</Grid>
				))}
			</CardActions>

			{confirmState ? (
				<Box sx={confirmSX}>
					<Grid
						container
						direction="column"
						justifyContent="flex-end"
						sx={{ height: '100%', px: 2 }}
						spacing={2}
					>
						<Grid item>
							<OneClick
								data-testid={kebabCase(`${testId}-confirm`)}
								id={kebabCase(`${testId}-confirm`)}
								sx={confirmButtonSX}
								variant="outlined"
								fullWidth
								onClick={onConfirm}
							>
								{confirmLabel}
							</OneClick>
						</Grid>
						<Grid item>
							<OneClick
								data-testid={kebabCase(`${testId}-cancel`)}
								id={kebabCase(`${testId}-cancel`)}
								sx={cancelButtonSX}
								variant="outlined"
								fullWidth
								onClick={onCancel}
							>
								{cancelLabel}
							</OneClick>
						</Grid>
					</Grid>
				</Box>
			) : null}
		</Grid>
	);
};
