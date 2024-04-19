/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { accountTypographySX } from '@/components/content/Account/styles/typography';
import { EditablePersonInfo, usePersonInfo } from '@/data/Content/PersonInfo';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Stack, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

type ContactInfo = keyof EditablePersonInfo;

const ADDRESS_INFO: ContactInfo[][] = [
	['addressLine1', 'addressLine2'],
	['city', 'state', 'country'],
	['zipCode'],
];

export const AccountAddress: FC = () => {
	const MyAccountLabels = useLocalization('MyAccount');
	const { personInfo } = useContext(ContentContext) as ReturnType<typeof usePersonInfo>;
	const addressInfo = useMemo<string[]>(
		() =>
			personInfo
				? ADDRESS_INFO.map((line) =>
						line
							.map((key) => personInfo[key]?.toString())
							.filter((item) => !!item)
							.join(', ')
				  ).filter(Boolean)
				: [],
		[personInfo]
	);
	return (
		<Stack spacing={1}>
			<Typography variant="h5" component="h4">
				{MyAccountLabels.AccountAddress.t()}
			</Typography>
			{addressInfo.length > 0 ? (
				addressInfo.map(
					(item: string, index: number) =>
						item && (
							<Typography sx={accountTypographySX} key={index}>
								{item}
							</Typography>
						)
				)
			) : (
				<Typography variant="body1">{MyAccountLabels.NoAccountAddress.t()}</Typography>
			)}
		</Stack>
	);
};
