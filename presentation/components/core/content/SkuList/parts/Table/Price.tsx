/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { DEFAULT_SINGLE_RECORD } from '@/data/constants/price';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { SkuListTableData } from '@/data/types/Product';
import { SkuListTableAuxiliaryContextValue } from '@/data/types/SkuListTable';
import { useUser } from '@/data/User';
import { getRangePriceRecord } from '@/utils/getVolumePrice';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export const SkuListTablePrice: FC<CellContext<SkuListTableData, unknown>> = ({ row }) => {
	const { onVolumePriceDialog, entitledPriceList } = useContext(
		ContentContext
	) as SkuListTableAuxiliaryContextValue;
	const productDetailNLS = useLocalization('productDetail');
	const priceDisplayNLS = useLocalization('PriceDisplay');
	const localization = useLocalization('VolumePricing');
	const { productPrice, partNumber } = row.original;
	const disp = (productPrice?.offer || null) as number;

	const { rangePriceList } = useMemo(
		() => getRangePriceRecord(entitledPriceList, partNumber),
		[entitledPriceList, partNumber]
	);
	const { user } = useUser();
	const { data } = useFlexFlowStoreFeature({
		id: EMS_STORE_FEATURE.SHOW_PRODUCT_PRICE_FOR_GUEST_USER,
	});
	const showProductPriceForGuestUserEnabled = data.featureEnabled;
	const loginStatus = user?.isLoggedIn;
	return (
		<TableCellResponsiveContent label={productDetailNLS.Price.t()}>
			{showProductPriceForGuestUserEnabled || loginStatus ? (
				<>
					<Typography data-testid="offer-price" id="offer-price">
						{disp ? (
							<PriceDisplay currency={productPrice?.currency} min={disp} />
						) : (
							priceDisplayNLS.Labels.Pending.t()
						)}
					</Typography>
					{rangePriceList?.length > DEFAULT_SINGLE_RECORD ? (
						<Linkable
							type="inline"
							id="button-volume-pricing"
							data-testid="button-volume-pricing"
							aria-label="button-volume-pricing"
							onClick={onVolumePriceDialog(partNumber)}
						>
							{localization.title.t()}
						</Linkable>
					) : null}
				</>
			) : (
				<Typography>{priceDisplayNLS.Labels.SignIn.t()}</Typography>
			)}
		</TableCellResponsiveContent>
	);
};
