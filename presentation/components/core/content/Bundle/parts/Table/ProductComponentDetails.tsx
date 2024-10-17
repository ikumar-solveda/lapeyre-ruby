/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellProductImage } from '@/components/blocks/ProductImage';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { bundleTableComponentDetailsStack } from '@/components/content/Bundle/styles/Table/componentDetailsStack';
import { bundleTableProductSkuDetailsSX } from '@/components/content/Bundle/styles/Table/productSkuDetails';
import { useLocalization } from '@/data/Localization';
import { BundleTableRowData } from '@/data/types/Product';
import { Stack, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const BundleTableProductComponentDetails: FC<CellContext<BundleTableRowData, unknown>> = ({
	row,
}) => {
	const rowData = row.original;
	const { Unconfigured, PRODUCTSKU } = useLocalization('productDetail');
	const { name, selectedSku, isOneSku, partNumber, seo, thumbnail } = rowData;

	const _partNumber = selectedSku?.partNumber ?? (isOneSku ? partNumber : Unconfigured.t());
	const _thumbnail = selectedSku?.thumbnail ?? thumbnail;
	const href = selectedSku?.seo?.href ?? seo.href;
	const { spacing, direction, alignItems, justifyContent } = bundleTableComponentDetailsStack;

	return (
		<TableCellResponsiveContent label={PRODUCTSKU.t()}>
			<Stack
				spacing={spacing}
				direction={direction}
				alignItems={alignItems}
				justifyContent={justifyContent}
			>
				{thumbnail ? (
					<Linkable href={href} data-testid={href} id={href}>
						<TableCellProductImage
							{...{
								isThumbnail: true,
								src: _thumbnail,
								alt: name,
								sx: bundleTableProductSkuDetailsSX,
							}}
						/>
					</Linkable>
				) : null}
				<Stack>
					<Typography variant="h6AsH2">
						<Linkable href={href} data-testid={href} id={href}>
							{name}
						</Linkable>
					</Typography>
					<Typography>{_partNumber}</Typography>
				</Stack>
			</Stack>
		</TableCellResponsiveContent>
	);
};
