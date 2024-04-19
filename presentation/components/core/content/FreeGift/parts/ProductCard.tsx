/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Availability } from '@/components/blocks/Availability';
import { Card } from '@/components/blocks/Card';
import { Linkable } from '@/components/blocks/Linkable';
import { MuiCardMedia } from '@/components/blocks/MuiCardMedia';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { freeGiftProductCardSX } from '@/components/content/FreeGift/styles/productCard';
import { freeGiftProductImageSX } from '@/components/content/FreeGift/styles/productImage';
import { useFreeGiftRewardOption } from '@/data/Content/FreeGiftRewardOption';
import { useLocalization } from '@/data/Localization';
import { AVAILABLE_STATUSES } from '@/data/constants/inventory';
import { ProductType } from '@/data/types/Product';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { CheckCircle } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { FC, useCallback, useMemo } from 'react';

export const FreeGiftProductCard: FC<{
	product: ProductType;
	giftItem: ReturnType<typeof useFreeGiftRewardOption>['specGiftItems'][0];
	updateReward: ReturnType<typeof useFreeGiftRewardOption>['updateReward'];
	availability?: ProductAvailabilityData;
	allowSelect: boolean;
}> = ({ product, giftItem, updateReward, allowSelect, availability }) => {
	const localization = useLocalization('FreeGift');
	const inventoryStatusNLS = useLocalization('CommerceEnvironment').inventoryStatus;
	type InventoryStatusNLSKeys = keyof typeof inventoryStatusNLS;
	const inventoryStatus: InventoryStatusNLSKeys = (availability?.inventoryStatus ??
		'') as InventoryStatusNLSKeys;
	const add = localization.Add.t();
	const remove = localization.Remove.t();
	const selected = giftItem.selected;
	const { productPrice: price, partNumber } = product;
	const partNumberShort = partNumber.length > 20 ? partNumber.substring(0, 20) + '...' : partNumber;

	const handleClick = useCallback(() => updateReward(giftItem)(), [giftItem, updateReward]);

	const giftActions = useMemo(
		() => [
			{
				handleClick,
				text: selected ? remove : add,
				variant: 'outlined',
				disable: !selected && (!allowSelect || !AVAILABLE_STATUSES[`${inventoryStatus}`]),
			},
		],
		[handleClick, selected, remove, add, allowSelect, inventoryStatus]
	);

	const cardMain = (
		<>
			{giftItem.selected ? (
				<Box sx={{ position: 'absolute' }}>
					<CheckCircle color="primary" />
				</Box>
			) : null}
			<Stack alignItems="center">
				<MuiCardMedia
					title={partNumber}
					alt={partNumber}
					image={product.thumbnail}
					sx={freeGiftProductImageSX}
				/>
				<Linkable href={product.seo.href} align="center">
					{product.name}
				</Linkable>
				<Typography align="center" title={partNumber}>
					{partNumberShort}
				</Typography>
				<Typography align="center">
					<PriceDisplay min={price?.min ?? 0} currency={price.currency} />
				</Typography>
				{inventoryStatus ? <Availability availability={availability} /> : null}
			</Stack>
		</>
	);

	return (
		<Card
			extraSX={[freeGiftProductCardSX(selected)]}
			testId={`freeGift-${product.id}`}
			actions={giftActions}
			cardMain={cardMain}
		/>
	);
};
