/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { B2B } from '@/components/blocks/B2B';
import { Linkable } from '@/components/blocks/Linkable';
import { productDetailsAddToWishListMenuItemSX } from '@/components/content/ProductDetails/styles/addToWishListMenuItem';
import { productDetailsAddToWishListTypographySX } from '@/components/content/ProductDetails/styles/addToWishListTypography';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useLocalization } from '@/data/Localization';
import { TYPES } from '@/data/constants/product';
import { ContentContext } from '@/data/context/content';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { productIsA } from '@/utils/productIsA';
import { AddCircleOutlined } from '@mui/icons-material';
import { Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { kebabCase } from 'lodash';
import { useContext, useState } from 'react';

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
export const ProductDetailsAddToWishList = () => {
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchor(event?.currentTarget);
	const onClose = () => setAnchor(null);

	const localization = useLocalization('productDetail');
	const routes = useLocalization('Routes');
	const { selection, loginStatus, wishLists, addToWishList, product } = useContext(
		ContentContext
	) as ReturnType<typeof useProductDetails>;
	const isBundle = productIsA(product, TYPES.bundle);
	const sku = !isBundle ? selection?.sku : product;
	const buyable = !isBundle ? selection?.buyable : true;
	const quantity = !isBundle ? selection?.quantity : 1;
	const { prices } = getProductDisplayInfo(sku, product);
	const disabled = !buyable || !prices?.offer;

	return loginStatus ? (
		<B2B is={false}>
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
						<Linkable
							href={routes.WishLists.route.t()}
							id={routes.WishLists.route.t()}
							data-testid={routes.WishLists.route.t()}
						>
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
		</B2B>
	) : null;
};
