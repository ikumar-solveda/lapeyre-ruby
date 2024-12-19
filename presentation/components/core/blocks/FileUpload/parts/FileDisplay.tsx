/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TypeIcon } from '@/components/blocks/TypeIcon';
import { getFileSize } from '@/utils/getFileSize';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import { FileWithPath } from 'react-dropzone/.';

export const FileDisplay = ({ file }: { file: FileWithPath }) => {
	const { name, size } = file;
	const sizeKB = useMemo(() => getFileSize(size), [size]);
	return (
		<Stack direction="row" gap={1} alignItems="flex-start">
			<TypeIcon name={name} />
			<Stack>
				<Typography variant="body2">{name}</Typography>
				<Typography color="text.disabled">{sizeKB}</Typography>
			</Stack>
		</Stack>
	);
};
