/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { productDetailsTimerIconSX } from '@/components/blocks/ProductDetails/styles/timerIcon';
import { useLocalization } from '@/data/Localization';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
	isBackorder: boolean;
	translation: string;
	pickup: boolean;
};

export const ProductDetailsInventoryStatus: FC<Props> = ({ isBackorder, translation, pickup }) => {
	const localization = useLocalization('Inventory');
	return (
		<Stack alignItems="center">
			{isBackorder ? (
				<Stack direction="row" alignItems="center">
					<AccessAlarmIcon sx={productDetailsTimerIconSX} />
					<Typography variant="body2" color="warning.main">
						{localization.AvailableForBackorder.t()}
					</Typography>
				</Stack>
			) : null}
			{pickup ? (
				<LocalizationWithComponent
					text={translation}
					components={[
						<Typography key="0" variant="caption" textAlign="center">
							<Typography variant="strong" />
						</Typography>,
					]}
				/>
			) : (
				<Typography variant="caption" textAlign="center" data-testid="delivery" id="delivery">
					{translation}
				</Typography>
			)}
		</Stack>
	);
};
