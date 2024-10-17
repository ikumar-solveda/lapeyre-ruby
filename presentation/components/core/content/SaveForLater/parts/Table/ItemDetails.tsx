/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellProductImage } from '@/components/blocks/ProductImage';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { SaveForLaterTableRowData } from '@/components/content/SaveForLater/parts/Table';
import { saveForLaterTableItemDetailsImageSX } from '@/components/content/SaveForLater/styles/tableItemDetailsImage';
import { useSaveForLaterTableRow } from '@/data/Content/SaveForLaterTableRow';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const SaveForLaterTableItemDetails: FC = () => {
	const { product, color, loading, isValidating } = useContext(
		ContentContext
	) as SaveForLaterTableRowData & ReturnType<typeof useSaveForLaterTableRow>;
	const { partNumber = EMPTY_STRING, thumbnail, name, seo, shortDescription } = product;
	const labels = useLocalization('SaveForLaterTable').Labels;
	if (loading && !isValidating) {
		return <ProgressIndicator padding={2} />;
	}
	const href = seo?.href;
	return (
		<Stack direction="row" alignItems="flex-start" spacing={2}>
			{thumbnail ? (
				<Linkable href={href} id={href} data-testid={href}>
					<TableCellProductImage
						src={thumbnail}
						alt={labels.ProductThumbnail.t()}
						isThumbnail={true}
						sx={saveForLaterTableItemDetailsImageSX}
					/>
				</Linkable>
			) : null}
			<Stack direction="column" alignItems="flex-start" spacing={0.25}>
				<Typography variant="h6" data-testid="save-for-later-name" id="save-for-later-name">
					<Linkable href={href} id={href} data-testid={href}>
						{color ? `${name}, ${color}` : name}
					</Linkable>
				</Typography>
				<Typography id="save-for-later-partNumber" data-testid="save-for-later-partNumber">
					{labels.SKU.t({ partNumber })}
				</Typography>
				<Typography variant="caption" id="save-for-later-desc" data-testid="save-for-later-desc">
					{shortDescription}
				</Typography>
			</Stack>
		</Stack>
	);
};
