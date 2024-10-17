/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { B2B } from '@/components/blocks/B2B';
import { IconLabel } from '@/components/blocks/IconLabel';
import { PurchaseOrderNumberReadonly } from '@/components/blocks/PurchaseOrderNumber/parts/Readonly';
import { purchaseOrderNumberInputSX } from '@/components/blocks/PurchaseOrderNumber/styles/input';
import { useCheckOut } from '@/data/Content/CheckOut';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Order } from '@/data/types/Order';
import DescriptionIcon from '@mui/icons-material/Description';
import { Stack, TextField, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

const EMPTY_CART = {} as Order;

/**
 * Purchase Order Number component: Displays PO number input or text display
 */
export const PurchaseOrderNumber: FC<{ readOnly?: boolean }> = ({ readOnly = false }) => {
	const { Title, Msgs } = useLocalization('PurchaseOrderNumber');
	const {
		data = EMPTY_CART, // from checkout flow
		order, // from order-details (order-history or checkout-review)
		onPOChange,
		poContext,
		poRequired,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOut> & { order?: Order };
	const buyerPONumber = useMemo(
		() => (order ?? data)?.buyerPONumber || poContext?.value,
		[data, order, poContext]
	);

	return (
		<B2B>
			{readOnly ? (
				<PurchaseOrderNumberReadonly poNumber={buyerPONumber} />
			) : poRequired ? (
				<Stack spacing={2}>
					<IconLabel
						icon={<DescriptionIcon />}
						label={<Typography variant="h5">{Title.t()}</Typography>}
					/>
					<TextField
						name="purchaseorder_id"
						type="text"
						size="small"
						value={poContext.value}
						onChange={onPOChange()}
						error={!!(poContext.error && poContext.dirty)}
						helperText={!!(poContext.error && poContext.dirty) ? Msgs.PONumberRequired.t() : ''}
						inputProps={{ maxLength: 172 }}
						sx={purchaseOrderNumberInputSX}
						required
					/>
				</Stack>
			) : null}
		</B2B>
	);
};
