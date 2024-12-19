/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { AVAILABLE_COUPONS_LIST_TABLE } from '@/data/constants/coupons';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { CouponContextValues, CouponItem } from '@/data/types/Coupon';
import { Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const CouponsTableDateCell: FC = () => {
	const couponsTableNLS = useLocalization('Coupons');
	const { coupon } = useContext(ContentContext) as CouponContextValues & {
		coupon: CouponItem;
	};
	const dateFormatter = useDateTimeFormat();
	const couponExpirationDate = useMemo(
		() =>
			coupon?.expirationDateTime
				? dateFormatter.format(new Date(coupon?.expirationDateTime))
				: EMPTY_STRING,
		[coupon, dateFormatter]
	);

	return (
		<TableCellResponsiveContent
			label={
				<Typography variant="overline">{couponsTableNLS.Labels.ExpirationDate.t()}</Typography>
			}
		>
			<Typography
				data-testid={`${AVAILABLE_COUPONS_LIST_TABLE}-expiration-date`}
				id={`${AVAILABLE_COUPONS_LIST_TABLE}-expiration-date`}
			>
				{couponExpirationDate}
			</Typography>
		</TableCellResponsiveContent>
	);
};
