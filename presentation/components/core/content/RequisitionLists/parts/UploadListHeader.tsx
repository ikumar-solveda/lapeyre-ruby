/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { IconLabel } from '@/components/blocks/IconLabel';
import { requisitionListsAccordionIconSX } from '@/components/content/RequisitionLists/styles/accordionIcon';
import { useLocalization } from '@/data/Localization';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Typography } from '@mui/material';
import { FC } from 'react';

export const RequisitionListsUploadListHeader: FC = () => {
	const UploadRLIcon = <CloudUploadIcon color="primary" sx={requisitionListsAccordionIconSX} />;
	const { UploadRequisitionList } = useLocalization('RequisitionLists');
	return (
		<IconLabel
			icon={UploadRLIcon}
			label={<Typography variant="h5">{UploadRequisitionList.t()}</Typography>}
		/>
	);
};
