/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { OneClick } from '@/components/blocks/OneClick';
import { useSaveForLater } from '@/data/Content/SaveForLaterList';
import { useLocalization } from '@/data/Localization';
import { Typography } from '@mui/material';
import { FC } from 'react';

export const SaveForLaterTableDeleteAll: FC = () => {
	const localization = useLocalization('SaveForLaterTable');

	const { onDeleteAll } = useSaveForLater();

	return (
		<Linkable type="link">
			<OneClick variant="inline" onClick={onDeleteAll}>
				<Typography variant="body2" data-testid="delete-all-from-cart">
					{localization.Labels.DeleteAll.t()}
				</Typography>
			</OneClick>
		</Linkable>
	);
};
