/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { FreeGiftReward } from '@/components/content/FreeGift/parts/Reward';
import { CartRewardOption } from '@/data/types/Order';
import { Stack } from '@mui/material';
import { FC } from 'react';

type Props = { rewardOptions: CartRewardOption[]; orderId: string };

export const FreeGift: FC<Props> = ({ rewardOptions, orderId }) => (
	<Stack gap={2}>
		{rewardOptions.map((rewardOption) => (
			<FreeGiftReward
				key={rewardOption.rewardOptionId}
				rewardOption={rewardOption}
				orderId={orderId}
			/>
		))}
	</Stack>
);
