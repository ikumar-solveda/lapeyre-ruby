/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext, MouseEvent, useMemo, useState, useCallback } from 'react';
import { Stack, Link, Typography, CircularProgress } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ContentContext } from '@/data/context/content';
import { debounce } from 'lodash';
import { useLocalization } from '@/data/Localization';
import { NumberInput } from '@/components/blocks/NumberInput';
import { OrderItemTableRowData } from '@/components/content/OrderItemTable/parts/Table';
import { orderItemTableQuantitySX } from '@/components/content/OrderItemTable/styles/orderItemTableQuantity';
import { productDetailsQuantitySX } from '@/components/content/ProductDetails/styles/quantity';

export const OrderItemQuantity: FC<{ readOnly?: boolean }> = ({ readOnly }) => {
	const orderItemTableNLS = useLocalization('OrderItemTable');
	const {
		quantity: { quantity, onChange },
	} = useContext(ContentContext) as OrderItemTableRowData;
	const [clicked, setClicked] = useState<boolean>(false);

	const removeFromCart = (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setClicked(true);
		onChange(0).then(() => {
			setClicked(false);
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
				<Typography variant="body1">{quantity}</Typography>
			) : (
				<>
					<NumberInput
						onChange={debouncedQuantityChange}
						value={quantity}
						min={1}
						sx={productDetailsQuantitySX}
						disabled={readOnly}
						showControls
					/>
					{clicked ? (
						<CircularProgress />
					) : (
						<Link component="button" onClick={removeFromCart}>
							<DeleteOutlineIcon
								color="text"
								titleAccess={orderItemTableNLS.Labels.RemoveFromCart.t()}
							/>
						</Link>
					)}
				</>
			)}
		</Stack>
	);
};
