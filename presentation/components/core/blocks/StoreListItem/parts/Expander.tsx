/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { FlowIfDisabled, FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { storeListItemExpanderAvailabilityIconSX } from '@/components/blocks/StoreListItem/styles/expander/availabilityIcon';
import { storeListItemExpanderBackorderStack } from '@/components/blocks/StoreListItem/styles/expander/backorderStack';
import { storeListItemExpanderBackorderTextSX } from '@/components/blocks/StoreListItem/styles/expander/backorderText';
import { storeListItemExpanderButtonSX } from '@/components/blocks/StoreListItem/styles/expander/button';
import { storeListItemExpanderIconSX } from '@/components/blocks/StoreListItem/styles/expander/icon';
import { storeListItemExpanderStoreInfoSX } from '@/components/blocks/StoreListItem/styles/expander/storeInfo';
import { storeListItemExpanderSummaryStack } from '@/components/blocks/StoreListItem/styles/expander/summaryStack';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/data/Settings';
import { EXP_DATE_OPTION } from '@/data/constants/dateTime';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { INVENTORY_PBC_STATUS } from '@/data/constants/inventory';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { formatAvailability } from '@/utils/formatAvailability';
import { getExpectedDate } from '@/utils/getExpectedDate';
import { AccessAlarm, Check, ExpandMore, RemoveCircleOutline } from '@mui/icons-material';
import { ListItemButton, Stack, Typography } from '@mui/material';
import { Dispatch, FC, SetStateAction, useCallback, useMemo } from 'react';

type Props = {
	physicalStoreAvailability?: string;
	physicalStoreAvailabilityData?: ProductAvailabilityData;
	displayInventory: boolean;
	setExpanded: Dispatch<SetStateAction<boolean>>;
	expanded: boolean;
};
export const StoreListItemExpander: FC<Props> = ({
	physicalStoreAvailabilityData,
	displayInventory,
	setExpanded,
	expanded,
}) => {
	const nls = useLocalization('Inventory');
	const toggleExpand = useCallback(() => setExpanded((prev) => !prev), [setExpanded]);
	const { localeName: locale } = useStoreLocale();
	const dateFormatter = useDateTimeFormat(EXP_DATE_OPTION);
	const expectedDate = useMemo(
		() => getExpectedDate(physicalStoreAvailabilityData, dateFormatter),
		[dateFormatter, physicalStoreAvailabilityData]
	);

	return (
		<ListItemButton onClick={toggleExpand} sx={storeListItemExpanderButtonSX}>
			<Stack {...storeListItemExpanderSummaryStack(displayInventory)}>
				{displayInventory ? (
					<>
						{!!physicalStoreAvailabilityData ? (
							dFix(physicalStoreAvailabilityData.availableQuantity ?? 0) ? (
								<Stack direction="row" alignItems="flex-end">
									<Check sx={storeListItemExpanderAvailabilityIconSX()} />
									<FlowIfEnabled feature={EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT}>
										<Typography variant="caption">
											{nls.Drawer.Available.t({
												count: formatAvailability(
													locale,
													physicalStoreAvailabilityData.availableQuantity
												),
											})}
										</Typography>
									</FlowIfEnabled>
									<FlowIfDisabled feature={EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT}>
										{<Typography variant="caption">{nls.Drawer.NoInventoryShow.t()}</Typography>}
									</FlowIfDisabled>
								</Stack>
							) : physicalStoreAvailabilityData.inventoryStatus ===
							  INVENTORY_PBC_STATUS.backorder ? (
								<Stack>
									<Stack {...storeListItemExpanderBackorderStack}>
										<AccessAlarm fontSize="small" />
										<Typography variant="caption" sx={storeListItemExpanderBackorderTextSX}>
											{nls.AvailableForBackorder.t()}
										</Typography>
									</Stack>
									<LocalizationWithComponent
										text={nls.ByWay.Pickup.ExpectedAvailability.t({ date: expectedDate })}
										components={[
											<Typography key="0" variant="caption">
												<Typography component="span" />
											</Typography>,
										]}
									/>
								</Stack>
							) : null
						) : (
							<Stack direction="row" spacing={1}>
								<RemoveCircleOutline
									fontSize="small"
									sx={storeListItemExpanderAvailabilityIconSX(false)}
								/>
								<Typography variant="caption">{nls.Drawer.OOS.t()}</Typography>
							</Stack>
						)}
					</>
				) : null}
				<Stack direction="row" alignSelf="flex-end">
					<Typography variant="body2" sx={storeListItemExpanderStoreInfoSX}>
						{nls.Drawer.StoreInfo.t()}
						<ExpandMore sx={storeListItemExpanderIconSX(expanded)} />
					</Typography>
				</Stack>
			</Stack>
		</ListItemButton>
	);
};
