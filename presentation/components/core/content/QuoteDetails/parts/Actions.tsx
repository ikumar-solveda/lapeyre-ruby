/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import type { useQuoteDetails } from '@/data/Content/QuoteDetails';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { DIALOG_STATES, State } from '@/data/constants/quotes';
import { ContentContext } from '@/data/context/content';
import type { QuoteDialogStateType } from '@/data/types/Quote';
import { Switch } from '@/utils/switch';
import { type FC, useCallback, useContext } from 'react';

export const QuoteDetailsActions: FC = () => {
	const nls = useLocalization('QuoteActions');
	const routes = useLocalization('Routes');
	const quoteContent = useContext(ContentContext) as ReturnType<typeof useQuoteDetails>;
	const { quoteById, setDialogState, openDialog } = quoteContent;
	const router = useNextRouter();
	const onModify = useCallback(() => {
		router.push({ pathname: routes.QuoteCreateEdit.route.t(), query: { quoteId: quoteById?.id } });
	}, [quoteById, router, routes]);

	const onDialog = useCallback(
		(dialogState: QuoteDialogStateType) => async () => {
			setDialogState(dialogState);
			openDialog();
		},
		[openDialog, setDialogState]
	);

	return (
		<>
			{Switch(quoteById?.status)
				.case(State.DRAFT, () => (
					<>
						<OneClick variant="contained" color="primary" onClick={onDialog(DIALOG_STATES.SUBMIT)}>
							{nls.Submit.t()}
						</OneClick>
						<OneClick onClick={onModify} variant="outlined" color="secondary">
							{nls.Modify.t()}
						</OneClick>
						<OneClick variant="outlined" color="secondary" onClick={onDialog(DIALOG_STATES.DELETE)}>
							{nls.Delete.t()}
						</OneClick>
					</>
				))
				.case(State.PENDING, () => (
					<OneClick variant="contained" color="primary" onClick={onDialog(DIALOG_STATES.CANCEL)}>
						{nls.Cancel.t()}
					</OneClick>
				))
				.case(State.READY, () => (
					<>
						<OneClick variant="contained" color="primary" onClick={onDialog(DIALOG_STATES.ACCEPT)}>
							{nls.Accept.t()}
						</OneClick>
						<OneClick
							variant="outlined"
							color="secondary"
							onClick={onDialog(DIALOG_STATES.DECLINE)}
						>
							{nls.Decline.t()}
						</OneClick>
						<OneClick variant="outlined" color="secondary" onClick={onDialog(DIALOG_STATES.CANCEL)}>
							{nls.Cancel.t()}
						</OneClick>
					</>
				))
				.case(State.ACCEPTED, () => null)
				.case(State.DECLINED, () => null)
				.case(State.CANCELED, () => null)
				.case(State.EXPIRED, () => null)
				.defaultTo(() => null)}
		</>
	);
};
