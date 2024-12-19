/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { WishListDetailsDeleteDialog } from '@/components/content/WishListDetails/parts/DeleteDialog';
import { wishListDetailsWishListNameInputSX } from '@/components/content/WishListDetails/styles/wishListNameInput';
import {
	WISHLIST_DETAILS_DIALOG_STATE_LIST,
	WISHLIST_DETAILS_NAME_MAX_LENGTH,
} from '@/data/constants/wishlist';
import { useWishListDetailsV2 } from '@/data/Content/WishListDetailsV2';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { FC, MouseEventHandler, useContext } from 'react';

export const WishListDetailsEdit: FC = () => {
	const localization = useLocalization('WishList');
	const {
		onDeleteWishList,
		onEdit,
		editData,
		onEditData,
		onUpdateName,
		onDialog,
		dialogState,
		busy,
	} = useContext(ContentContext) as ReturnType<typeof useWishListDetailsV2>;

	return (
		<Stack>
			<Grid container justifyContent="space-between" spacing={1}>
				<Grid xs={12} md={8} container item alignItems="flex-start" spacing={1}>
					<Grid item xs={12} md={6}>
						<TextField
							data-testid="view-wish-list-details-wish-list-name"
							fullWidth
							required
							id="view-wish-list-details-wish-list-name"
							size="small"
							name="wishListName"
							placeholder={localization.WishListName.t()}
							value={editData.name}
							inputProps={{ maxLength: WISHLIST_DETAILS_NAME_MAX_LENGTH }}
							onChange={onEditData}
							error={editData.error}
							helperText={editData.error ? localization.InvalidWishListName.t() : ''}
							sx={wishListDetailsWishListNameInputSX}
						/>
					</Grid>
					<Grid container item xs alignItems="center" spacing={1}>
						<Grid item>
							<OneClick
								data-testid="view-wish-list-details-save"
								id="view-wish-list-details-save"
								disabled={editData.error}
								onClick={onUpdateName}
								variant="contained"
							>
								{localization.Actions.Save.t()}
							</OneClick>
						</Grid>
						<Grid item>
							<Button
								onClick={onEdit(false)}
								variant="contained"
								color="secondary"
								data-testid="view-wish-list-details-cancel"
								id="view-wish-list-details-cancel"
								disabled={busy}
							>
								{localization.Cancel.t()}
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Button
						onClick={onDialog(WISHLIST_DETAILS_DIALOG_STATE_LIST) as MouseEventHandler}
						data-testid="view-wish-list-details-delete"
						id="view-wish-list-details-delete"
						variant="contained"
						color="secondary"
						disabled={busy}
					>
						{localization.Actions.DeleteList.t()}
					</Button>
				</Grid>
			</Grid>
			<WishListDetailsDeleteDialog
				open={dialogState === WISHLIST_DETAILS_DIALOG_STATE_LIST}
				onClose={onDialog(false)}
				title={localization.ConfirmDeleteTitle.t()}
				message={<>{localization.ConfirmDeleteMsg.t()}</>}
				actionLabel={localization.Confirm.t()}
				action={onDeleteWishList}
				busy={busy}
			/>
		</Stack>
	);
};
