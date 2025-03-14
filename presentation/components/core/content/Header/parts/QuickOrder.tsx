/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { Linkable } from '@/components/blocks/Linkable';
import { headerItemLinkSX } from '@/components/content/Header/styles/itemLink';
import { headerItemStackSX } from '@/components/content/Header/styles/itemStack';
import { headerQuickOrderSX } from '@/components/content/Header/styles/quickOrder';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { useLocalization } from '@/data/Localization';
import { ListAltOutlined } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { type FC } from 'react';

export const HeaderQuickOrder: FC = () => {
	const RouteLocal = useLocalization('Routes');
	const localization = useLocalization('QuickOrder');

	return (
		<FlowIfEnabled feature={EMS_STORE_FEATURE.QUICK_ORDER}>
			<Stack alignItems="center" sx={headerItemStackSX}>
				<Linkable
					href={`/${RouteLocal.QuickOrder.route.t()}`}
					id="header-quick-order-icon"
					data-testid="header-quick-order-icon"
					sx={headerItemLinkSX}
					aria-label={localization.Title.t()}
				>
					<ListAltOutlined />
				</Linkable>
				<Typography sx={headerQuickOrderSX}>
					<Linkable
						href={`/${RouteLocal.QuickOrder.route.t()}`}
						id="quick-order"
						data-testid="quick-order"
						sx={headerItemLinkSX}
						aria-label={localization.Title.t()}
					>
						{localization.Title.t()}
					</Linkable>
				</Typography>
			</Stack>
		</FlowIfEnabled>
	);
};
