/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext, useEffect } from 'react';
import {
	Button,
	Container,
	Grid,
	IconButton,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import { ProductImage } from '@/components/blocks/ProductImage';
import { useCompareCollector } from '@/data/Content/CompareCollector';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ProductType } from '@/data/types/Product';
import { combineSX } from '@/utils/combineSX';
import { useWinDimsInEM } from '@/utils/useWinDimsInEM';
import { catalogEntryListCompareCollectorStickyContainerSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorStickyContainer';
import { catalogEntryListCompareCollectorRelativeContainerSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorRelativeContainer';
import { catalogEntryListCompareCollectorDrawerContainerSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorDrawerContainer';
import { catalogEntryListCompareCollectorBarSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorBar';
import { catalogEntryListCompareCollectorDiagnosticSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorDiagnostic';
import { catalogEntryListCompareCollectorActionsButtonClearSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorActionsButtonClear';
import { catalogEntryListCompareCollectorActionsButtonToggleSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorActionsButtonToggle';
import { catalogEntryListCompareCollectorBarContentSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorBarContent';
import { catalogEntryListCompareCollectorThumbBoxSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorThumbBox';
import { catalogEntryListCompareCollectorThumbBoxThumbSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorThumbBoxThumb';
import { catalogEntryListCompareCollectorCloseIconSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorCloseIcon';
import { catalogEntryListCompareCollectorPriceDescSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorPriceDesc';
import { catalogEntryListCompareCollectorPriceSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorPrice';
import { catalogEntryListCompareCollectorDiagnosticLinkSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorDiagnosticLink';
import { catalogEntryListCompareCollectorThumbBoxTextSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorThumbBoxText';
import { CatalogEntryListComparePrice } from '@/components/content/CatalogEntryList/parts/Compare/Price';
import { catalogEntryListCompareCollectorActionsButtonCompareSX } from '@/components/content/CatalogEntryList/styles/Compare/collectorActionsButtonCompare';
import { Linkable } from '@/components/blocks/Linkable';

export const CatalogEntryListCompareCollector: FC = () => {
	const {
		compareState,
		removeAll,
		compareEnabled,
		anchorRef,
		edges,
		open,
		setOpen,
		remove,
		updateDivPlacement,
		openCompare,
	} = useContext(ContentContext) as ReturnType<typeof useCompareCollector>;
	const localization = useLocalization('compare');
	const { w_px } = useWinDimsInEM();
	const theme = useTheme();
	const notLg = useMediaQuery(theme.breakpoints.down('lg'));

	useEffect(() => {
		updateDivPlacement(anchorRef);
	}, [open, anchorRef, w_px]); // eslint-disable-line react-hooks/exhaustive-deps

	return compareEnabled ? (
		<Stack ref={anchorRef} sx={catalogEntryListCompareCollectorStickyContainerSX}>
			<Stack sx={catalogEntryListCompareCollectorRelativeContainerSX}>
				<Stack sx={catalogEntryListCompareCollectorDrawerContainerSX(edges)}>
					<Container
						maxWidth="lg"
						sx={catalogEntryListCompareCollectorBarSX}
						onClick={() => setOpen(!open)}
					>
						<Grid container py={2}>
							<Grid item container sm={9} md={10} spacing={2}>
								<Grid item>
									{compareState.len > 1 ? (
										<Button
											id="compare-selected-products"
											data-testid="compare-selected-products"
											variant="contained"
											sx={catalogEntryListCompareCollectorActionsButtonCompareSX}
											onClick={openCompare}
										>
											{localization.compSel.t()}
										</Button>
									) : (
										<Typography variant="body2" sx={catalogEntryListCompareCollectorDiagnosticSX}>
											{localization.addAtLeast.t()}
										</Typography>
									)}
								</Grid>
								<Grid item>
									<Button
										id="button-clear-selection"
										data-testid="button-clear-selection"
										variant="outlined"
										sx={catalogEntryListCompareCollectorActionsButtonClearSX}
										onClick={removeAll}
									>
										{localization.clearSel.t()}
									</Button>
								</Grid>
							</Grid>
							<Grid item sm={3} md={2} sx={catalogEntryListCompareCollectorActionsButtonToggleSX}>
								<Button
									id="button-hide-expand"
									variant="outlined"
									data-testid="button-hide-expand"
									onClick={() => setOpen(!open)}
								>
									{open ? localization.hide.t() : localization.expand.t()}
									{open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
								</Button>
							</Grid>
						</Grid>
					</Container>
					{open ? (
						<Container maxWidth="lg" sx={catalogEntryListCompareCollectorBarContentSX}>
							<Grid container>
								<Grid item container sm={12} marginBottom={2}>
									{compareState.storage.filter(Boolean).map((obj: ProductType, i: number) => (
										<Grid
											item
											key={i}
											xs={12 / compareState.max}
											sx={combineSX([
												catalogEntryListCompareCollectorThumbBoxSX,
												catalogEntryListCompareCollectorThumbBoxThumbSX,
											])}
										>
											<IconButton
												size="large"
												id={`button-product-compare-${obj.partNumber?.toLowerCase()}-close`}
												data-testid={`button-product-compare-${obj.partNumber?.toLowerCase()}-close`}
												sx={catalogEntryListCompareCollectorCloseIconSX}
												color="primary"
												onClick={() => remove(obj)}
											>
												<CloseIcon fontSize="small" />
											</IconButton>
											<ProductImage src={obj.thumbnail} alt={obj.name} />
											<Stack sx={catalogEntryListCompareCollectorPriceDescSX}>
												<Typography
													variant={notLg ? 'body2' : 'subtitle1'}
													sx={catalogEntryListCompareCollectorPriceSX}
												>
													<CatalogEntryListComparePrice product={obj} />
												</Typography>
												<Linkable href={obj.seo?.href}>
													<Typography sx={catalogEntryListCompareCollectorDiagnosticLinkSX}>
														{obj.name}
													</Typography>
												</Linkable>
											</Stack>
										</Grid>
									))}
									{Array(compareState.max - compareState.len)
										.fill(null)
										.map((n, i) => (
											<Grid
												item
												key={i}
												xs={12 / compareState.max}
												sx={combineSX([
													catalogEntryListCompareCollectorThumbBoxSX,
													catalogEntryListCompareCollectorThumbBoxTextSX,
												])}
											>
												<Typography
													variant="body2"
													sx={catalogEntryListCompareCollectorDiagnosticSX}
												>
													{localization.boxNofM.t({
														m: compareState.max,
														n: compareState.len + i + 1,
													})}
												</Typography>
											</Grid>
										))}
								</Grid>
							</Grid>
						</Container>
					) : null}
				</Stack>
			</Stack>
		</Stack>
	) : null;
};
