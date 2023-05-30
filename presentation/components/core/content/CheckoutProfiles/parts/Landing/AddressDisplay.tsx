/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Address } from '@/data/types/Address';
import { Typography } from '@mui/material';
import { FC } from 'react';

export const CheckoutProfilesAddressDisplay: FC<{ address: Address }> = ({ address }) =>
	address ? (
		<>
			{[
				{ fields: ['firstName', 'lastName'], delimiter: ' ' },
				{ fields: ['addressLine'], isMultiLine: true },
				{ fields: ['city', 'state', 'zipCode'], delimiter: ', ' },
				{ fields: ['country'] },
				{ fields: ['phone1'] },
				{ fields: ['email1'] },
			]
				.map(({ fields, ...rest }) => ({
					...rest,
					fields: fields
						.map((field) => address[field as keyof Address] as string | string[])
						.flat(1)
						.filter(Boolean),
				}))
				.filter(({ fields }) => fields.length)
				.map(({ isMultiLine, fields, delimiter }, i) =>
					isMultiLine ? (
						fields.map((l, j) => <Typography key={`${i}_${j}`}>{l}</Typography>)
					) : (
						<Typography key={i}>{fields.filter(Boolean).join(delimiter ?? '')}</Typography>
					)
				)}
		</>
	) : null;
