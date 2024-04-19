/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useWishListDetails } from '@/data/Content/_WishListDetails';

import { Linkable } from '@/components/blocks/Linkable';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { WishListDetailsEdit } from '@/components/content/WishLists/parts/Details/Edit';
import { WishListDetailsMultiSelection } from '@/components/content/WishLists/parts/Details/MutiSelection';
import { WishListDetailsProductCard } from '@/components/content/WishLists/parts/Details/ProductCard';
import { wishListDetailsNameSX } from '@/components/content/WishLists/styles/details/name';
import { useWishLists } from '@/data/Content/WishLists';
import { useLocalization } from '@/data/Localization';
import { WISHLIST_STATE } from '@/data/constants/wishlist';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { Breadcrumbs, Button, Divider, Grid, Pagination, Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

type Props = {
	wishList: ReturnType<typeof useWishLists>['wishLists'][0];
};

export const WishListDetails: FC<Props> = ({ wishList }) => {
	const localization = useLocalization('WishList');
	const routes = useLocalization('Routes');
	const { productMap, onDelete, mutateWishLists } = useContext(ContentContext) as ReturnType<
		typeof useWishLists
	>;
	const wlDetails = useWishListDetails(wishList, onDelete, mutateWishLists);
	const { onPage, pagination, totalPages, displayedItems, selectAll, selection, edit, onEdit } =
		wlDetails;

	return (
		<ContentProvider value={{ ...wlDetails, productMap }}>
			<Stack spacing={1}>
				<Breadcrumbs aria-label={wishList.description}>
					<Linkable
						href={routes.WishLists.route.t()}
						id={routes.WishLists.route.t()}
						data-testid={routes.WishLists.route.t()}
					>
						<Typography variant="h3">{localization.Title.t()}</Typography>
					</Linkable>
					<Typography variant="h4" sx={wishListDetailsNameSX}>
						{wishList.description}
					</Typography>
				</Breadcrumbs>
				<Divider />

				{selection.size > 1 ? (
					<WishListDetailsMultiSelection />
				) : edit ? (
					<WishListDetailsEdit />
				) : (
					<Stack direction="row" spacing={2}>
						{displayedItems.length ? (
							<Button
								data-testid="view-wishlist-select-all"
								id="view-wishlist-select-all"
								variant="contained"
								onClick={selectAll}
							>
								{localization.Actions.SelectAll.t()}
							</Button>
						) : null}
						{wishList.state !== WISHLIST_STATE.DEFAULT ? (
							<Button
								onClick={onEdit(true)}
								variant="contained"
								color="secondary"
								data-testid="view-wish-list-edit"
								id="view-wish-list-edit"
							>
								{localization.Actions.EditList.t()}
							</Button>
						) : null}
					</Stack>
				)}
				<Stack>
					{displayedItems.length ? (
						<Grid container spacing={1}>
							{displayedItems.map((item) => (
								<Grid item xs={12} sm={6} md={4} key={item.partNumber}>
									{productMap[item.partNumber] ? (
										<WishListDetailsProductCard product={productMap[item.partNumber]} />
									) : (
										<ProgressIndicator />
									)}
								</Grid>
							))}
						</Grid>
					) : (
						<Typography>{localization.EmptyWishListMsg.t()}</Typography>
					)}
				</Stack>

				{totalPages > 1 ? (
					<Pagination
						color="primary"
						count={totalPages}
						shape="rounded"
						page={pagination.pageNumber}
						onChange={onPage}
					/>
				) : null}
			</Stack>
		</ContentProvider>
	);
};
