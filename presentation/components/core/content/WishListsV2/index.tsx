/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { WishListsV2Card } from '@/components/content/WishListsV2/parts/Card';
import { WishListsV2Create } from '@/components/content/WishListsV2/parts/Create';
import { useWishLists } from '@/data/Content/WishLists';
import { ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { Grid, Pagination, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const WishListsV2: FC<{ id: ID }> = () => {
	const localization = useLocalization('WishList');
	const payload = useWishLists();
	const { pagination, wishLists, totalPages, onPage } = payload;

	return (
		<ContentProvider value={payload}>
			<Stack spacing={1}>
				<Typography variant="h4">{localization.Title.t()}</Typography>
				<WishListsV2Create />
				{totalPages > 0 ? (
					<Stack>
						<Grid container spacing={2} alignItems="stretch">
							{wishLists.map((wishList) => (
								<Grid item xs={12} sm={6} key={wishList.uniqueID}>
									<WishListsV2Card wishList={wishList} />
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
		</ContentProvider>
	);
};
