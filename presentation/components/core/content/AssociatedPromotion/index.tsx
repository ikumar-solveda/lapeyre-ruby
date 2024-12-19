/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { associatedPromotionPaperSX } from '@/components/content/AssociatedPromotion/styles/paper';
import { associatedPromotionStack } from '@/components/content/AssociatedPromotion/styles/stack';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useAssociatedPromotion } from '@/data/Content/AssociatedPromotion';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { parseHTML } from '@/utils/parseHTML';
import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { type FC, useCallback } from 'react';

export const AssociatedPromotion: FC<{ id: ID }> = () => {
	const couponsTableNLS = useLocalization('Coupons');
	const routes = useLocalization('Routes');
	const { longDescription, shortDescription, isInvalidAssociatedPromotions, hasNoDescription } =
		useAssociatedPromotion();
	const router = useNextRouter();
	const handleClose = useCallback(async () => {
		router.push({
			pathname: routes.Coupons.route.t(),
		});
	}, [router, routes]);
	return (
		<Paper sx={associatedPromotionPaperSX}>
			<Stack spacing={2}>
				<Typography variant="subtitle1">{couponsTableNLS.Labels.CouponDetails.t()}</Typography>
				<Divider />
				{shortDescription || longDescription ? (
					<>
						<Typography variant="subtitle1">{shortDescription}</Typography>
						{parseHTML(longDescription)}
					</>
				) : null}
				{isInvalidAssociatedPromotions ? (
					<Typography> {couponsTableNLS.Labels.InvalidCouponDetails.t()}</Typography>
				) : null}
				{hasNoDescription ? (
					<Typography> {couponsTableNLS.Labels.NoDescriptionDetails.t()}</Typography>
				) : null}
				<Divider />
				<Stack {...associatedPromotionStack}>
					<Button
						variant="contained"
						id="coupon-description-close-dialog"
						data-testid="coupon-description-close-dialog"
						onClick={handleClose}
					>
						{couponsTableNLS.Labels.Back.t()}
					</Button>
				</Stack>
			</Stack>
		</Paper>
	);
};
