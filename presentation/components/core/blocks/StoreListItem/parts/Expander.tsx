/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { FlowIfDisabled, FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { storeListItemExpanderAvailabilityIconSX } from '@/components/blocks/StoreListItem/styles/expander/availabilityIcon';
import { storeListItemExpanderButtonSX } from '@/components/blocks/StoreListItem/styles/expander/button';
import { storeListItemExpanderIconSX } from '@/components/blocks/StoreListItem/styles/expander/icon';
import { storeListItemExpanderStoreInfoSX } from '@/components/blocks/StoreListItem/styles/expander/storeInfo';
import { storeListItemExpanderSummaryStack } from '@/components/blocks/StoreListItem/styles/expander/summaryStack';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { formatAvailability } from '@/utils/formatAvailability';
import { Check, ExpandMore, RemoveCircleOutline } from '@mui/icons-material';
import { ListItemButton, Stack, Typography } from '@mui/material';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';

type Props = {
	physicalStoreAvailability?: string;
	displayInventory: boolean;
	setExpanded: Dispatch<SetStateAction<boolean>>;
	expanded: boolean;
};
export const StoreListItemExpander: FC<Props> = ({
	physicalStoreAvailability,
	displayInventory,
	setExpanded,
	expanded,
}) => {
	const nls = useLocalization('Inventory');
	const toggleExpand = useCallback(() => setExpanded((prev) => !prev), [setExpanded]);
	const { localeName: locale } = useStoreLocale();

	return (
		<ListItemButton onClick={toggleExpand} sx={storeListItemExpanderButtonSX}>
			<Stack {...storeListItemExpanderSummaryStack(displayInventory)}>
				{displayInventory ? (
					<>
						{!!physicalStoreAvailability ? (
							<Stack direction="row" alignItems="flex-end">
								<Check sx={storeListItemExpanderAvailabilityIconSX()} />
								<FlowIfEnabled feature={EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT}>
									<Typography variant="caption">
										{nls.Drawer.Available.t({
											count: formatAvailability(locale, physicalStoreAvailability),
										})}
									</Typography>
								</FlowIfEnabled>
								<FlowIfDisabled feature={EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT}>
									{<Typography variant="caption">{nls.Drawer.NoInventoryShow.t()}</Typography>}
								</FlowIfDisabled>
							</Stack>
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
				<Stack direction="row">
					<Typography variant="body2" sx={storeListItemExpanderStoreInfoSX}>
						{nls.Drawer.StoreInfo.t()}
						<ExpandMore sx={storeListItemExpanderIconSX(expanded)} />
					</Typography>
				</Stack>
			</Stack>
		</ListItemButton>
	);
};
