/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { CompareProductsTable } from '@/components/content/CompareProducts/parts/Table';
import { compareProductsMobileDisplaySX } from '@/components/content/CompareProducts/styles/mobileDisplay';
import { compareProductsStackFullHeightSX } from '@/components/content/CompareProducts/styles/stackFullHeight';
import { useCompareProductsV2 } from '@/data/Content/CompareProductsV2';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Container, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useMemo } from 'react';

export const CompareProducts: FC<{ id: ID }> = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const localization = useLocalization('compare');
	const router = useNextRouter();
	const {
		productsByPartNumber,
		columns,
		data,
		prodWidth,
		attrWidth,
		imageSrc,
		nProds,
		attrValueDisplay,
		removeCompareProduct,
		changeThumbnail,
	} = useCompareProductsV2();

	const value = useMemo(
		() => ({
			productsByPartNumber,
			prodWidth,
			attrWidth,
			imageSrc,
			attrValueDisplay,
			removeCompareProduct,
			changeThumbnail,
		}),
		[
			productsByPartNumber,
			prodWidth,
			attrWidth,
			imageSrc,
			attrValueDisplay,
			removeCompareProduct,
			changeThumbnail,
		]
	);

	return (
		<ContentProvider value={value}>
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
							<CompareProductsTable columns={columns} data={data} />
						</Paper>
					) : null}
				</Stack>
			</Container>
		</ContentProvider>
	);
};
