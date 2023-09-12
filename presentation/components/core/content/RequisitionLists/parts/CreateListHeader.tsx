/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { IconLabel } from '@/components/blocks/IconLabel';
import { requisitionListsAccordionIconSX } from '@/components/content/RequisitionLists/styles/accordionIcon';
import { useLocalization } from '@/data/Localization';
import { Add } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { FC } from 'react';

export const RequisitionListCreateListHeader: FC = () => {
	const CreateRLIcon = <Add color="primary" sx={requisitionListsAccordionIconSX} />;
	const { CreateNewRequisitionList } = useLocalization('RequisitionLists');
	return (
		<IconLabel
			icon={CreateRLIcon}
			label={<Typography variant="h5">{CreateNewRequisitionList.t()}</Typography>}
		/>
	);
};
