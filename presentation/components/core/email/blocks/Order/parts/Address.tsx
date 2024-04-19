/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { BasicAddress } from '@/data/types/Order';
import { PrintableAttrs, makePrintable } from '@/utils/address';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
	address: BasicAddress;
};
export const OrderAddress: FC<Props> = ({ address }) => {
	const addressData = makePrintable(address);
	return (
		<Box>
			{PrintableAttrs.flatMap((attr) => (addressData as any)[attr])
				.filter(Boolean)
				.map((line: string, index: number) => (
					<Typography key={index} display="block" noWrap>
						{line}
					</Typography>
				))}
		</Box>
	);
};
