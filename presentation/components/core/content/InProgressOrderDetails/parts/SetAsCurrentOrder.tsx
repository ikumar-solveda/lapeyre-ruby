/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { ResponsiveActionsMenu } from '@/components/blocks/ResponsiveActionsMenu';
import { inProgressOrderDetailsBrowseAndAddProductButtonSX } from '@/components/content/InProgressOrderDetails/styles/BrowseAndAddProduct/button';
import { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { type FC, MouseEvent, useCallback, useContext, useState } from 'react';

const IDS = {
	MENU_ID: 'in-progress-order-set-cart-checkout',
	BUTTON_ID: 'in-progress-order-set-as-current-cart',
};
export const InProgressOrderDetailsSetAsCurrentOrder: FC = () => {
	const InProgressOrderDetailsNLS = useLocalization('InProgressOrderDetails');
	const { activeOrderId, data, setAsCurrentCart, isBuyerMismatch } = useContext(
		ContentContext
	) as ReturnType<typeof useInProgressOrderDetails>;
	const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const onOpen = useCallback((e: MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget), []);
	const onClose = useCallback(() => setAnchor(null), []);
	const onClick = useCallback(
		(_e: MouseEvent<HTMLLIElement>) => {
			setAsCurrentCart(_e);
			onClose();
		},
		[onClose, setAsCurrentCart]
	);

	return isMobile ? (
		<ResponsiveActionsMenu
			anchor={anchor}
			onClose={onClose}
			onOpen={onOpen}
			id={IDS.MENU_ID}
			label={InProgressOrderDetailsNLS.SetAsCurrentCartAndCheckout.t()}
		>
			<MenuItem
				onClick={onClick}
				disabled={isBuyerMismatch || activeOrderId === data?.orderId || !data?.orderItem?.length}
			>
				{InProgressOrderDetailsNLS.SetAsCurrentCartAndCheckout.t()}
			</MenuItem>
		</ResponsiveActionsMenu>
	) : (
		<OneClick
			data-testid={IDS.BUTTON_ID}
			id={IDS.BUTTON_ID}
			variant="contained"
			overlay
			onClick={setAsCurrentCart}
			sx={inProgressOrderDetailsBrowseAndAddProductButtonSX}
			disabled={isBuyerMismatch || activeOrderId === data?.orderId || !data?.orderItem?.length}
		>
			{InProgressOrderDetailsNLS.SetAsCurrentCartAndCheckout.t()}
		</OneClick>
	);
};
