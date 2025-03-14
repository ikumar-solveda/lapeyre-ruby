/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { AddToQuoteDialogCreateNewQuote } from '@/components/blocks/AddToQuoteDialog/parts/CreateNewQuote';
import { addToQuoteDialogButtonSX } from '@/components/blocks/AddToQuoteDialog/styles/button';
import { addToQuoteDialogStack } from '@/components/blocks/AddToQuoteDialog/styles/stack';
import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { QuotesTable } from '@/components/content/Quotes/parts/Table';
import type { useAddToQuote } from '@/data/Content/AddToQuote';
import { useQuotes } from '@/data/Content/Quotes';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { AddCircleOutlined } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { type FC, useContext, useMemo } from 'react';

export const AddToQuoteDialog: FC = () => {
	const useAddToQuoteValue = useContext(ContentContext) as ReturnType<typeof useAddToQuote>;
	const {
		dialogOpen,
		handleClose,
		handleCancel,
		onDraft,
		handleNewQuote,
		handleSave,
		isCreatingNewQuote,
		data,
	} = useAddToQuoteValue;
	const localization = useLocalization('productDetail');
	const useQuotesValue = useQuotes();
	const contextValue = useMemo(
		() => ({ ...useQuotesValue, useAddToQuoteValue }),
		[useAddToQuoteValue, useQuotesValue]
	);

	return dialogOpen ? (
		<Dialog
			open={dialogOpen}
			onClose={handleClose}
			title={localization[isCreatingNewQuote ? 'dialogHeaderNew' : 'dialogHeaderExisting'].t()}
			content={
				!data.length ? (
					localization.selectSomething.t()
				) : isCreatingNewQuote ? (
					<AddToQuoteDialogCreateNewQuote />
				) : (
					<Stack {...addToQuoteDialogStack}>
						<Button
							data-testid="create-a-new-quote"
							id="create-a-new-quote"
							variant="contained"
							onClick={handleNewQuote}
							sx={addToQuoteDialogButtonSX}
							startIcon={<AddCircleOutlined />}
						>
							{localization.createNewQuote.t()}
						</Button>
						<ContentProvider value={contextValue}>
							<QuotesTable dialog={true} />
						</ContentProvider>
					</Stack>
				)
			}
			actions={
				<>
					<Button
						id="cancel-dialog"
						data-testid="cancel-dialog"
						variant="outlined"
						onClick={handleCancel}
					>
						{localization.cancel.t()}
					</Button>
					{data.length ? (
						<OneClick
							id="save-action"
							data-testid="save-action"
							variant="contained"
							onClick={isCreatingNewQuote ? onDraft : handleSave}
						>
							{localization.save.t()}
						</OneClick>
					) : null}
				</>
			}
		/>
	) : null;
};
