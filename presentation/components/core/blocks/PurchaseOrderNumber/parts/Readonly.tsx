/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IconLabel } from '@/components/blocks/IconLabel';
import { purchaseOrderNumberReadOnlySX } from '@/components/blocks/PurchaseOrderNumber/styles/readOnly';
import { useLocalization } from '@/data/Localization';
import DescriptionIcon from '@mui/icons-material/Description';
import { Stack } from '@mui/material';
import { FC } from 'react';

export const PurchaseOrderNumberReadonly: FC<{ poNumber?: string }> = ({ poNumber }) => {
	const PurchaseOrderNumberNLS = useLocalization('PurchaseOrderNumber');
	return poNumber ? (
		<Stack sx={purchaseOrderNumberReadOnlySX}>
			<IconLabel
				icon={<DescriptionIcon />}
				label={PurchaseOrderNumberNLS.Labels.display.t({ poNumber })}
			/>
		</Stack>
	) : null;
};
