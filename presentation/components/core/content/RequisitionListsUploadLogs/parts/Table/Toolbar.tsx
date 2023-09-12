/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { requisitionListsUploadLogsTableToolbarStack } from '@/components/content/RequisitionListsUploadLogs/styles/toolbar';
import { useRequisitionListsViewUploadLogs } from '@/data/Content/RequisitionListsViewUploadLogs';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { Close, Refresh, Search } from '@mui/icons-material';
import { IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
import { debounce } from 'lodash';
import { Dispatch, FC, SetStateAction, useCallback, useMemo, useRef } from 'react';

export const RequisitionListsUploadLogsTableToolbar: FC<{
	setGlobalFilter: Dispatch<SetStateAction<string>>;
	mutate: ReturnType<typeof useRequisitionListsViewUploadLogs>['mutateRequisitionListsViewLogs'];
}> = ({ setGlobalFilter, mutate }) => {
	const { search, Refresh: refreshLabel } = useLocalization('RequisitionLists');
	const ref = useRef<HTMLInputElement>(null);

	const onChange = useMemo(
		() =>
			debounce((event: React.ChangeEvent<HTMLInputElement>) => {
				setGlobalFilter(event.target.value ?? EMPTY_STRING);
			}, 500),
		[setGlobalFilter]
	);

	const refresh = useCallback(async () => {
		if (ref.current) {
			ref.current.value = EMPTY_STRING;
		}
		setGlobalFilter(EMPTY_STRING);
		await mutate();
	}, [setGlobalFilter, mutate]);

	const onClose = useCallback(() => {
		setGlobalFilter(EMPTY_STRING);
		if (ref.current) {
			ref.current.value = EMPTY_STRING;
		}
	}, [setGlobalFilter]);

	return (
		<Stack {...requisitionListsUploadLogsTableToolbarStack}>
			<TextField
				inputRef={ref}
				id="view-upload-log-search-input"
				data-testid="view-upload-log-search-input"
				autoFocus
				type="text"
				name="searchRL"
				placeholder={search.t()}
				onChange={onChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Search />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={onClose}
								id="table-actions-icon-button"
								data-testid="table-actions-icon-button"
							>
								<Close />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<IconButton
				color="secondary"
				onClick={refresh}
				data-testid="view-upload-log-refresh-icon-button"
				id="view-upload-log-refresh-icon-button"
			>
				<Tooltip title={refreshLabel.t()}>
					<Refresh />
				</Tooltip>
			</IconButton>
		</Stack>
	);
};
