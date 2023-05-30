/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { Attachment } from '@/data/types/Product';
import { Stack, Typography } from '@mui/material';
import { AttachmentIcon } from '@/components/blocks/Attachment/parts/Icon';
import { attachmentCardContentSX } from '@/components/blocks/Attachment/styles/cardContent';

export const AttachmentContent: FC<Attachment> = ({ name, mimeType }) => (
	<Stack spacing={1} sx={attachmentCardContentSX}>
		<Typography variant="body2" display="block">
			{`${name}`}
		</Typography>
		<Typography variant="body2" color="textSecondary" component="p">
			<AttachmentIcon fileExtension={mimeType} />
		</Typography>
	</Stack>
);
