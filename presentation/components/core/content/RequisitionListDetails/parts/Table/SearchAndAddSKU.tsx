/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { NumberInput } from '@/components/blocks/NumberInput';
import { requisitionListDetailsTableSearchAndAddButtonSX } from '@/components/content/RequisitionListDetails/styles/Table/searchAndAddButton';
import { requisitionListDetailsTableSearchAndAddQuantitySX } from '@/components/content/RequisitionListDetails/styles/Table/searchAndAddQuantity';
import { requisitionListDetailsTableSearchAndAddSearchSX } from '@/components/content/RequisitionListDetails/styles/Table/searchAndAddSearch';
import { useRequisitionListDetails } from '@/data/Content/RequisitionListDetails';
import { useLocalization } from '@/data/Localization';
import { REQUISITION_LIST_DETAILS_TABLE } from '@/data/constants/requisitionLists';
import { ContentContext } from '@/data/context/content';
import { RequisitionListSearchAndAddValue } from '@/data/types/RequisitionLists';
import { ProductSuggestionEntry } from '@/data/types/SiteContentSuggestion';
import { FormState, useForm } from '@/utils/useForm';
import {
	Autocomplete,
	AutocompleteChangeReason,
	AutocompleteInputChangeReason,
	Button,
	Stack,
	TextField,
} from '@mui/material';
import { debounce } from 'lodash';
import { FormEvent, SyntheticEvent, useCallback, useContext, useMemo, useState } from 'react';

const initialValue: RequisitionListSearchAndAddValue = {
	product: null as ProductSuggestionEntry | null,
	quantity: null as null | number,
};

export const RequisitionListDetailsTableSearchAndAddSKU = () => {
	const requisitionListDetailsNLS = useLocalization('RequisitionLists');
	const {
		values,
		handleSubmit,
		formRef,
		error,
		handleAutoCompleteChange,
		onNamedValueChange,
		resetForm,
		submitting,
	} = useForm(initialValue) as FormState<RequisitionListSearchAndAddValue> & {
		resetForm: () => void;
		handleAutoCompleteChange: (
			name: 'product'
		) => (
			_event: React.SyntheticEvent,
			value: ProductSuggestionEntry | null,
			_reason: AutocompleteChangeReason
		) => void;
	};

	const { fetchPartNumberSuggestion, onSKUAdd } = useContext(ContentContext) as ReturnType<
		typeof useRequisitionListDetails
	>;
	const [options, setOptions] = useState<ProductSuggestionEntry[]>([]);
	const getOptionSelected = useCallback(
		(option: ProductSuggestionEntry, value: ProductSuggestionEntry) =>
			option.uniqueID === value.uniqueID,
		[]
	);
	const getOptionLabel = useCallback(
		(option: ProductSuggestionEntry) => `${option.partNumber} ${option.name}`,
		[]
	);
	// do not filter, already filtered by service
	const filterOptions = useCallback((opts: ProductSuggestionEntry[]) => opts, []);
	const onQuantityInputChange = useCallback(
		(value: number | null) => {
			onNamedValueChange('quantity', value);
		},
		[onNamedValueChange]
	);
	const onSearchInputChange = useMemo(
		() =>
			debounce(
				async (
					_event: SyntheticEvent,
					searchTerm: string,
					reason: AutocompleteInputChangeReason
				) => {
					if (reason === 'input' && searchTerm) {
						const options = await fetchPartNumberSuggestion({ searchTerm });
						setOptions(options ?? []);
					} else if (reason === 'clear') {
						setOptions([]);
					} else if (reason === 'reset') {
						onNamedValueChange('quantity', null);
						setOptions([]);
					}
				},
				300
			),
		[fetchPartNumberSuggestion, onNamedValueChange]
	);

	const onSubmit = async (
		values: RequisitionListSearchAndAddValue,
		_event?: FormEvent<HTMLFormElement>
	) => {
		await onSKUAdd(values, _event);
		resetForm();
	};
	return (
		<Stack
			component="form"
			direction="row"
			flexWrap="wrap"
			ref={formRef}
			gap={1}
			noValidate
			onSubmit={handleSubmit(onSubmit)}
		>
			<Autocomplete
				id={`${REQUISITION_LIST_DETAILS_TABLE}-search-and-add-sku`}
				onChange={handleAutoCompleteChange('product')}
				onInputChange={onSearchInputChange}
				isOptionEqualToValue={getOptionSelected}
				getOptionLabel={getOptionLabel}
				noOptionsText={requisitionListDetailsNLS.NoSKUFound.t()}
				options={options}
				filterOptions={filterOptions}
				value={values.product}
				disablePortal
				renderInput={({ inputProps, ...params }) => (
					<TextField
						required
						name="product"
						inputProps={{
							...inputProps,
							'data-testid': `${REQUISITION_LIST_DETAILS_TABLE}-search-and-add-sku`,
						}}
						{...params}
						error={error.product}
						placeholder={requisitionListDetailsNLS.SKUSearch.t()}
					/>
				)}
				sx={requisitionListDetailsTableSearchAndAddSearchSX}
			/>
			<NumberInput
				id={`${REQUISITION_LIST_DETAILS_TABLE}-search-and-add-quantity`}
				data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-search-and-add-quantity`}
				onChange={onQuantityInputChange}
				value={values.quantity}
				name="quantity"
				min={1}
				disallowEmptyOnBlur={true}
				placeholder={requisitionListDetailsNLS.Quantity.t()}
				error={error.quantity}
				sx={requisitionListDetailsTableSearchAndAddQuantitySX}
				required
			/>
			<Button
				variant="contained"
				type="submit"
				disabled={submitting}
				id="button-requisition-list-details-table-search-and-add"
				data-testid="button-requisition-list-details-table-search-and-add"
				sx={requisitionListDetailsTableSearchAndAddButtonSX}
			>
				{requisitionListDetailsNLS.Add.t()}
			</Button>
		</Stack>
	);
};
