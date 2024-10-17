/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { NumberInput } from '@/components/blocks/NumberInput';
import { OneClick } from '@/components/blocks/OneClick';
import { OrderItemTableRowData } from '@/components/content/OrderItemTable/parts/Table';
import { orderItemTableQuantitySX } from '@/components/content/OrderItemTable/styles/orderItemTableQuantity';
import { productDetailsQuantitySX } from '@/components/blocks/ProductDetails/styles/quantity';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { ContentContext } from '@/data/context/content';
import { EventsContext } from '@/data/context/events';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Stack, Typography } from '@mui/material';
import { debounce } from 'lodash';
import { FC, MouseEvent, useCallback, useContext, useMemo } from 'react';

export const OrderItemQuantity: FC<{ readOnly?: boolean; mini?: boolean }> = ({
	readOnly,
	mini = false,
}) => {
	const orderItemTableNLS = useLocalization('OrderItemTable');
	const localization = useLocalization('productDetail');
	const {
		quantity: { quantity, onChange },
		price,
		details,
	} = useContext(ContentContext) as OrderItemTableRowData & ReturnType<typeof useOrderItemTableRow>;
	const { onRemoveFromCart } = useContext(EventsContext);
	const { settings } = useSettings();

	const removeFromCart = async (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		event.stopPropagation();
		await onChange(0);

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
	};

	const quantityChange = useCallback(
		(updatedQuantity: number | null) => {
			if (updatedQuantity !== null && updatedQuantity > 0 && updatedQuantity !== quantity) {
				onChange(updatedQuantity);
			}
		},
		[onChange, quantity]
	);

	const debouncedQuantityChange = useMemo(
		() => debounce((updatedQuantity) => quantityChange(updatedQuantity), 500),
		[quantityChange]
	);

	return (
		<Stack alignItems="center" spacing={1} direction="row" sx={orderItemTableQuantitySX}>
			{readOnly ? (
				mini ? (
					<LocalizationWithComponent
						text={localization.QuantityValue.t({ quantity })}
						components={[<Typography key="0" variant="body2" />, <Typography key="1" />]}
					/>
				) : (
					<Typography>{quantity}</Typography>
				)
			) : (
				<>
					<NumberInput
						onChange={debouncedQuantityChange}
						value={quantity}
						min={1}
						sx={productDetailsQuantitySX}
						disabled={readOnly}
						showControls
						disallowEmptyOnBlur={true}
						data-testid="order-item-quantity"
						id="order-item-quantity"
						isControlled={true}
					/>

					<OneClick wrapper="icon" onClick={removeFromCart} spin={true} spinSize={24}>
						<DeleteOutlineIcon
							color="text"
							titleAccess={orderItemTableNLS.Labels.RemoveFromCart.t()}
						/>
					</OneClick>
				</>
			)}
		</Stack>
	);
};
