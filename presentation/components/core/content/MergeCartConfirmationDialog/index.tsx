/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { mergeCartConfirmationDialogActionsSX } from '@/components/content/MergeCartConfirmationDialog/styles/actions';
import { mergeCartConfirmationDialogActionsButtonSX } from '@/components/content/MergeCartConfirmationDialog/styles/actionsButton';
import { mergeCartConfirmationDialogContentSX } from '@/components/content/MergeCartConfirmationDialog/styles/content';
import { mergeCartConfirmationDialogSX } from '@/components/content/MergeCartConfirmationDialog/styles/dialog';
import { OrderItemTableV2 } from '@/components/content/OrderItemTableV2';
import { useMergeCart } from '@/data/Content/MergeCart';
import { useLocalization } from '@/data/Localization';
import { Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const MergeCartConfirmationDialog = () => {
	const nls = useLocalization('MergeCartDialog');
	const { data, dialogOpen, onConfirm } = useMergeCart();
	const count = data.length;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<Dialog
			disableEscapeKeyDown
			maxWidth="lg"
			fullWidth
			fullScreen={isMobile}
			open={dialogOpen}
			sx={mergeCartConfirmationDialogSX}
		>
			<DialogTitle>{nls.Title.t({ count })}</DialogTitle>
			<DialogContent dividers sx={mergeCartConfirmationDialogContentSX}>
				<OrderItemTableV2 data={data} id={`merge-cart-confirmation-order-item-table`} />
			</DialogContent>
			<DialogActions sx={mergeCartConfirmationDialogActionsSX}>
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
			</DialogActions>
		</Dialog>
	);
};
