/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { orderAvailableCouponsStackSX } from '@/components/blocks/OrderAvailableCoupons/styles/stack';
import { orderAvailableCouponsTypographySX } from '@/components/blocks/OrderAvailableCoupons/styles/typography';
import { useLocalization } from '@/data/Localization';
import { dAdd } from '@/data/Settings';
import { MAX_DISPLAYED_COUPONS } from '@/data/constants/order';
import { ContentContext } from '@/data/context/content';
import { CartAppliedCoupon, OrderAvailableCouponsContextValues } from '@/data/types/Order';
import { parseHTML } from '@/utils/parseHTML';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Stack, Typography } from '@mui/material';
import { FC, useCallback, useContext, useMemo, useState } from 'react';

const EMPTY_APPLIED_COUPONS: CartAppliedCoupon[] = [];
export const OrderAvailableCoupons: FC = () => {
	const cartNLS = useLocalization('Cart');
	const { activeIssuedCoupons, activeAppliedCoupons, onAssignedCouponRemoved, onCouponApply } =
		useContext(ContentContext) as OrderAvailableCouponsContextValues;

	const [showMore, setShowMore] = useState<boolean>(true);

	const { displayedIssuedCoupons, displayedAssignedCoupons, showMoreOrLessButton } = useMemo(() => {
		const displayedIssuedCoupons =
			activeIssuedCoupons.length > MAX_DISPLAYED_COUPONS
				? showMore
					? activeIssuedCoupons.slice(0, MAX_DISPLAYED_COUPONS)
					: activeIssuedCoupons
				: activeIssuedCoupons;

		const displayedAssignedCoupons =
			activeIssuedCoupons.length >= MAX_DISPLAYED_COUPONS
				? showMore
					? EMPTY_APPLIED_COUPONS
					: activeAppliedCoupons
				: showMore
				? activeAppliedCoupons.slice(0, MAX_DISPLAYED_COUPONS - activeIssuedCoupons.length)
				: activeAppliedCoupons;

		const showMoreOrLessButton = !(
			(activeIssuedCoupons.length === MAX_DISPLAYED_COUPONS && activeAppliedCoupons.length === 0) ||
			dAdd(activeIssuedCoupons.length, activeAppliedCoupons.length) <= MAX_DISPLAYED_COUPONS
		);

		return {
			displayedIssuedCoupons,
			displayedAssignedCoupons,
			showMoreOrLessButton,
		};
	}, [activeIssuedCoupons, activeAppliedCoupons, showMore]);

	const toggleMoreOrLess = useCallback(() => setShowMore((prev) => !prev), []);
	return (
		<Stack spacing={1}>
			<Typography variant="subtitle1" gutterBottom>
				{cartNLS.Labels.AvailableCoupons.t()}
			</Typography>
			<Stack spacing={1}>
				{displayedIssuedCoupons?.map((coupon) => (
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						spacing={1}
						sx={orderAvailableCouponsStackSX}
						key={coupon.couponId}
					>
						<Typography sx={orderAvailableCouponsTypographySX} color="primary" component="div">
							{parseHTML(coupon.description)}
						</Typography>
						<OneClick
							data-testid="button-cart-apply-coupon"
							id="button-cart-apply-coupon"
							variant="outlined"
							onClick={onCouponApply(coupon.couponId)}
						>
							{cartNLS.Actions.Apply.t()}
						</OneClick>
					</Stack>
				))}
				{displayedAssignedCoupons?.map((coupon) => (
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						spacing={1}
						sx={orderAvailableCouponsStackSX}
						key={coupon.couponId}
					>
						<Typography color="primary" component="div">
							{parseHTML(coupon.couponDescription)}
						</Typography>
						<OneClick
							wrapper="icon"
							onClick={onAssignedCouponRemoved(coupon.couponId)}
							data-testid="button-cart-remove-coupon"
							id="button-cart-remove-coupon"
						>
							<CancelIcon color="primary" />
						</OneClick>
					</Stack>
				))}
				{showMoreOrLessButton ? (
					<Button
						variant="inline"
						data-testid="button-cart-show-more"
						id="button-cart-show-more"
						onClick={toggleMoreOrLess}
					>
						{showMore ? cartNLS.Actions.ShowMore.t() : cartNLS.Actions.ShowLess.t()}
					</Button>
				) : null}
			</Stack>
		</Stack>
	);
};
