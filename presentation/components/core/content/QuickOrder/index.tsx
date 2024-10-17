/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { OneClick } from '@/components/blocks/OneClick';
import { quickOrderActionsStack } from '@/components/content/QuickOrder/styles/actionsStack';
import { quickOrderButtonSX } from '@/components/content/QuickOrder/styles/button';
import { quickOrderFieldSX } from '@/components/content/QuickOrder/styles/field';
import { quickOrderInnerStack } from '@/components/content/QuickOrder/styles/innerStack';
import { getOptionLabel, quickOrderInitialValue, useQuickOrder } from '@/data/Content/QuickOrder';
import { useLocalization } from '@/data/Localization';
import {
	PART_NUMBER_MAX_LENGTH,
	QUANTITY_FIELD_MAX_LENGTH,
	QUICK_ORDER_MAX_VALUES,
} from '@/data/constants/order';
import { ID } from '@/data/types/Basic';
import { ProductSuggestionEntry } from '@/data/types/SiteContentSuggestion';
import { Switch } from '@/utils/switch';
import { FormState, useForm } from '@/utils/useForm';
import { Autocomplete, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { FC, FormEvent, useCallback, useEffect } from 'react';

export const QuickOrder: FC<{ id: ID }> = () => {
	const labels = useLocalization('QuickOrder');
	const {
		options,
		onSubmit,
		onSearchInputChange,
		isOptionEqualToValue,
		maxValues,
		setPartNumbers,
		onAddMore,
		onResetValues,
		showOrderButton,
		redirectToLoginIfNeed,
	} = useQuickOrder();
	const {
		values,
		handleSubmit,
		formRef,
		error,
		handleAutoCompleteChange,
		onNamedValueChange,
		resetForm,
		submitting,
	} = useForm(quickOrderInitialValue) as FormState<typeof quickOrderInitialValue>;

	const onSKU = useCallback(
		(index: number) => {
			const handler = handleAutoCompleteChange as NonNullable<typeof handleAutoCompleteChange>;
			return handler(`line${index}Item`);
		},
		[handleAutoCompleteChange]
	);

	const onQuantity = useCallback(
		(index: number) => (value: number | null) => {
			onNamedValueChange(`line${index}Qty`, value ? `${value}` : null);
		},
		[onNamedValueChange]
	);

	const onResetForm = useCallback(
		(_event: FormEvent) => {
			onResetValues();
			resetForm();
		},
		[onResetValues, resetForm]
	);

	// update the partNumbers array that fetches inventory
	useEffect(() => {
		setPartNumbers(() =>
			Array.from({ length: maxValues })
				.map((_, index) => (values[`line${index}Item`] as ProductSuggestionEntry)?.partNumber)
				.filter(Boolean)
				.join(',')
		);
	}, [maxValues, setPartNumbers, values]);

	return (
		<Stack spacing={2}>
			<Typography variant="h3">{labels.Title.t()}</Typography>
			<Paper>
				<Stack
					padding={2}
					spacing={3}
					component="form"
					ref={formRef}
					noValidate
					onSubmit={handleSubmit(onSubmit)}
					onReset={onResetForm}
				>
					<Typography>{labels.Description.t()}</Typography>
					{Array.from({ length: maxValues }).map((_, index) => (
						<Stack key={index} {...quickOrderInnerStack}>
							<Autocomplete
								forcePopupIcon={false}
								id={`quick-order-sku-${index}`}
								value={values[`line${index}Item`] as ProductSuggestionEntry}
								onChange={onSKU(index)}
								onInputChange={onSearchInputChange(index)}
								getOptionLabel={getOptionLabel}
								isOptionEqualToValue={isOptionEqualToValue}
								options={(options[`line${index}Options`] as ProductSuggestionEntry[]) ?? []}
								noOptionsText={labels.NoSKUFound.t()}
								disablePortal
								disabled={!showOrderButton}
								sx={quickOrderFieldSX}
								renderInput={({ inputProps, ...params }) => (
									<TextField
										required={!!values[`line${index}Qty`]}
										name={`line${index}Item`}
										inputProps={{
											...inputProps,
											maxLength: PART_NUMBER_MAX_LENGTH,
											'data-testid': `quick-order-sku-${index}`,
										}}
										{...params}
										error={error[`line${index}Item`]}
										placeholder={labels.SKU.t()}
									/>
								)}
							/>
							<NumberInput
								required={!!values[`line${index}Item`]}
								id={`quick-order-qty-${index}`}
								data-testid={`quick-order-qty-${index}`}
								name={`line${index}Qty`}
								value={values[`line${index}Qty`] as string}
								placeholder={labels.Quantity.t()}
								onChange={onQuantity(index)}
								error={error[`line${index}Qty`]}
								min={1}
								sx={quickOrderFieldSX}
								maxLength={QUANTITY_FIELD_MAX_LENGTH}
								disabled={!showOrderButton}
							/>
						</Stack>
					))}
					{Switch(showOrderButton)
						.case(true, () => (
							<>
								<Stack {...quickOrderActionsStack}>
									<Button
										variant="contained"
										sx={quickOrderButtonSX}
										data-testid="button-quick-order"
										id="button-quick-order"
										onClick={onAddMore}
										disabled={maxValues === QUICK_ORDER_MAX_VALUES || submitting}
									>
										{labels.AddMore.t()}
									</Button>
								</Stack>
								<Stack {...quickOrderActionsStack}>
									<Button
										variant="contained"
										sx={quickOrderButtonSX}
										data-testid="button-quick-order"
										id="button-quick-order"
										type="submit"
										disabled={submitting}
									>
										{labels.OrderButton.t()}
									</Button>
									<Button
										variant="outlined"
										sx={quickOrderButtonSX}
										data-testid="button-quick-order-reset-form"
										id="button-quick-order-reset-form"
										type="reset"
										disabled={submitting}
									>
										{labels.Reset.t()}
									</Button>
								</Stack>
							</>
						))
						.case(false, () => (
							<Stack {...quickOrderActionsStack}>
								<OneClick
									variant="contained"
									sx={quickOrderButtonSX}
									data-testid="button-quick-order"
									id="button-quick-order"
									onClick={redirectToLoginIfNeed}
								>
									{labels.SignIn.t()}
								</OneClick>
							</Stack>
						))
						.defaultTo(() => null)}
				</Stack>
			</Paper>
		</Stack>
	);
};
