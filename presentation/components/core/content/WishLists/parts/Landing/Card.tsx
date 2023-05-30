/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import React from 'react';
import { Card } from '@/components/blocks/Card';
import { Grid, Typography } from '@mui/material';
import { ContentContext } from '@/data/context/content';
import { useWishLists } from '@/data/Content/WishLists';
import { useLocalization } from '@/data/Localization';
import { wishListCardSX } from '@/components/content/WishLists/styles/landing/card';
import { wishListCardHeaderSX } from '@/components/content/WishLists/styles/landing/cardHeader';
import { MuiCardMedia } from '@/components/blocks/MuiCardMedia';

type Props = {
	wishList: ReturnType<typeof useWishLists>['wishLists'][0];
};
export const WishListCard: FC<Props> = ({ wishList }) => {
	const labels = useLocalization('WishList');
	const { getCardActions, productMap } = useContext(ContentContext) as ReturnType<
		typeof useWishLists
	>;
	const items = wishList.item?.slice(0, 3) ?? [];

	const cardMain = (
		<>
			<Typography variant="subtitle1" sx={wishListCardHeaderSX}>
				{wishList.description}
			</Typography>
			<Typography>
				{items.length ? labels.WishListItemsMessage.t() : labels.WishListEmptyMessage.t()}
			</Typography>
			{items.length ? (
				<Grid container spacing={1} justifyContent="flex-start" alignItems="flex-end" flex="1">
					{items.map((item) => (
						<Grid item key={item.partNumber}>
							<MuiCardMedia
								alt={productMap[item.partNumber]?.name}
								component="img"
								image={productMap[item.partNumber]?.thumbnail ?? ''}
								sx={{ width: '120px', height: '120px' }}
							/>
						</Grid>
					))}
				</Grid>
			) : null}
		</>
	);

	return (
		<Card
			testId={`wishlist-card-${wishList.description}`}
			cardMain={cardMain}
			extraSX={[wishListCardSX]}
			actions={getCardActions(wishList)}
			confirmLabel={labels.Confirm.t()}
			cancelLabel={labels.Cancel.t()}
		/>
	);
};
