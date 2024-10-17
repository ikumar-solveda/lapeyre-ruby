/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CheckOutV2ChevronRightBox } from '@/components/content/CheckOutV2/parts/ChevronRightBox';
import { CheckOutV2Switch } from '@/components/content/CheckOutV2/parts/Switch';
import { CheckOutV2Title } from '@/components/content/CheckOutV2/parts/Title';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
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
export const CheckOutV2ShippingMultiShipmentSelectionHeader: FC = () => {
	const {
		selectedItems,
		deliveryOrderItems = EMPTY_ORDER_ITEMS,
		editableAddress,
		setSelectedItems,
		multiOnly,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof useShipping>;
	const shippingNLS = useLocalization('Shipping');
	const switchToSingleShipping = () => setSelectedItems([...deliveryOrderItems]);
	const onClick = useCallback(() => {
		setSelectedItems(EMPTY_ORDER_ITEMS);
	}, [setSelectedItems]);
	return editableAddress === null &&
		selectedItems &&
		selectedItems.length < deliveryOrderItems.length ? (
		<>
			<Grid item>
				<CheckOutV2Title
					title={shippingNLS.Title.t()}
					{...(selectedItems.length > 0 && { onClick })}
				/>
			</Grid>
			{selectedItems.length === 0 ? (
				<Grid item>
					<CheckOutV2Switch
						checked={selectedItems.length < deliveryOrderItems.length}
						onChange={switchToSingleShipping}
						label={shippingNLS.Labels.UseMultiple.t()}
						disabled={multiOnly}
					/>
				</Grid>
			) : (
				<>
					<Grid item>
						<CheckOutV2ChevronRightBox />
					</Grid>
					<Grid item>
						<Typography variant="h4" component="p">
							{selectedItems.length > 1 ? (
								shippingNLS.Labels.SelectedCount.t({
									selected: selectedItems.length,
									all: deliveryOrderItems.length,
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
