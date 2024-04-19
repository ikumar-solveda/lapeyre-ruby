/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { FreeGiftProductCard } from '@/components/content/FreeGift/parts/ProductCard';
import { freeGiftRewardSX } from '@/components/content/FreeGift/styles/reward';
import { useFreeGiftRewardOption } from '@/data/Content/FreeGiftRewardOption';
import { useLocalization } from '@/data/Localization';
import { CartRewardOption } from '@/data/types/Order';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { FC } from 'react';

type Props = { rewardOption: CartRewardOption; orderId: string };

export const FreeGiftReward: FC<Props> = ({ rewardOption, orderId }) => {
	const localization = useLocalization('FreeGift');
	const {
		productMap,
		updateReward,
		allowSelect,
		maxQuantity,
		availabilityMap,
		isLoading,
		filteredSpecGiftItems,
	} = useFreeGiftRewardOption({
		rewardOption,
		orderId,
	});
	const selectFreeGiftText = localization.SelectItem.t({ count: maxQuantity });
	const promotionText = localization.Promotion.t({
		promotion: rewardOption.adjustmentDescription ?? '',
	});
	const promotionItemNotAvailableText = localization.PromotionItemNotAvailable.t();

	return (
		<Paper elevation={1} sx={freeGiftRewardSX}>
			<Stack gap={2}>
				<Typography variant="subtitle2">{promotionText}</Typography>
				{!isEmpty(productMap) ? (
					<Typography variant="body2">{selectFreeGiftText}</Typography>
				) : null}
				<Divider />
				<Stack direction="row" gap={1} flexWrap="wrap" alignItems="stretch">
					{isLoading ? (
						<ProgressIndicator />
					) : isEmpty(productMap) ? (
						<Typography>{promotionItemNotAvailableText}</Typography>
					) : (
						filteredSpecGiftItems.map((item, index) => (
							<FreeGiftProductCard
								key={index}
								product={productMap[item.productId]}
								giftItem={item}
								updateReward={updateReward}
								allowSelect={allowSelect}
								availability={availabilityMap[item.productId]}
							/>
						))
					)}
				</Stack>
			</Stack>
		</Paper>
	);
};
