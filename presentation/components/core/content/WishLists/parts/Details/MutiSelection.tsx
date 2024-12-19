/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { WishListDetailsDeleteDialog } from '@/components/content/WishLists/parts/Details/DeleteDialog';
import { useWishListDetails } from '@/data/Content/_WishListDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ProductType } from '@/data/types/Product';
import { Cancel } from '@mui/icons-material';
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import { Dictionary } from 'lodash';
import { FC, useContext, useMemo } from 'react';

/** @deprecated use `WishListDetails` */
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
	} = useContext(ContentContext) as ReturnType<typeof useWishListDetails> & {
		productMap: Dictionary<ProductType>;
	};
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
			<Paper sx={{ mb: 2, p: 1 }}>
				<Grid container alignItems="center">
					<Grid container item xs={6} alignItems="center">
						<IconButton
							color="primary"
							onClick={deSelectAll}
							data-testid="view-wishlist-cancel-icon-button"
							id="view-wishlist-cancel-icon-button"
						>
							<Cancel />
						</IconButton>
						<Typography sx={{ ml: '0.25rem' }} variant="h5" component="p">
							{localization.ProductSelected.t({ n: selection.size })}
						</Typography>
					</Grid>
					<Grid container xs spacing={2} justifyContent="flex-end" item>
						<Grid item>
							<Button
								variant="contained"
								onClick={onAddToCart(...selectedItems)}
								disabled={moveDisabled}
								data-testid="view-wishlist-add-to-cart"
								id="view-wishlist-add-to-cart"
							>
								{localization.Actions.AddSelectedToCart.t()}
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								color="secondary"
								onClick={onDialog('multi')}
								data-testid="view-wishlist-deleted"
								id="view-wishlist-deleted"
							>
								{localization.Actions.DeletedSelected.t()}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
			<WishListDetailsDeleteDialog
				open={dialogState === 'multi'}
				onClose={onDialog(false)}
				title={localization.RemoveItemsTitle.t()}
				message={<>{localization.ConfirmDeleteSelectedMsg.t()}</>}
				actionLabel={localization.ConfirmDelete.t()}
				action={onDeleteFromWishList(
					...items
						.filter((item) => selection.selected[item.partNumber])
						.map((item) => productMap[item.partNumber])
				)}
			/>
		</>
	);
};
