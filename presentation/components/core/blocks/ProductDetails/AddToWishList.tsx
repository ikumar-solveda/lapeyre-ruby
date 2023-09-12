/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { B2B } from '@/components/blocks/B2B';
import { Linkable } from '@/components/blocks/Linkable';
import { productDetailsAddToWishListMenuItemSX } from '@/components/blocks/ProductDetails/styles/addToWishListMenuItem';
import { productDetailsAddToWishListTypographySX } from '@/components/blocks/ProductDetails/styles/addToWishListTypography';
import { ADD_TO_LISTS_DISPLAY_TIMEOUT, TYPES } from '@/data/constants/product';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { productIsA } from '@/utils/productIsA';
import { AddCircleOutlined } from '@mui/icons-material';
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { kebabCase } from 'lodash';
import { FC, MouseEvent, useCallback, useContext, useMemo, useState } from 'react';

type Props = {
	standalone?: boolean;
};

export const ProductDetailsAddToWishList: FC<Props> = ({ standalone = false }) => {
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchor(event?.currentTarget);
	const onClose = () => setAnchor(null);

	const localization = useLocalization('productDetail');
	const routes = useLocalization('Routes');
	const { selection, loginStatus, wishLists, addToWishList, product } = useContext(
		ContentContext
	) as ReturnType<typeof useProductDetails> & ReturnType<typeof useSkuListTable>;
	const isBundle = productIsA(product, TYPES.bundle);
	const sku = !isBundle ? selection?.sku : product;
	const buyable = !isBundle ? selection?.buyable : true;
	const quantity = !isBundle ? selection?.quantity : 1;
	const { prices } = getProductDisplayInfo(sku, product);
	const disabled = !buyable || !prices?.offer;
	const [clickedId, setClickedId] = useState<string>();
	const dtId = useMemo(() => `wishlist-selection${standalone ? '-standalone' : ''}`, [standalone]);

	const onClick = useCallback(
		(partNumber = '', quantity: number, list: NonNullable<typeof wishLists>[number]) =>
			async (_event: MouseEvent<HTMLElement>) => {
				setTimeout(onClose, ADD_TO_LISTS_DISPLAY_TIMEOUT);
				setClickedId(list.uniqueID);
				await addToWishList(partNumber, quantity, list)();
			},
		[addToWishList]
	);

	return loginStatus ? (
		<B2B is={false}>
			<Button data-testid={dtId} id={dtId} variant="outlined" onClick={onOpen} disabled={disabled}>
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
						onClick={onClick(sku?.partNumber, quantity, wl)}
						sx={productDetailsAddToWishListMenuItemSX}
						selected={clickedId === wl.uniqueID}
					>
						<Typography sx={productDetailsAddToWishListTypographySX}>{wl.description}</Typography>
					</MenuItem>
				))}
			</Menu>
		</B2B>
	) : null;
};
