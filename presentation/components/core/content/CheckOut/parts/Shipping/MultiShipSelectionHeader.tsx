/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CheckOutChevronRightBox } from '@/components/content/CheckOut/parts/ChevronRightBox';
import { CheckOutSwitch } from '@/components/content/CheckOut/parts/Switch';
import { CheckOutTitle } from '@/components/content/CheckOut/parts/Title';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useProduct } from '@/data/Content/Product';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { OrderItem } from '@/data/types/Order';
import { Grid, Typography } from '@mui/material';
import { FC, useCallback, useContext, useMemo } from 'react';

const EMPTY_ORDER_ITEMS: OrderItem[] = [];

const ProductName: FC<{ partNumber: string; contractId?: string }> = ({
	partNumber,
	contractId,
}) => {
	const { product } = useProduct({ id: partNumber, contractId });
	const name = useMemo(() => product?.name ?? '', [product]);
	return <>{name}</>;
};
/** @deprecated */
export const ShippingMultiShipmentSelectionHeader: FC = () => {
	const {
		selectedItems,
		orderItems = EMPTY_ORDER_ITEMS,
		editableAddress,
		setSelectedItems,
		multiOnly,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOut> & ReturnType<typeof useShipping>;
	const shippingNLS = useLocalization('Shipping');
	const switchToSingleShipping = () => setSelectedItems([...orderItems]);
	const onClick = useCallback(() => {
		setSelectedItems(EMPTY_ORDER_ITEMS);
	}, [setSelectedItems]);
	return editableAddress === null && selectedItems && selectedItems.length < orderItems.length ? (
		<>
			<Grid item>
				<CheckOutTitle
					title={shippingNLS.Title.t()}
					{...(selectedItems.length > 0 && { onClick })}
				/>
			</Grid>
			{selectedItems.length === 0 ? (
				<Grid item>
					<CheckOutSwitch
						checked={selectedItems.length < orderItems.length}
						onChange={switchToSingleShipping}
						label={shippingNLS.Labels.UseMultiple.t()}
						disabled={multiOnly}
					/>
				</Grid>
			) : (
				<>
					<Grid item>
						<CheckOutChevronRightBox />
					</Grid>
					<Grid item>
						<Typography variant="h4" component="p">
							{selectedItems.length > 1 ? (
								shippingNLS.Labels.SelectedCount.t({
									selected: selectedItems.length,
									all: orderItems.length,
								})
							) : (
								<ProductName
									partNumber={selectedItems[0].partNumber}
									contractId={selectedItems[0].contractId}
								/>
							)}
						</Typography>
					</Grid>
				</>
			)}
		</>
	) : null;
};
