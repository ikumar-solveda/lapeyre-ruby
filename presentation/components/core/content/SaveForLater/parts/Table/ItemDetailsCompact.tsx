/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellProductImage } from '@/components/blocks/ProductImage';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { SaveForLaterTableRowData } from '@/components/content/SaveForLater/parts/Table';
import { SaveForLaterTableMoveToCart } from '@/components/content/SaveForLater/parts/Table/MoveToCart';
import { SaveForLaterTablePrice } from '@/components/content/SaveForLater/parts/Table/Price';
import { saveForLaterTableItemDetailsImageSX } from '@/components/content/SaveForLater/styles/tableItemDetailsImage';
import { useSaveForLaterTableRow } from '@/data/Content/SaveForLaterTableRow';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const SaveForLaterTableItemDetailsCompact: FC = () => {
	const localization = useLocalization('SaveForLaterTable');
	const { product, color, loading } = useContext(ContentContext) as SaveForLaterTableRowData &
		ReturnType<typeof useSaveForLaterTableRow>;
	const {
		partNumber = EMPTY_STRING,
		thumbnail,
		name,
		seo,
		productPrice,
		shortDescription,
	} = product;
	if (loading) {
		return <ProgressIndicator />;
	}

	const href = seo?.href;
	const prices = productPrice;

	return (
		<Stack direction="row" alignItems="flex-start" spacing={2}>
			{thumbnail ? (
				<Linkable href={href} id={href} data-testid={href}>
					<TableCellProductImage
						src={thumbnail}
						alt={localization.Labels.ProductThumbnail.t()}
						isThumbnail={true}
						sx={saveForLaterTableItemDetailsImageSX}
					/>
				</Linkable>
			) : null}
			<Stack direction="column" alignItems="flex-start">
				<Stack spacing={0.5}>
					<Stack spacing={0.25}>
						<Linkable href={href} id={href} data-testid={href}>
							<Typography variant="h6" data-testid="save-for-later-name" id="save-for-later-name">
								{color ? `${name}, ${color}` : name}
							</Typography>
						</Linkable>
						{prices ? <SaveForLaterTablePrice /> : null}
						<Typography data-testid="save-for-later-partNumber" id="save-for-later-partNumber">
							{localization.Labels.SKU.t({ partNumber })}
						</Typography>
						<Typography variant="body1" id="save-for-later-desc" data-testid="save-for-later-desc">
							{shortDescription}
						</Typography>
						<SaveForLaterTableMoveToCart />
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};
