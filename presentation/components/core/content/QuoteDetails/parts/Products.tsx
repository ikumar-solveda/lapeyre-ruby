/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EmptyContent } from '@/components/blocks/EmptyContent';
import { QuoteProductsSummary } from '@/components/blocks/QuoteProductsSummary';
import { QuoteProductsTable } from '@/components/blocks/QuoteProductsTable';
import { QuoteProductsTableSearch } from '@/components/blocks/QuoteProductsTable/parts/Search';
import { QuoteDetailsAccordion } from '@/components/content/QuoteDetails/parts/Accordion';
import { State } from '@/data/constants/quotes';
import type { useQuoteDetails } from '@/data/Content/QuoteDetails';
import { useQuoteProducts } from '@/data/Content/QuoteProducts';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { QuoteItem } from '@/data/types/Quote';
import { Stack } from '@mui/material';
import { useContext, type FC } from 'react';

export const QuoteDetailsProducts: FC = () => {
	const nls = useLocalization('QuoteSections');
	const nlsProduct = useLocalization('QuoteProductsTable');
	const { quoteById } = useContext(ContentContext) as ReturnType<typeof useQuoteDetails>;
	const quoteProducts = useQuoteProducts({ quoteId: quoteById?.id as string });
	const { onSearch, searchTerm } = quoteProducts;
	return (
		<QuoteDetailsAccordion title={nls.Products.t()}>
			<Stack spacing={2}>
				{quoteProducts?.dataProducts?.count || searchTerm ? (
					<QuoteProductsTableSearch onSearch={onSearch} />
				) : null}
				{!quoteProducts?.dataProducts?.count ? (
					<EmptyContent
						title={searchTerm ? nlsProduct.NoProductsFound.t() : nlsProduct.NoProductAdded.t()}
						description={
							!searchTerm && quoteById?.status === State.DRAFT
								? nlsProduct.NoProductsHelp.t()
								: undefined
						}
						altId="quote-details-products-id"
					/>
				) : (
					<>
						<QuoteProductsTable
							quoteProducts={quoteProducts}
							detailsView={true}
							quoteData={quoteById as QuoteItem}
						/>
						<Stack direction="row" justifyContent="flex-end">
							<QuoteProductsSummary detailsView={true} quoteData={quoteById as QuoteItem} />
						</Stack>
					</>
				)}
			</Stack>
		</QuoteDetailsAccordion>
	);
};
