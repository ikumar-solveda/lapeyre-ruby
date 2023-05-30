/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { cancelButtonSX } from '@/components/blocks/Card/styles/cancelButton';
import { cardActionsSX } from '@/components/blocks/Card/styles/cardActions';
import { confirmSX } from '@/components/blocks/Card/styles/confirm';
import { confirmButtonSX } from '@/components/blocks/Card/styles/confirmButton';
import { Linkable } from '@/components/blocks/Linkable';
import { Box, Button, CardActions, Grid, Typography } from '@mui/material';
import { kebabCase } from 'lodash';
import { FC, useState } from 'react';

type Props = {
	actions: any[];
	cancelLabel?: string;
	confirmLabel?: string;
	testId: string;
};
export const UserActions: FC<Props> = ({ actions, cancelLabel, confirmLabel, testId }) => {
	const [confirmState, setConfirmState] = useState<boolean>(false);
	const [confirmActionIndex, setConfirmActionIndex] = useState<number>(0);

	const toggleConfirm = (index: number) => {
		setConfirmState(!confirmState);
		setConfirmActionIndex(index);
	};

	const onConfirm = () => {
		actions[confirmActionIndex]?.handleClick();
		toggleConfirm(0);
	};

	const onCancel = () => toggleConfirm(0);

	const onAction = (v: any, index: number) => {
		if (v.enableConfirmation) {
			toggleConfirm(index);
		} else {
			v.handleClick();
		}
	};
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
							<Button
								data-testid={kebabCase(`${testId}-${v.text}`)}
								id={kebabCase(`${testId}-${v.text}`)}
								variant={v.variant ?? 'contained'}
								disabled={v.disable ?? false}
								onClick={() => onAction(v, index)}
							>
								<Typography>{v.text}</Typography>
							</Button>
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
							<Button
								data-testid={kebabCase(`${testId}-confirm`)}
								id={kebabCase(`${testId}-confirm`)}
								sx={confirmButtonSX}
								variant="outlined"
								fullWidth
								onClick={onConfirm}
							>
								{confirmLabel}
							</Button>
						</Grid>
						<Grid item>
							<Button
								data-testid={kebabCase(`${testId}-cancel`)}
								id={kebabCase(`${testId}-cancel`)}
								sx={cancelButtonSX}
								variant="outlined"
								fullWidth
								onClick={onCancel}
							>
								{cancelLabel}
							</Button>
						</Grid>
					</Grid>
				</Box>
			) : null}
		</Grid>
	);
};
