/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { VolumePriceRecord } from '@/components/blocks/ProductDetails/parts/VolumePriceRecord';
import { productDetailsVolumePriceStack } from '@/components/blocks/ProductDetails/styles/volumePriceStack';
import { VolumePriceDialog } from '@/components/content/VolumePriceDialog';
import { DEFAULT_SINGLE_RECORD, VOLUME_PRICE_MAX_DISPLAY_SIZE } from '@/data/constants/price';
import { TYPES } from '@/data/constants/product';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { useUser } from '@/data/User';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { productIsA } from '@/utils/productIsA';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { FC, useCallback, useContext, useMemo, useState } from 'react';

export const ProductDetailsVolumePrice: FC = () => {
	const { rangePriceList, selection, product } = useContext(ContentContext) as ReturnType<
		typeof useProductDetails
	>;
	const localization = useLocalization('VolumePricing');
	const { partNumber } = getProductDisplayInfo(selection?.sku, product);
	const [dialogState, setDialogState] = useState<boolean>(false);
	const onDialog = useCallback(() => setDialogState((prev) => !prev), []);
	const displayedList = useMemo(
		() =>
			rangePriceList?.length < VOLUME_PRICE_MAX_DISPLAY_SIZE
				? rangePriceList
				: rangePriceList?.slice(0, VOLUME_PRICE_MAX_DISPLAY_SIZE),
		[rangePriceList]
	);
	const { user } = useUser();
	const loading = user?.forCDNCache; // TODO: with this logic, the search engine cached page will see spinner for price.

	// modified: should not even allow spinner if sku has non-configured price options
	return rangePriceList?.length > DEFAULT_SINGLE_RECORD ? (
		loading ? (
			<CircularProgress size={15} />
		) : (
			<>
				<Stack spacing={1}>
					<Typography variant="body2">{localization.title.t()}</Typography>
					<Stack {...productDetailsVolumePriceStack}>
						{displayedList.map((item, index) => (
							<VolumePriceRecord key={index} rangePriceItem={item} />
						))}
					</Stack>
					{rangePriceList.length > VOLUME_PRICE_MAX_DISPLAY_SIZE ? (
						<Typography>
							<Linkable
								type="inline"
								id="button-view-all"
								data-testid="button-view-all"
								aria-label="button-view-all"
								onClick={onDialog}
							>
								{localization.viewAll.t()}
							</Linkable>
						</Typography>
					) : null}
				</Stack>
				<VolumePriceDialog
					open={dialogState}
					onDialog={onDialog}
					partNumber={productIsA(product, TYPES.kit) ? '' : partNumber}
				/>
			</>
		)
	) : null;
};
