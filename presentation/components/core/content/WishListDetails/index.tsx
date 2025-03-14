/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { WishListDetailsEdit } from '@/components/content/WishListDetails/parts/Edit';
import { WishListDetailsMultiSelection } from '@/components/content/WishListDetails/parts/MultiSelection';
import { WishListDetailsProductCard } from '@/components/content/WishListDetails/parts/ProductCard';
import { wishListDetailsNameSX } from '@/components/content/WishListDetails/styles/name';
import { useWishListDetailsV2 } from '@/data/Content/WishListDetailsV2';
import { useLocalization } from '@/data/Localization';
import { WISHLIST_STATE } from '@/data/constants/wishlist';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import {
	Breadcrumbs,
	Button,
	CircularProgress,
	Divider,
	Grid,
	Pagination,
	Stack,
	Typography,
} from '@mui/material';
import { FC } from 'react';

export const WishListDetails: FC<{ id: ID }> = () => {
	const localization = useLocalization('WishList');
	const routes = useLocalization('Routes');

	const wlDetails = useWishListDetailsV2();
	const {
		onPage,
		pagination,
		totalPages,
		displayedItems,
		selectAll,
		selection,
		edit,
		onEdit,
		wishList,
		productMap,
	} = wlDetails;

	return (
		<ContentProvider value={wlDetails}>
			{!wishList ? (
				<CircularProgress />
			) : (
				<Stack spacing={1}>
					<Breadcrumbs aria-label={wishList?.description}>
						<Linkable
							href={routes.WishLists.route.t()}
							id={routes.WishLists.route.t()}
							data-testid={routes.WishLists.route.t()}
						>
							<Typography variant="pageTitle" component="h2">
								{localization.Title.t()}
							</Typography>
						</Linkable>
						<Typography variant="pageTitle" sx={wishListDetailsNameSX}>
							{wishList?.description}
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
									data-testid="view-wish-list-select-all"
									id="view-wish-list-select-all"
									variant="contained"
									onClick={selectAll}
								>
									{localization.Actions.SelectAll.t()}
								</Button>
							) : null}
							{wishList?.state !== WISHLIST_STATE.DEFAULT ? (
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
			)}
		</ContentProvider>
	);
};
