/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { OneClick } from '@/components/blocks/OneClick';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTableRow';
import { useSaveForLater } from '@/data/Content/SaveForLaterList';
import { useLocalization } from '@/data/Localization';
import { Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
	details: ReturnType<typeof useOrderItemTableRow>['details'];
	quantity: number;
	updateCart: (quantity: number | null) => Promise<void>;
};
export const OrderItemTableV2SaveForLater: FC<Props> = ({ details, quantity, updateCart }) => {
	const localization = useLocalization('OrderItemTable');

	const { onCreate } = useSaveForLater();

	return (
		<Linkable type="link">
			<OneClick variant="inline" onClick={onCreate(details, quantity, updateCart)}>
				<Typography variant="body2">{localization.Labels.SaveForLater.t()}</Typography>
			</OneClick>
		</Linkable>
	);
};
