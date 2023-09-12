/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React, { FC, useContext, useMemo } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { useLocalization } from '@/data/Localization';
import { IconLabel } from '@/components/blocks/IconLabel';
import { Typography, TextField, Stack } from '@mui/material';
import { ContentContext } from '@/data/context/content';
import { useCheckOut } from '@/data/Content/CheckOut';
import { Order } from '@/data/types/Order';
import { B2B } from '@/components/blocks/B2B';
import { purchaseOrderNumberReadOnlySX } from '@/components/blocks/PurchaseOrderNumber/styles/readOnly';
import { purchaseOrderNumberInputSX } from '@/components/blocks/PurchaseOrderNumber/styles/input';

const EMPTY_CART = {} as Order;

/**
 * Purchase Order Number component: Displays PO number input or text display
 */
export const PurchaseOrderNumber: FC<{ readOnly?: boolean }> = ({ readOnly = false }) => {
	const { Title, Labels, Msgs } = useLocalization('PurchaseOrderNumber');
	const {
		data = EMPTY_CART, // from checkout flow
		order, // from order-details (order-history or checkout-review)
		onPOChange,
		poContext,
		poRequired,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOut> & { order?: Order };
	const buyerPONumber = useMemo(() => (order ?? data)?.buyerPONumber, [data, order]);

	return (
		<B2B>
			{readOnly ? (
				<>
					{buyerPONumber || poContext?.value ? (
						<Stack sx={purchaseOrderNumberReadOnlySX}>
							<IconLabel
								icon={<DescriptionIcon />}
								label={Labels.display.t({ poNumber: buyerPONumber || poContext?.value })}
							/>
						</Stack>
					) : null}
				</>
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
