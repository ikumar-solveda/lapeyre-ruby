/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { WishListDetailsDeleteDialog } from '@/components/content/WishLists/parts/Details/DeleteDialog';
import { useWishListDetails } from '@/data/Content/_WishListDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { FC, useContext } from 'react';

/** @deprecated use `WishListDetails` */
export const WishListDetailsEdit: FC = () => {
	const localization = useLocalization('WishList');
	const { onDeleteWishList, onEdit, editData, onEditData, onUpdateName, onDialog, dialogState } =
		useContext(ContentContext) as ReturnType<typeof useWishListDetails>;

	return (
		<Stack>
			<Grid container justifyContent="space-between" spacing={1}>
				<Grid xs={12} md={8} container item alignItems="flex-start" spacing={1}>
					<Grid item xs={12} md={6}>
						<TextField
							data-testid="view-wish-list-wish-list-name"
							fullWidth
							required
							id="update-wish-list-name"
							size="small"
							name="wishListName"
							placeholder={localization.WishListName.t()}
							value={editData.name}
							inputProps={{ maxLength: 128 }}
							onChange={onEditData}
							error={editData.error}
							helperText={editData.error ? localization.InvalidWishListName.t() : ''}
							sx={{ mt: 0.5 }}
						/>
					</Grid>
					<Grid container item xs alignItems="center" spacing={1}>
						<Grid item>
							<Button
								data-testid="view-wishlist-save"
								id="view-wishlist-save"
								disabled={editData.error}
								onClick={onUpdateName}
								variant="contained"
							>
								{localization.Actions.Save.t()}
							</Button>
						</Grid>
						<Grid item>
							<Button
								onClick={onEdit(false)}
								variant="contained"
								color="secondary"
								data-testid="view-wishlist-cancel"
								id="view-wishlist-cancel"
							>
								{localization.Cancel.t()}
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Button
						onClick={onDialog('list')}
						data-testid="view-wishlist-delete"
						id="view-wishlist-delete"
						variant="contained"
						color="secondary"
					>
						{localization.Actions.DeleteList.t()}
					</Button>
				</Grid>
			</Grid>
			<WishListDetailsDeleteDialog
				open={dialogState === 'list'}
				onClose={onDialog(false)}
				title={localization.ConfirmDeleteTitle.t()}
				message={<>{localization.ConfirmDeleteMsg.t()}</>}
				actionLabel={localization.Confirm.t()}
				action={onDeleteWishList}
			/>
		</Stack>
	);
};
