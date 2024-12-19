/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ExpectedDateDialog } from '@/components/blocks/ExpectedDateDialog';
import { Linkable } from '@/components/blocks/Linkable';
import { OneClick } from '@/components/blocks/OneClick';
import { orderItemTableV2SingleLineTextSX } from '@/components/content/OrderItemTableV2/styles/singleLineText';
import { useExpectedDate } from '@/data/Content/ExpectedDate';
import { ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { OrderTableData } from '@/data/types/OrderItemTableV2';
import type { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import type { ExpectedDateDialogContextValueType } from '@/data/types/ScheduleForLater';
import { Typography } from '@mui/material';
import { FC, useCallback, useMemo, useState } from 'react';

type Props = {
	date?: string;
	isDelivery: boolean;
	availability: ProductAvailabilityData;
	quantity: number;
	onExpectedDateChange: OrderTableData['itemDetails']['onExpectedDateChange'];
};

export const OrderItemTableV2EditExpectedDate: FC<Props> = ({
	date = '',
	isDelivery,
	availability,
	quantity,
	onExpectedDateChange,
}) => {
	const localization = useLocalization('ExpectedDateDialog');
	const [dialogOpen, setDialogOpen] = useState(false);
	const useExpectedDateValue = useExpectedDate({ date, isScheduleForLaterEnabled: !!date });
	const { scheduled, errorTimePicker } = useExpectedDateValue;
	const onDialog = useCallback(() => setDialogOpen((prev) => !prev), []);
	const onConfirm = useCallback(async () => {
		if (!errorTimePicker) {
			await onExpectedDateChange(quantity, scheduled);
			onDialog();
		}
	}, [errorTimePicker, onDialog, onExpectedDateChange, quantity, scheduled]);

	const contextValue: ExpectedDateDialogContextValueType = useMemo(
		() => ({
			...useExpectedDateValue,
			dialogOpen,
			onDialog,
			onConfirm,
			isDelivery,
			availability,
			isDialogForCart: true,
		}),
		[useExpectedDateValue, dialogOpen, onDialog, onConfirm, isDelivery, availability]
	);

	return (
		<>
			<Linkable type="link">
				<OneClick variant="inline" onClick={onDialog}>
					<Typography
						variant="body2"
						data-testid="edit-expected-date-label"
						sx={orderItemTableV2SingleLineTextSX}
					>
						{localization.Edit.t()}
					</Typography>
				</OneClick>
			</Linkable>
			{dialogOpen ? (
				<ContentProvider value={contextValue}>
					<ExpectedDateDialog />
				</ContentProvider>
			) : null}
		</>
	);
};
