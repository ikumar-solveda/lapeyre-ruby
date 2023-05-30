/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { AttachmentFooter } from '@/components/blocks/Attachment/parts/Footer';
import { Attachment as AttachmentType } from '@/data/types/Product';
import { Grid } from '@mui/material';
import { Card } from '@/components/blocks/Card';
import { AttachmentContent } from '@/components/blocks/Attachment/parts/Content';
import { attachmentContainerSX } from '@/components/blocks/Attachment/styles/container';

type Props = {
	attachments: AttachmentType[];
};

export const Attachment: FC<Props> = ({ attachments }) => (
	<Grid container spacing={2} sx={attachmentContainerSX}>
		{attachments.map((attachment) => (
			<Grid key={attachment.attachmentAssetID} item xs={12} sm={4} md={3}>
				<Card
					testId={attachment.attachmentAssetID}
					cardMain={<AttachmentContent {...attachment} />}
					cardFooter={<AttachmentFooter {...attachment} />}
				/>
			</Grid>
		))}
	</Grid>
);
