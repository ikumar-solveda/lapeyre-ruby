/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { WishListDetailsDeleteDialog } from '@/components/content/WishListDetails/parts/DeleteDialog';
import { wishListDetailsMultipleSelectionSX } from '@/components/content/WishListDetails/styles/multipleSelection';
import { wishListDetailsMultipleSelectionFontSX } from '@/components/content/WishListDetails/styles/multipleSelectionFont';
import { WISHLIST_DETAILS_DIALOG_STATE_MULTI } from '@/data/constants/wishlist';
import { useWishListDetailsV2 } from '@/data/Content/WishListDetailsV2';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Cancel } from '@mui/icons-material';
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const WishListDetailsMultiSelection: FC = () => {
	const localization = useLocalization('WishList');
	const {
		items,
		deSelectAll,
		selection,
		onAddToCart,
		onDeleteFromWishList,
		productMap,
		onDialog,
		dialogState,
		busy,
	} = useContext(ContentContext) as ReturnType<typeof useWishListDetailsV2>;

	const selectedItems = useMemo(
		() =>
			items
				.filter((item) => selection.selected[item.partNumber] && productMap[item.partNumber])
				.map((item) => productMap[item.partNumber]),
		[items, productMap, selection]
	);
	const moveDisabled = useMemo(
		() => selectedItems.some((item) => !item.productPrice?.min),
		[selectedItems]
	);

	return (
		<>
			<Paper sx={wishListDetailsMultipleSelectionSX}>
				<Grid container alignItems="center">
					<Grid container item xs={6} alignItems="center">
						<IconButton
							color="primary"
							onClick={deSelectAll}
							data-testid="view-wish-list-details-cancel-icon-button"
							id="view-wish-list-details-cancel-icon-button"
						>
							<Cancel />
						</IconButton>
						<Typography sx={wishListDetailsMultipleSelectionFontSX} variant="h5" component="p">
							{localization.ProductSelected.t({ n: selection.size })}
						</Typography>
					</Grid>
					<Grid container xs spacing={2} justifyContent="flex-end" item>
						<Grid item>
							<Button
								variant="contained"
								onClick={onAddToCart(...selectedItems)}
								data-testid="view-wish-list-details-add-to-cart"
								id="view-wish-list-details-add-to-cart"
								disabled={moveDisabled}
							>
								{localization.Actions.AddSelectedToCart.t()}
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								color="secondary"
								onClick={onDialog(WISHLIST_DETAILS_DIALOG_STATE_MULTI)}
								data-testid="view-wish-list-details-deleted"
								id="view-wish-list-details-deleted"
							>
								{localization.Actions.DeletedSelected.t()}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
			<WishListDetailsDeleteDialog
				open={dialogState === WISHLIST_DETAILS_DIALOG_STATE_MULTI}
				onClose={onDialog(false)}
				title={localization.RemoveItemsTitle.t()}
				message={<>{localization.ConfirmDeleteSelectedMsg.t()}</>}
				actionLabel={localization.ConfirmDelete.t()}
				action={onDeleteFromWishList(...selectedItems)}
				busy={busy}
			/>
		</>
	);
};
