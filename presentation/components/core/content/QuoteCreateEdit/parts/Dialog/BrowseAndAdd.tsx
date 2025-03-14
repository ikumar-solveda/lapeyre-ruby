/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */
import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { QuoteCreateEditBrowseAndAdd } from '@/components/content/QuoteCreateEdit/parts/BrowseAndAdd';
import { useQuoteBrowseAndAdd } from '@/data/Content/QuoteBrowseAndAdd';
import { ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { FC } from 'react';

type QuoteBrowseAndAddProps = {
	quoteBrowseAndAdd: ReturnType<typeof useQuoteBrowseAndAdd>;
};

export const QuoteCreateEditDialogBrowseAndAdd: FC<QuoteBrowseAndAddProps> = (props) => {
	const localization = useLocalization('Quotes');
	const { quoteBrowseAndAdd } = props;
	const { closeAndClearBrowseAndAddDialog, showBrowseAndAddDialog, onAddToQuote } =
		quoteBrowseAndAdd;

	return (
		<ContentProvider value={quoteBrowseAndAdd}>
			<Dialog
				open={showBrowseAndAddDialog}
				onClose={closeAndClearBrowseAndAddDialog}
				title={localization.AddProductsTitle.t()}
				content={<QuoteCreateEditBrowseAndAdd />}
				actions={
					<>
						<OneClick
							id="quote-create-edit-dialog-browse-cancel-button"
							data-testid="quote-create-edit-dialog-browse-cancel-button"
							variant="outlined"
							onClick={closeAndClearBrowseAndAddDialog}
						>
							{localization.Cancel.t()}
						</OneClick>
						<OneClick
							id="quote-create-edit-dialog-browse-add-button"
							data-testid="quote-create-edit-dialog-browse-add-button"
							variant="contained"
							onClick={onAddToQuote}
						>
							{localization.AddToQuote.t()}
						</OneClick>
					</>
				}
			/>
		</ContentProvider>
	);
};
