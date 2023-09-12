/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { B2B } from '@/components/blocks/B2B';
import { Linkable } from '@/components/blocks/Linkable';
import { productDetailsAddToRequisitionListMenuItemSX } from '@/components/blocks/ProductDetails/styles/addToRequisitionListMenuItem';
import { productDetailsAddToRequisitionListTypographySX } from '@/components/blocks/ProductDetails/styles/addToRequisitionListTypography';
import { ADD_TO_LISTS_DISPLAY_TIMEOUT, TYPES } from '@/data/constants/product';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { isKitOrBundleType, productIsA } from '@/utils/productIsA';
import { AddCircleOutlined } from '@mui/icons-material';
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { kebabCase } from 'lodash';
import { FC, MouseEvent, useCallback, useContext, useMemo, useState } from 'react';

type Props = {
	standalone?: boolean;
};

export const ProductDetailsAddToRequisitionList: FC<Props> = ({ standalone = false }) => {
	const routes = useLocalization('Routes');
	const localization = useLocalization('productDetail');
	const {
		loginStatus,
		selection,
		product,
		requisitionLists,
		hasInventory,
		addToRequisitionList,
		isSkuListTableDisplayed,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails> &
		ReturnType<typeof useSkuListTable>;
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchor(event?.currentTarget);
	const onClose = () => setAnchor(null);
	const isKitOrBundle = isKitOrBundleType[product?.type as string];
	const isBundle = productIsA(product, TYPES.bundle);
	const sku = !isKitOrBundle ? selection?.sku : product;
	const buyable = !isKitOrBundle ? selection?.buyable : true;
	const { prices } = getProductDisplayInfo(sku, product);
	const otherDisabled = (!isBundle && !hasInventory) || !buyable || !prices?.offer;
	const disabledButton = isSkuListTableDisplayed ? product?.items?.length === 0 : otherDisabled;
	const [clickedId, setClickedId] = useState<string>();
	const dtId = useMemo(() => `reqlist-selection${standalone ? '-standalone' : ''}`, [standalone]);

	const onClick = useCallback(
		(listId: string) => async (_event: MouseEvent<HTMLElement>) => {
			setTimeout(onClose, ADD_TO_LISTS_DISPLAY_TIMEOUT);
			setClickedId(listId);
			await addToRequisitionList(listId)();
		},
		[addToRequisitionList]
	);

	return loginStatus ? (
		<B2B>
			<Button
				data-testid={dtId}
				id={dtId}
				variant="outlined"
				onClick={onOpen}
				disabled={disabledButton}
			>
				{localization.addToRL.t()}
			</Button>
			<Menu anchorEl={anchor} open={!!anchor} onClose={onClose}>
				<MenuItem sx={productDetailsAddToRequisitionListMenuItemSX} value="create">
					<Linkable href={routes.RequisitionLists.route.t()}>
						<Stack direction="row" alignItems="center" spacing={1}>
							<AddCircleOutlined fontSize="small" />
							<Typography sx={productDetailsAddToRequisitionListTypographySX}>
								{localization.createRL.t()}
							</Typography>
						</Stack>
					</Linkable>
				</MenuItem>
				{requisitionLists?.map(({ orderId = '', description }, i) => (
					<MenuItem
						key={i}
						data-testid={kebabCase(`add-to-reqlist-options-${description}-${i}-menu-item`)}
						id={kebabCase(`add-to-reqlist-options-${description}-${i}-menu-item`)}
						value={orderId}
						onClick={onClick(orderId)}
						sx={productDetailsAddToRequisitionListMenuItemSX}
						selected={orderId === clickedId}
					>
						<Typography sx={productDetailsAddToRequisitionListTypographySX}>
							{description}
						</Typography>
					</MenuItem>
				))}
			</Menu>
		</B2B>
	) : null;
};
