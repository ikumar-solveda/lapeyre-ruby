/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024, 2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { mergeCartConfirmationDialogActionsButtonSX } from '@/components/content/MergeCartConfirmationDialog/styles/actionsButton';
import { OrderItemTableV2 } from '@/components/content/OrderItemTableV2';
import { useMergeCart } from '@/data/Content/MergeCart';
import { useLocalization } from '@/data/Localization';
import type { DialogProps } from '@mui/material';

const props = { maxWidth: 'lg' } as DialogProps;

export const MergeCartConfirmationDialog = () => {
	const nls = useLocalization('MergeCartDialog');
	const { data, dialogOpen, onConfirm } = useMergeCart();
	const count = data.length;

	return (
		<Dialog
			open={dialogOpen}
			title={nls.Title.t({ count })}
			content={<OrderItemTableV2 data={data} id="merge-cart-confirmation-order-item-table" />}
			actions={
				<OneClick
					onClick={onConfirm}
					spin={true}
					spinSize={24}
					variant="contained"
					data-testid="merge-cart-confirmation-submit"
					id="session-error-confirmation"
					sx={mergeCartConfirmationDialogActionsButtonSX}
				>
					{nls.confirmButton.t()}
				</OneClick>
			}
			props={props}
		/>
	);
};
