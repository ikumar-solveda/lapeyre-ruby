/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { RequisitionListsAccordionParts } from '@/components/content/RequisitionLists/parts/AccordionParts';
import { RequisitionListCreateListDetails } from '@/components/content/RequisitionLists/parts/CreateListDetails';
import { RequisitionListCreateListHeader } from '@/components/content/RequisitionLists/parts/CreateListHeader';
import { RequisitionListsUploadListDetails } from '@/components/content/RequisitionLists/parts/UploadListDetails';
import { RequisitionListsUploadListHeader } from '@/components/content/RequisitionLists/parts/UploadListHeader';
import { requisitionListsFileUploadStack } from '@/components/content/RequisitionLists/styles/fileUploadStack';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { Grid, Stack, Typography } from '@mui/material';
import { FC, useCallback, useState } from 'react';

export const RequisitionLists: FC<{ id: ID }> = () => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const { Title } = useLocalization('RequisitionLists');
	const { spacing } = requisitionListsFileUploadStack;

	const toggleExpand = useCallback(() => {
		setExpanded((prev) => !prev);
	}, []);

	return (
		<Stack gap={spacing}>
			<Typography variant="h3">{Title.t()}</Typography>
			<Grid container spacing={spacing}>
				<Grid item xs={12} md={6}>
					<RequisitionListsAccordionParts
						id="create-list"
						header={<RequisitionListCreateListHeader />}
						details={<RequisitionListCreateListDetails {...{ toggleExpand }} />}
						{...{ expanded, toggleExpand }}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<RequisitionListsAccordionParts
						id="upload-list"
						header={<RequisitionListsUploadListHeader />}
						details={<RequisitionListsUploadListDetails />}
					/>
				</Grid>
			</Grid>
		</Stack>
	);
};
