/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { ProductImage } from '@/components/blocks/ProductImage';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { kitTableItemDetailsSX } from '@/components/content/Kit/styles/Table/itemDetails';
import { kitTableItemDetailsStack } from '@/components/content/Kit/styles/Table/itemDetailsStack';
import { useLocalization } from '@/data/Localization';
import { ItemDetails, KitTableData } from '@/data/types/Product';
import { Stack, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const KitTableItemDetails: FC<CellContext<KitTableData, ItemDetails>> = ({ getValue }) => {
	const { thumbnail, name, partNumber, href } = getValue();
	const { PRODUCTSKU } = useLocalization('productDetail');
	const { spacing, direction, alignItems, justifyContent } = kitTableItemDetailsStack;
	return (
		<TableCellResponsiveContent label={PRODUCTSKU.t()}>
			<Stack
				spacing={spacing}
				direction={direction}
				alignItems={alignItems}
				justifyContent={justifyContent}
			>
				{thumbnail ? (
					<Linkable href={href} id={href} data-testid={href}>
						<ProductImage
							{...{ isThumbnail: true, src: thumbnail, alt: name, sx: kitTableItemDetailsSX }}
						/>
					</Linkable>
				) : null}
				<Stack>
					<Typography variant="h6AsH2">
						<Linkable href={href} id={href} data-testid={href}>
							{name}
						</Linkable>
					</Typography>
					<Typography>{partNumber}</Typography>
				</Stack>
			</Stack>
		</TableCellResponsiveContent>
	);
};
