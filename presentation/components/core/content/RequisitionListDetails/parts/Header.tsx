/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { Linkable } from '@/components/blocks/Linkable';
import { RequisitionListDetailsSummary } from '@/components/content/RequisitionListDetails/parts/Summary';
import { RequisitionListDetailsUpdateForm } from '@/components/content/RequisitionListDetails/parts/UpdateForm';
import { requisitionListDetailsHeaderSX } from '@/components/content/RequisitionListDetails/styles/header';
import { requisitionListDetailsHeaderEditButtonSX } from '@/components/content/RequisitionListDetails/styles/headerEditButton';
import { requisitionListDetailsHeaderOrderDescriptionTypographySX } from '@/components/content/RequisitionListDetails/styles/headerOrderDescriptionTypography';
import { useRequisitionListDetails } from '@/data/Content/RequisitionListDetails';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Breadcrumbs, Button, Stack, Typography } from '@mui/material';
import { FC, MouseEvent, useCallback, useContext, useEffect, useState } from 'react';

export const RequisitionListDetailsHeader: FC = () => {
	const { RequisitionLists } = useLocalization('Routes');
	const requisitionListsNLS = useLocalization('RequisitionLists');
	const requisitionListItemsNLS = useLocalization('RequisitionListItems');
	const [edit, setEdit] = useState(() => false);
	const { data, readOnly } = useContext(ContentContext) as ReturnType<
		typeof useRequisitionListDetails
	>;
	const {
		x_firstName = '',
		x_lastName = '',
		lastUpdateDate,
		orderStatus = '',
		orderDescription = '',
	} = data ?? {};
	const onEditClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setEdit(true);
	}, []);

	const resetEdit = useCallback(() => setEdit(false), []);

	useEffect(() => {
		setEdit(false);
	}, [data]);

	return (
		<Stack alignItems="flex-start" sx={requisitionListDetailsHeaderSX}>
			<Breadcrumbs aria-label={requisitionListsNLS.Title.t()}>
				<Linkable
					href={RequisitionLists.route.t()}
					id={RequisitionLists.route.t()}
					data-testid={RequisitionLists.route.t()}
				>
					<Typography variant="h3">{requisitionListsNLS.Title.t()}</Typography>
				</Linkable>
				<Typography variant="h4" sx={requisitionListDetailsHeaderOrderDescriptionTypographySX}>
					{orderDescription}
				</Typography>
			</Breadcrumbs>
			{edit ? (
				<RequisitionListDetailsUpdateForm
					{...{ status: orderStatus, name: orderDescription, resetEdit }}
				/>
			) : (
				<>
					<RequisitionListDetailsSummary
						{...{ x_firstName, x_lastName, lastUpdateDate, orderStatus }}
					/>
					{readOnly ? null : (
						<Button
							variant="outlined"
							size="small"
							sx={requisitionListDetailsHeaderEditButtonSX}
							onClick={onEditClick}
							id="button-requisition-list-details-header-edit"
							data-testid="button-requisition-list-details-header-edit"
						>
							{requisitionListItemsNLS.editListDetails.t()}
						</Button>
					)}
				</>
			)}
		</Stack>
	);
};
