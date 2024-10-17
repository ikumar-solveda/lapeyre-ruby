/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { requisitionListsCreateListDetailsSX } from '@/components/content/RequisitionLists/styles/createListDetails';
import { requisitionListsFileDisplaySX } from '@/components/content/RequisitionLists/styles/fileDisplay';
import { requisitionListsFileUploadStack } from '@/components/content/RequisitionLists/styles/fileUploadStack';
import { requisitionListsUploadFileNameTypographySX } from '@/components/content/RequisitionLists/styles/uploadFileNameTypography';
import { requisitionListsUploadListDetailsStack } from '@/components/content/RequisitionLists/styles/uploadListDetailsStack';
import {
	initialUploadInputValues,
	useRequisitionListsFileUpload,
} from '@/data/Content/RequisitionListsFileUpload';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { REQUISITION_LIST } from '@/data/constants/requisitionLists';
import { REG_EX } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import { Button, Link, Stack, StackProps, TextField, Typography } from '@mui/material';
import { FC, FormEvent, useCallback } from 'react';

export const RequisitionListsUploadListDetails: FC = () => {
	const { onUpload } = useRequisitionListsFileUpload();
	const { localeName: locale } = useStoreLocale();
	const {
		settings: { storeName },
	} = useSettings();
	const {
		CreateList,
		Browse,
		SelectedFile,
		DownloadInstructionsWithAnExample,
		NewRequisitionName,
		SelectUploadFile,
		InvalidListName,
	} = useLocalization('RequisitionLists');

	const { values, error, handleInputChange, formRef, handleSubmit, submitting, resetForm } =
		useForm(initialUploadInputValues);

	const onSubmit = useCallback(
		async (values: typeof initialUploadInputValues, event?: FormEvent<HTMLFormElement>) => {
			await onUpload(values, event);
			resetForm();
		},
		[onUpload, resetForm]
	);

	return (
		<Stack
			{...(requisitionListsUploadListDetailsStack as StackProps<any>)}
			component="form"
			ref={formRef}
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<Stack {...requisitionListsFileUploadStack}>
				<Button
					data-testid={`${REQUISITION_LIST}-file-browsing`}
					id={`${REQUISITION_LIST}-file-browsing`}
					variant="contained"
					component="label"
					aria-required
				>
					{Browse.t()}
					<input
						name="file"
						required
						type="file"
						accept=".csv"
						value={values.file.value}
						onChange={handleInputChange}
						hidden
					/>
				</Button>
				<Stack sx={requisitionListsFileDisplaySX}>
					{error.file ? (
						<Typography color="error">{SelectUploadFile.t()}</Typography>
					) : (
						<Typography sx={requisitionListsUploadFileNameTypographySX}>
							{SelectedFile.t({
								file: values.file.files ? values.file.files[0]?.name : EMPTY_STRING,
							})}
						</Typography>
					)}
				</Stack>
			</Stack>

			<Link
				href={`/${storeName}/upload-requisition-lists-instructions/${locale}/file-upload-instructions.pdf`}
				target="_blank"
				download
			>
				<Typography>{DownloadInstructionsWithAnExample.t()}</Typography>
			</Link>

			<TextField
				fullWidth
				id={`${REQUISITION_LIST}-upload-file-name`}
				data-testid={`${REQUISITION_LIST}-upload-file-name`}
				name="name"
				value={values.name}
				label={
					<Typography component="span" sx={requisitionListsCreateListDetailsSX}>
						{NewRequisitionName.t()}
					</Typography>
				}
				inputProps={{
					maxLength: 128,
					pattern: REG_EX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.source,
				}}
				onChange={handleInputChange}
				placeholder={NewRequisitionName.t()}
				error={error.name}
				helperText={error.name ? InvalidListName.t() : EMPTY_STRING}
			/>
			<Stack>
				<Button
					variant="contained"
					data-testid={`${REQUISITION_LIST}-upload`}
					id={`${REQUISITION_LIST}-upload`}
					disabled={submitting}
					type="submit"
				>
					{CreateList.t()}
				</Button>
			</Stack>
		</Stack>
	);
};
