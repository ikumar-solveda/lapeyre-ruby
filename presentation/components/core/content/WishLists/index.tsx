/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { WishListDetails } from '@/components/content/WishLists/parts/Details';
import { WishListCard } from '@/components/content/WishLists/parts/Landing/Card';
import { WishListCreate } from '@/components/content/WishLists/parts/Landing/Create';
import { useWishLists } from '@/data/Content/WishLists';
import { ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { Grid, Pagination, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const WishLists: FC<{ id: ID }> = () => {
	const localization = useLocalization('WishList');
	const payload = useWishLists();
	const { pagination, wishLists, totalPages, onPage, id, wishListMap } = payload;
	return (
		<ContentProvider value={{ ...payload }}>
			{id && wishListMap[id as string] ? (
				<WishListDetails wishList={wishListMap[id as string]} />
			) : (
				<Stack spacing={1}>
					<Typography variant="h3">{localization.Title.t()}</Typography>
					<WishListCreate />
					{totalPages > 0 ? (
						<Stack>
							<Grid container spacing={2} alignItems="stretch">
								{wishLists.map((wishList) => (
									<Grid item xs={12} sm={6} key={wishList.uniqueID}>
										<WishListCard wishList={wishList} />
									</Grid>
								))}
							</Grid>
						</Stack>
					) : (
						<Typography variant="body2">{localization.NoWishListMessage.t()}</Typography>
					)}
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
