/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { useLocalization } from '@/data/Localization';
import { Breadcrumbs, Typography } from '@mui/material';
import { FC } from 'react';

export const RequisitionListsUploadLogsHeader: FC = () => {
	const { RequisitionLists } = useLocalization('Routes');
	const { Title, UploadLog } = useLocalization('RequisitionLists');
	return (
		<Breadcrumbs aria-label={Title.t()}>
			<Linkable
				type="link"
				href={RequisitionLists.route.t()}
				id={RequisitionLists.route.t()}
				data-testid={RequisitionLists.route.t()}
			>
				<Typography variant="h3">{Title.t()}</Typography>
			</Linkable>
			<Typography variant="h4">{UploadLog.t()}</Typography>
		</Breadcrumbs>
	);
};
