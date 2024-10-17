/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { OneClick } from '@/components/blocks/OneClick';
import { SaveForLaterTableRowData } from '@/components/content/SaveForLater/parts/Table';
import { saveForLaterIconColorSX } from '@/components/content/SaveForLater/styles/iconColor';
import { useSaveForLater } from '@/data/Content/SaveForLaterList';
import { useSaveForLaterTableRow } from '@/data/Content/SaveForLaterTableRow';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const SaveForLaterTableActions: FC<{ compact?: boolean }> = ({ compact = false }) => {
	const localization = useLocalization('SaveForLaterTable');
	const { product } = useContext(ContentContext) as SaveForLaterTableRowData &
		ReturnType<typeof useSaveForLaterTableRow>;
	const { partNumber } = product;

	const { onDelete } = useSaveForLater();

	return compact ? (
		<Linkable type="inline" onClick={onDelete(partNumber)}>
			<Typography variant="body2">{localization.Actions.Delete.t()}</Typography>
		</Linkable>
	) : (
		<OneClick wrapper="icon" onClick={onDelete(partNumber)} spin={true} spinSize={24}>
			<DeleteOutlineIcon
				sx={saveForLaterIconColorSX}
				titleAccess={localization.Actions.Delete.t()}
			/>
		</OneClick>
	);
};
