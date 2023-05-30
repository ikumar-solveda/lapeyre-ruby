/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalization } from '@/data/Localization';
import { Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { kebabCase } from 'lodash';
import { AddCircleOutlined } from '@mui/icons-material';
import { Linkable } from '@/components/blocks/Linkable';
import { productDetailsAddToWishListMenuItemSX } from '@/components/content/ProductDetails/styles/addToWishListMenuItem';
import { productDetailsAddToWishListTypographySX } from '@/components/content/ProductDetails/styles/addToWishListTypography';
import { ContentContext } from '@/data/context/content';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';

export const ProductDetailsAddToWishList = () => {
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchor(event?.currentTarget);
	const onClose = () => setAnchor(null);

	const localization = useLocalization('productDetail');
	const routes = useLocalization('Routes');
	const {
		selection: { sku, quantity, buyable },
		loginStatus,
		wishLists,
		addToWishList,
		product,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	const { prices } = getProductDisplayInfo(sku, product);
	const disabled = !buyable || !prices?.offer;

	return loginStatus ? (
		<Box>
			<Button
				data-testid="wishlist-selection"
				id="wishlist-selection"
				variant="outlined"
				onClick={onOpen}
				disabled={disabled}
			>
				{localization.addToWL.t()}
			</Button>
			<Menu anchorEl={anchor} open={!!anchor} onClose={onClose}>
				<MenuItem sx={productDetailsAddToWishListMenuItemSX} value="create">
					<Linkable href={routes.WishLists.route.t()}>
						<Stack direction="row" alignItems="center" spacing={1}>
							<AddCircleOutlined fontSize="small" />
							<Typography sx={productDetailsAddToWishListTypographySX}>
								{localization.createWL.t()}
							</Typography>
						</Stack>
					</Linkable>
				</MenuItem>
				{wishLists?.map((wl, i) => (
					<MenuItem
						key={i}
						data-testid={kebabCase(`add-to-wishlist-options-${wl.description}-${i}-menu-item`)}
						id={kebabCase(`add-to-wishlist-options-${wl.description}-${i}-menu-item`)}
						value={wl.uniqueID}
						onClick={addToWishList(sku?.partNumber as string, quantity, wl)}
						sx={productDetailsAddToWishListMenuItemSX}
					>
						<Typography sx={productDetailsAddToWishListTypographySX}>{wl.description}</Typography>
					</MenuItem>
				))}
			</Menu>
		</Box>
	) : null;
};
