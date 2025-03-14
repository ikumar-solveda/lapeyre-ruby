/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EmptyContent } from '@/components/blocks/EmptyContent';
import { OneClick } from '@/components/blocks/OneClick';
import { QuoteProductsSummary } from '@/components/blocks/QuoteProductsSummary';
import { QuoteProductsTable } from '@/components/blocks/QuoteProductsTable';
import { QuoteProductsTableSearch } from '@/components/blocks/QuoteProductsTable/parts/Search';
import { QuoteCreateEditDialogProducts } from '@/components/content/QuoteCreateEdit/parts/Dialog/Products';
import { quoteCreateEditContentStack } from '@/components/content/QuoteCreateEdit/styles/contentStack';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { useQuoteProducts } from '@/data/Content/QuoteProducts';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { QuoteItem } from '@/data/types/Quote';
import { Stack, Typography } from '@mui/material';
import { useContext, type FC } from 'react';
import { QuoteCreateEditDialogBrowseAndAdd } from '@/components/content/QuoteCreateEdit/parts/Dialog/BrowseAndAdd';
import { useQuoteBrowseAndAdd } from '@/data/Content/QuoteBrowseAndAdd';

export const QuoteCreateEditProducts: FC = () => {
	const localization = useLocalization('Quotes');
	const quoteCreateEdit = useContext(ContentContext) as ReturnType<typeof useQuoteCreateEdit>;
	const {
		quoteById,
		openFileUploadDialog,
		handleDiscountTypeChange,
		handleDiscountValueChange,
		discountType,
		editProposedPrice,
	} = quoteCreateEdit;
	const quoteBrowseAndAdd = useQuoteBrowseAndAdd({ quoteId: quoteById?.id as string });
	const { openBrowseAndAddDialog } = quoteBrowseAndAdd;
	const quoteProducts = useQuoteProducts({ quoteId: quoteById?.id as string });
	const { onSearch, searchTerm } = quoteProducts;
	const nls = useLocalization('QuoteProductsTable');

	return (
		<Stack spacing={2}>
			<Stack {...quoteCreateEditContentStack}>
				<Typography variant="h6">{localization.UploadProducts.t()}</Typography>
				<Stack direction="row" spacing={2}>
					<OneClick
						id="quote-create-edit-products-upload-button"
						data-testid="quote-create-edit-products-upload-button"
						onClick={openFileUploadDialog}
						variant="outlined"
					>
						{localization.UploadCSV.t()}
					</OneClick>
					<OneClick
						id="quote-create-edit-products-add-button"
						data-testid="quote-create-edit-products-add-button"
						onClick={openBrowseAndAddDialog}
						variant="contained"
					>
						{localization.AddProducts.t()}
					</OneClick>
				</Stack>
			</Stack>
			{quoteProducts?.dataProducts?.count || searchTerm ? (
				<QuoteProductsTableSearch onSearch={onSearch} />
			) : null}
			<Stack spacing={2}>
				{!quoteProducts?.dataProducts?.count ? (
					<EmptyContent
						title={searchTerm ? nls.NoProductsFound.t() : nls.NoProductsSelected.t()}
						altId="quote-create-edit-products-id"
					/>
				) : (
					<>
						<QuoteProductsTable
							quoteProducts={quoteProducts}
							quoteData={quoteById as QuoteItem}
							editProposedPrice={editProposedPrice}
						/>
						<Stack direction="row" justifyContent="flex-end">
							<QuoteProductsSummary
								quoteData={quoteById as QuoteItem}
								handleDiscountTypeChange={handleDiscountTypeChange}
								handleDiscountValueChange={handleDiscountValueChange}
								discountType={discountType}
							/>
						</Stack>
					</>
				)}
			</Stack>
			<QuoteCreateEditDialogProducts />
			<QuoteCreateEditDialogBrowseAndAdd quoteBrowseAndAdd={quoteBrowseAndAdd} />
		</Stack>
	);
};
