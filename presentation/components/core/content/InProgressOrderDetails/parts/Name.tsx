/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { InProgressOrderDetailsEditMenu } from '@/components/content/InProgressOrderDetails/parts/EditMenu';
import { inProgressOrderDetailsNameEditSX } from '@/components/content/InProgressOrderDetails/styles/Name/edit';
import { inProgressOrderDetailsNameLinkableSX } from '@/components/content/InProgressOrderDetails/styles/Name/linkable';
import { inProgressOrderDetailsNameStack } from '@/components/content/InProgressOrderDetails/styles/Name/stack';
import { inProgressOrderDetailsNameTypographySX } from '@/components/content/InProgressOrderDetails/styles/Name/typography';
import { DIALOG_STATES } from '@/data/constants/inProgressOrders';
import type { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Button, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { type FC, useContext } from 'react';

export const InProgressOrderDetailsName: FC = () => {
	const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
	const { data, onDialog, cartData, isBuyerMismatch } = useContext(ContentContext) as ReturnType<
		typeof useInProgressOrderDetails
	>;
	const nls = useLocalization('InProgressOrderDetails');
	const { InProgressOrders } = useLocalization('Routes');
	const isCurrentCart = data && cartData.data?.orderId === data.orderId;

	return (
		<Stack {...inProgressOrderDetailsNameStack}>
			<Stack direction="row" alignItems="center" spacing={1}>
				{isMobile ? null : (
					<Linkable
						sx={inProgressOrderDetailsNameLinkableSX}
						href={InProgressOrders.route.t()}
						id={data?.orderId}
						data-testid={data?.orderId}
						aria-label={data?.orderDescription}
					>
						<IconButton color="primary">
							<ArrowBackIosNew />
						</IconButton>
					</Linkable>
				)}
				<Stack>
					{data?.orderDescription ? (
						<Typography variant="pageTitle" sx={inProgressOrderDetailsNameTypographySX}>
							{data.orderDescription}
						</Typography>
					) : null}
					{isCurrentCart ? (
						<Typography sx={inProgressOrderDetailsNameTypographySX}>
							{nls.CurrentCart.t()}
						</Typography>
					) : null}
				</Stack>
			</Stack>

			{isMobile ? (
				<InProgressOrderDetailsEditMenu />
			) : (
				<Button
					onClick={onDialog(DIALOG_STATES.EDIT)}
					variant="contained"
					id="in-progress-order-edit-name-button"
					data-testid="in-progress-order-edit-name-button"
					sx={inProgressOrderDetailsNameEditSX}
					disabled={isBuyerMismatch}
				>
					{nls.editOrderName.t()}
				</Button>
			)}
		</Stack>
	);
};
