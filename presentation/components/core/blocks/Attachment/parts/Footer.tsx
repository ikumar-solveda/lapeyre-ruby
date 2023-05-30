/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { Button, CardActions, Typography } from '@mui/material';
import { GetAppRounded } from '@mui/icons-material';
import { kebabCase } from 'lodash';
import { attachmentCardActionsSX } from '@/components/blocks/Attachment/styles/cardActions';
import { Attachment } from '@/data/types/Product';
import { attachmentCardActionsButtonSX } from '@/components/blocks/Attachment/styles/cardActionsButton';
import { useLocalization } from '@/data/Localization';

export const AttachmentFooter: FC<Attachment> = ({ name, attachmentAssetPath, mimeType }) => {
	const filesNLS = useLocalization('Files');
	return (
		<CardActions sx={attachmentCardActionsSX}>
			<Button
				data-testid={`product-attachment-${kebabCase(name)}`}
				id={`product-attachment-${kebabCase(name)}`}
				color="secondary"
				size="small"
				variant="text"
				href={`${attachmentAssetPath}`}
				download={`${name}`}
				sx={attachmentCardActionsButtonSX}
				aria-label={`${filesNLS.Download.t()} ${name}`}
			>
				<GetAppRounded />
			</Button>
			<Typography color="textSecondary">
				{'.'}
				{`${mimeType}`.toUpperCase().split('/')[1]}
			</Typography>
		</CardActions>
	);
};
