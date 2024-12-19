/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { FileUpload } from '@/components/blocks/FileUpload';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/utils/floatingPoint';
import { type FC, ReactNode, useContext, useMemo } from 'react';
import type { Accept } from 'react-dropzone';

type Props = {
	accept?: Accept;
	hint?: ReactNode;
};
export const QuoteCreateEditFileUpload: FC<Props> = ({ accept, hint }) => {
	const localization = useLocalization('Quotes');
	const { dataFileStatus, handleFileUploadChange } = useContext(ContentContext) as ReturnType<
		typeof useQuoteCreateEdit
	>;

	const disabledStatus = useMemo(() => {
		const status = dFix(dataFileStatus?.contents?.at(0)?.status ?? -1, 0);
		return status === 0 || status === 1;
	}, [dataFileStatus]);

	return (
		<FileUpload
			buttonText={localization.SelectFile.t()}
			onFilesChanged={handleFileUploadChange}
			accept={accept}
			disabled={disabledStatus}
			hint={hint}
		/>
	);
};
