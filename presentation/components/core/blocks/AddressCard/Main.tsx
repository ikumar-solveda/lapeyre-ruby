/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { addressCardTypographySX } from '@/components/blocks/AddressCard/styles/typography';
import { PrintableAddress } from '@/data/types/Address';
import { PrintableAttrs } from '@/utils/address';
import { Typography } from '@mui/material';
import { FC } from 'react';

export const AddressCardMain: FC<{ addressData: PrintableAddress }> = ({ addressData }) => (
	<>
		{PrintableAttrs.flatMap((attr) => (addressData as any)[attr])
			.filter(Boolean)
			.map((line: string, index: number) => (
				<Typography key={index} display="block" noWrap sx={addressCardTypographySX}>
					{line}
				</Typography>
			))}
	</>
);
