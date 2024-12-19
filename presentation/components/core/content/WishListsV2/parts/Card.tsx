/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Card } from '@/components/blocks/Card';
import { MuiCardMedia } from '@/components/blocks/MuiCardMedia';
import { wishListDetailsProductCardSizeSX } from '@/components/content/WishListDetails/styles/productCardSize';
import { wishListsV2CardSX } from '@/components/content/WishListsV2/styles/card';
import { wishListsV2CardHeaderSX } from '@/components/content/WishListsV2/styles/cardHeader';
import { useWishLists } from '@/data/Content/WishLists';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ProductType } from '@/data/types/Product';
import { Grid, Typography } from '@mui/material';
import { Dictionary } from 'lodash';
import { FC, useContext, useMemo } from 'react';

type WishListCardMainProps = {
	wishListDesc: string | undefined;
	items: ReturnType<typeof useWishLists>['wishLists'][0]['item'];
	productMap: Dictionary<ProductType>;
	messages: { itemMessage: string; emptyMessage: string };
};

const WishListCardMain: FC<WishListCardMainProps> = ({
	wishListDesc,
	items,
	productMap,
	messages,
}) => (
	<>
		<Typography variant="subtitle1" sx={wishListsV2CardHeaderSX}>
			{wishListDesc}
		</Typography>
		<Typography>{items?.length ? messages.itemMessage : messages.emptyMessage}</Typography>
		{items?.length ? (
			<Grid container spacing={1} justifyContent="flex-start" alignItems="flex-end" flex="1">
				{items.map((item) => (
					<Grid item key={item.partNumber}>
						<MuiCardMedia
							alt={productMap[item.partNumber]?.name}
							component="img"
							image={productMap[item.partNumber]?.thumbnail ?? ''}
							sx={wishListDetailsProductCardSizeSX}
						/>
					</Grid>
				))}
			</Grid>
		) : null}
	</>
);

type Props = {
	wishList: ReturnType<typeof useWishLists>['wishLists'][0];
};
export const WishListsV2Card: FC<Props> = ({ wishList }) => {
	const labels = useLocalization('WishList');

	const wishListDesc = useMemo(() => wishList.description, [wishList]);
	const { getCardActionsV2, productMap } = useContext(ContentContext) as ReturnType<
		typeof useWishLists
	>;
	const items = useMemo(() => wishList.item?.slice(0, 3) ?? [], [wishList]);
	const itemMessage = useMemo(() => labels.WishListItemsMessage.t(), [labels]);
	const emptyMessage = useMemo(() => labels.WishListEmptyMessage.t(), [labels]);

	return (
		<Card
			testId={`wish-list-card-${wishList.description}`}
			cardMain={
				<WishListCardMain
					wishListDesc={wishListDesc}
					items={items}
					productMap={productMap}
					messages={{ itemMessage, emptyMessage }}
				/>
			}
			extraSX={[wishListsV2CardSX]}
			actions={getCardActionsV2(wishList)}
			confirmLabel={labels.Confirm.t()}
			cancelLabel={labels.Cancel.t()}
		/>
	);
};
