/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { CompareProductsTable } from '@/components/content/CompareProducts/parts/Table';
import { compareProductsMobileDisplaySX } from '@/components/content/CompareProducts/styles/mobileDisplay';
import { compareProductsStackFullHeightSX } from '@/components/content/CompareProducts/styles/stackFullHeight';
import { useCompareProducts } from '@/data/Content/CompareProducts';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { Container, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';

export const CompareProducts: FC<{ id: ID }> = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const localization = useLocalization('compare');
	const router = useNextRouter();
	const {
		productsById,
		columns,
		data,
		prodWidths,
		attrWidth,
		imageSrc,
		nProds,
		attrValueDisplay,
		removeCompareProduct,
		changeThumbnail,
	} = useCompareProducts();

	return (
		<ContentProvider
			value={{
				productsById,
				prodWidths,
				attrWidth,
				imageSrc,
				attrValueDisplay,
				removeCompareProduct,
				changeThumbnail,
			}}
		>
			<Container>
				<Stack direction="row" justifyContent="space-between" alignItems="center" paddingBottom={4}>
					<Typography variant="h4">{localization.prodComp.t()}</Typography>
					<Linkable
						id="product-compare-back-to-product-list-link"
						data-testid="product-compare-back-to-product-list-link"
						type="button"
						onClick={() => router.back()}
					>
						{localization.goBack.t()}
					</Linkable>
				</Stack>
				<Stack sx={compareProductsStackFullHeightSX}>
					{isMobile ? (
						<Typography variant="h4" sx={compareProductsMobileDisplaySX}>
							{localization.tabletOrDesk.t()}
						</Typography>
					) : nProds > 0 ? (
						<Paper>
							<CompareProductsTable {...{ columns, data }} />
						</Paper>
					) : null}
				</Stack>
			</Container>
		</ContentProvider>
	);
};
