/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { storeListItemDetailsAddressSX } from '@/components/blocks/StoreListItem/styles/details/address';
import { storeListItemDetailsStack } from '@/components/blocks/StoreListItem/styles/details/detailsStack';
import { storeListItemDetailsNormalFontWeightSX } from '@/components/blocks/StoreListItem/styles/details/normalFontWeight';
import { storeListItemDetailsPhoneSX } from '@/components/blocks/StoreListItem/styles/details/phone';
import { useLocalization } from '@/data/Localization';
import { StoreDetails } from '@/data/types/Store';
import { formatPhone_NorthAmerica } from '@/utils/phone';
import { Collapse, Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';

interface Props {
	expanded: boolean;
	store: StoreDetails;
}
export const StoreListItemDetails: FC<Props> = ({ expanded, store }) => {
	const locatorNls = useLocalization('StoreLocator');
	const nls = useLocalization('Inventory');
	const storeHours = useMemo(
		() => store?.attributes?.find((attribute) => attribute.name === 'StoreHours'),
		[store]
	);
	const phoneNumber = useMemo(() => formatPhone_NorthAmerica(store?.phone), [store]) as string;

	return (
		<Collapse in={expanded} unmountOnExit>
			<Stack {...storeListItemDetailsStack}>
				<Typography variant="body2" sx={storeListItemDetailsAddressSX}>
					{store?.storeFullAddress}
				</Typography>
				<Stack direction="row">
					<LocalizationWithComponent
						text={nls.Drawer.Phone.t({ phoneNumber })}
						components={[
							<Typography
								variant="body2"
								component="span"
								key="0"
								sx={storeListItemDetailsNormalFontWeightSX}
							>
								<Typography variant="body2" component="span" sx={storeListItemDetailsPhoneSX} />
							</Typography>,
						]}
					/>
				</Stack>
				<Stack>
					<LocalizationWithComponent
						text={locatorNls.storeHours.t({
							displayName: storeHours?.displayName ?? '',
							displayValue: storeHours?.displayValue ?? '',
						})}
						components={[<Typography key="0" />, <Typography key="1" />]}
					/>
				</Stack>
			</Stack>
		</Collapse>
	);
};
