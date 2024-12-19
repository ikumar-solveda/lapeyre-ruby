/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { attachmentCardActionsSX } from '@/components/blocks/Attachment/styles/cardActions';
import { attachmentCardActionsButtonSX } from '@/components/blocks/Attachment/styles/cardActionsButton';
import { TypeIcon } from '@/components/blocks/TypeIcon';
import { useLocalization } from '@/data/Localization';
import { Attachment } from '@/data/types/Product';
import { GetAppRounded } from '@mui/icons-material';
import { Button, CardActions } from '@mui/material';
import { kebabCase } from 'lodash';
import { FC, useMemo } from 'react';

export const AttachmentFooter: FC<Attachment> = ({ name, attachmentAssetPath, mimeType }) => {
	const filesNLS = useLocalization('Files');
	const extension = useMemo(() => `${mimeType}`.toUpperCase().split('/')?.at(-1) ?? '', [mimeType]);

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

			<TypeIcon name={extension} />
		</CardActions>
	);
};
