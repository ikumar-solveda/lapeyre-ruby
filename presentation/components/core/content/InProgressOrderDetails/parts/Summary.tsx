/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { B2B } from '@/components/blocks/B2B';
import { inProgressOrderDetailsSummaryMainStack } from '@/components/content/InProgressOrderDetails/styles/Summary/mainStack';
import { inProgressOrderDetailsSummaryStack } from '@/components/content/InProgressOrderDetails/styles/Summary/stack';
import { inProgressOrderDetailsSummaryTitleSX } from '@/components/content/InProgressOrderDetails/styles/Summary/title';
import { inProgressOrderDetailsSummaryValueSX } from '@/components/content/InProgressOrderDetails/styles/Summary/value';
import { ORDER_TYPE } from '@/data/constants/order';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import type { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

const EMPTY_NAME = { x_firstName: '', x_lastName: '' };

export const InProgressOrderDetailsSummary: FC = () => {
	const { data } = useContext(ContentContext) as ReturnType<typeof useInProgressOrderDetails>;
	const nls = useLocalization('InProgressOrderDetails');
	const dateFormatter = useDateTimeFormat();
	const { x_firstName = '', x_lastName = '' } = data ?? EMPTY_NAME;
	return (
		<Stack spacing={2}>
			<Stack {...inProgressOrderDetailsSummaryMainStack}>
				<Typography variant="h6" sx={inProgressOrderDetailsSummaryTitleSX}>
					{nls.orderDetails.t()}
				</Typography>
				<Stack {...inProgressOrderDetailsSummaryStack}>
					<Typography variant="strong">{nls.orderNumber.t()}</Typography>
					<Typography sx={inProgressOrderDetailsSummaryValueSX}>{data?.orderId}</Typography>
				</Stack>
				<Stack {...inProgressOrderDetailsSummaryStack}>
					<Typography variant="strong">{nls.lastUpdated.t()}</Typography>
					<Typography sx={inProgressOrderDetailsSummaryValueSX}>
						{data?.lastUpdateDate ? dateFormatter.format(new Date(data?.lastUpdateDate)) : ''}
					</Typography>
				</Stack>
				<B2B>
					<Stack {...inProgressOrderDetailsSummaryStack}>
						<Typography variant="strong">{nls.createdBy.t()}</Typography>
						<Typography sx={inProgressOrderDetailsSummaryValueSX}>
							{nls.Contributor.t({ firstName: x_firstName, lastName: x_lastName })}
						</Typography>
					</Stack>
					<Stack {...inProgressOrderDetailsSummaryStack}>
						<Typography variant="strong">{nls.orderType.t()}</Typography>
						<Typography sx={inProgressOrderDetailsSummaryValueSX}>
							{data?.orderTypeCode === ORDER_TYPE.PRIVATE ? nls.private.t() : nls.shared.t()}
						</Typography>
					</Stack>
				</B2B>
			</Stack>
		</Stack>
	);
};
