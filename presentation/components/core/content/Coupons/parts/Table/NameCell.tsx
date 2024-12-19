/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { AVAILABLE_COUPONS_LIST_TABLE } from '@/data/constants/coupons';
import { ContentContext } from '@/data/context/content';
import { CouponContextValues, CouponItem } from '@/data/types/Coupon';
import { parseHTML } from '@/utils/parseHTML';
import { Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const CouponsTableNameCell: FC = () => {
	const couponsTableNLS = useLocalization('Coupons');
	const routes = useLocalization('Routes');
	const { coupon } = useContext(ContentContext) as CouponContextValues & {
		coupon: CouponItem;
	};
	const href = useMemo(
		() => ({
			pathname: routes.CouponDetails.route.t(),
			query: { code: coupon.promotion?.externalIdentifier?.name ?? '' },
		}),
		[coupon, routes]
	);
	return (
		<TableCellResponsiveContent label={couponsTableNLS.Labels.CouponName.t()}>
			<Linkable
				data-testid={`${AVAILABLE_COUPONS_LIST_TABLE}-coupon-name-link`}
				id={`${AVAILABLE_COUPONS_LIST_TABLE}-coupon-name-link`}
				href={href}
			>
				<Typography>{parseHTML(coupon.description)}</Typography>
			</Linkable>
		</TableCellResponsiveContent>
	);
};
