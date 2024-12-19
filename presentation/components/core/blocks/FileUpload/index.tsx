/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { FileDisplay } from '@/components/blocks/FileUpload/parts/FileDisplay';
import { fileUploadDropZoneButtonSX } from '@/components/blocks/FileUpload/styles/button';
import { fileUploadDropZoneCloudUploadIconSX } from '@/components/blocks/FileUpload/styles/cloudUploadIcon';
import { fileUploadDropZoneRootSX } from '@/components/blocks/FileUpload/styles/dropZoneRoot';
import { fileUploadFileStackSX } from '@/components/blocks/FileUpload/styles/fileStack';
import { useLocalization } from '@/data/Localization';
import { CloudUploadOutlined } from '@mui/icons-material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { DropEvent, DropzoneOptions, FileWithPath, useDropzone } from 'react-dropzone';

type Props = DropzoneOptions & {
	hint?: ReactNode;
	prompt?: ReactNode;
	buttonText?: ReactNode;
	onFilesChanged?: (files: FileWithPath[]) => void;
};

export const FileUpload = (props: Props) => {
	const fileUploadNLS = useLocalization('FileUpload');
	const {
		onDropAccepted: onDropAcceptedParent,
		onFilesChanged,
		maxFiles = 1,
		prompt,
		hint,
		buttonText,
		disabled = false,
		...rest
	} = props;
	const hasButton = !!buttonText;
	const promptText = useMemo(
		() => (prompt || hasButton ? fileUploadNLS.promptWithButton.t() : fileUploadNLS.prompt.t()),
		[fileUploadNLS.prompt, fileUploadNLS.promptWithButton, hasButton, prompt]
	);

	const [files, setFiles] = useState<FileWithPath[]>([]);
	const onDropAccepted = useCallback(
		(incomingFiles: FileWithPath[], event: DropEvent) => {
			onDropAcceptedParent && onDropAcceptedParent(incomingFiles, event);
			setFiles((prev) => {
				const prePaths = prev.map(({ path }) => path).filter(Boolean);
				return [...prev, ...incomingFiles.filter((f) => !prePaths.includes(f.path))].slice(
					-maxFiles
				);
			});
		},
		[maxFiles, onDropAcceptedParent]
	);

	const onDelete = useCallback(
		(index: number) => () => {
			setFiles((prev) => prev.toSpliced(index, 1));
		},
		[]
	);

	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		onDropAccepted,
		noClick: hasButton,
		maxFiles,
		disabled,
		...rest,
	});
	const rootProps = useMemo(() => getRootProps({ className: 'dropzone' }), [getRootProps]);
	const inputProps = useMemo(() => getInputProps(), [getInputProps]);

	useEffect(() => {
		onFilesChanged && onFilesChanged(files);
	}, [files, onFilesChanged]);

	useEffect(() => () => setFiles([]), []);

	return (
		<Stack gap={2}>
			<Stack
				id="file-upload-drop-zone-root"
				data-testid="file-upload-drop-zone-root"
				alignItems="center"
				justifyContent="center"
				gap={2}
				sx={fileUploadDropZoneRootSX({ isDragActive })}
				{...rootProps}
			>
				<Input inputProps={inputProps} sx={{ display: 'none' }} />
				<CloudUploadOutlined sx={fileUploadDropZoneCloudUploadIconSX} color="primary" />
				<Typography variant="body1">{promptText}</Typography>
				{hint ? (
					<Typography variant="caption" color="text.disabled">
						{hint}
					</Typography>
				) : null}
				{hasButton ? (
					<Button
						id="upload-file-button"
						data-testid="upload-file-button"
						variant="outlined"
						onClick={open}
						sx={fileUploadDropZoneButtonSX}
						disabled={disabled}
					>
						{buttonText}
					</Button>
				) : null}
			</Stack>
			{files.map((file, index) => (
				<Stack
					key={file.path}
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					sx={fileUploadFileStackSX}
				>
					<FileDisplay file={file} />
					<IconButton
						id={`delete-file-${index}`}
						data-testid={`delete-file-${index}`}
						onClick={onDelete(index)}
						color="primary"
						title={fileUploadNLS.delete.t({ fileName: file.name })}
					>
						<DeleteOutline />
					</IconButton>
				</Stack>
			))}
		</Stack>
	);
};
