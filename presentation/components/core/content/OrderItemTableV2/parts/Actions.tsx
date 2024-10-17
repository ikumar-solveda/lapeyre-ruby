/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IfTrue } from '@/components/blocks/IfTrue';
import { OneClick } from '@/components/blocks/OneClick';
import { orderItemTableV2IconColorSX } from '@/components/content/OrderItemTableV2/styles/iconColor';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTableRow';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { ContentContext } from '@/data/context/content';
import { EventsContext } from '@/data/context/events';
import { OrderTableData } from '@/data/types/OrderItemTableV2';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FC, MouseEvent, useCallback, useContext } from 'react';

type Props = {
	row: OrderTableData;
};

export const OrderItemTableV2Actions: FC<Props> = ({ row }) => {
	const { details } = useContext(ContentContext) as ReturnType<typeof useOrderItemTableRow>;
	const {
		quantity: { onChange, quantity, min = 1 },
		price,
		freeGift,
	} = row;
	const localization = useLocalization('OrderItemTable');
	const { onRemoveFromCart } = useContext(EventsContext);
	const { settings } = useSettings();

	const removeFromCart = useCallback(
		async (event: MouseEvent<HTMLElement>) => {
			event.preventDefault();
			event.stopPropagation();
			await onChange(0);
			if (min > 0) {
				// if not satisfied the condition, meaning the item can be set to 0 for deletion later.
				onRemoveFromCart({
					gtm: {
						partNumber: details.partNumber,
						name: details.name,
						price: `${price.orderItemPrice}`,
						currency: price.currency,
						quantity: `${quantity}`,
						seller: details?.seller,
						sellerId: details?.sellerId,
						orgName: '', // TODO: specify selected org-name
						orgId: '', // TODO: specify selected org
						storeName: settings.storeName,
						settings,
					},
				});
			}
		},
		[details, onChange, onRemoveFromCart, price, quantity, settings, min]
	);

	return (
		<IfTrue condition={!freeGift}>
			<OneClick wrapper="icon" onClick={removeFromCart} spin={true} spinSize={24}>
				<DeleteOutlineIcon
					sx={orderItemTableV2IconColorSX}
					titleAccess={localization.Labels.RemoveFromCart.t()}
				/>
			</OneClick>
		</IfTrue>
	);
};
