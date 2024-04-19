/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { B2B } from '@/components/blocks/B2B';
import { Linkable } from '@/components/blocks/Linkable';
import { productDetailsAddToWishListButtonSX } from '@/components/blocks/ProductDetails/styles/addToWishListButton';
import { productDetailsAddToWishListMenuButtonSX } from '@/components/blocks/ProductDetails/styles/addToWishListMenuButton';
import { productDetailsAddToWishListMenuItemSX } from '@/components/blocks/ProductDetails/styles/addToWishListMenuItem';
import { productDetailsAddToWishListTypographySX } from '@/components/blocks/ProductDetails/styles/addToWishListTypography';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { useLocalization } from '@/data/Localization';
import { ADD_TO_LISTS_DISPLAY_TIMEOUT, TYPES } from '@/data/constants/product';
import { ContentContext } from '@/data/context/content';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { productIsA } from '@/utils/productIsA';
import { AddCircleOutlined } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Button,
	ButtonGroup,
	Menu,
	MenuItem,
	PopoverOrigin,
	Stack,
	Typography,
} from '@mui/material';
import { kebabCase } from 'lodash';
import { FC, MouseEvent, useCallback, useContext, useMemo, useState } from 'react';

const WISHLIST_MENU: Record<string, PopoverOrigin> = {
	anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
	transformOrigin: { vertical: 'top', horizontal: 'right' },
};

type Props = {
	standalone?: boolean;
};

export const ProductDetailsAddToWishList: FC<Props> = ({ standalone = false }) => {
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchor(event?.currentTarget);
	const onClose = () => setAnchor(null);

	const localization = useLocalization('productDetail');
	const routes = useLocalization('Routes');
	const { selection, loginStatus, wishLists, addToWishList, product, addToDefaultWishlist } =
		useContext(ContentContext) as ReturnType<typeof useProductDetails> &
			ReturnType<typeof useSkuListTable>;
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
			<ButtonGroup variant="outlined">
				<Button
					data-testid={`${dtId}-default`}
					id={`${dtId}-default`}
					disabled={disabled}
					onClick={addToDefaultWishlist(sku?.partNumber ?? '', quantity)}
					sx={productDetailsAddToWishListButtonSX}
				>
					{localization.addToWL.t()}
				</Button>
				<Button
					data-testid={dtId}
					id={dtId}
					onClick={onOpen}
					sx={productDetailsAddToWishListMenuButtonSX}
				>
					<ExpandMoreIcon />
				</Button>
			</ButtonGroup>
			<Menu
				anchorEl={anchor}
				open={!!anchor}
				onClose={onClose}
				anchorOrigin={WISHLIST_MENU.anchorOrigin}
				transformOrigin={WISHLIST_MENU.transformOrigin}
			>
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
