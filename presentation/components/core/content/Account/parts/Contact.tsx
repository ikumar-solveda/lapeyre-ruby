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
const CONTACT_INFO: ContactInfo[] = ['firstName', 'email1', 'phone1'];

export const AccountContact: FC = () => {
	const MyAccountLabels = useLocalization('MyAccount');
	const { personInfo } = useContext(ContentContext) as ReturnType<typeof usePersonInfo>;
	const contactInfo = useMemo<(string | undefined)[]>(
		() =>
			personInfo
				? CONTACT_INFO.map((key) => personInfo[key]?.toString()).filter((item) => !!item)
				: [],
		[personInfo]
	);
	return (
		<Stack spacing={1}>
			<Typography variant="subtitle1" component="h4">
				{MyAccountLabels.ContactInformation.t()}
			</Typography>
			{contactInfo.map(
				(item?: string) =>
					item && (
						<Typography sx={accountTypographySX} key={item}>
							{item}
						</Typography>
					)
			)}
		</Stack>
	);
};
