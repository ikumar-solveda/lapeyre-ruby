/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AccountInformation } from '@/components/content/Account/parts/Information';
import { AccountInformationForm } from '@/components/content/Account/parts/InformationForm';
import { accountPersonalSX } from '@/components/content/Account/styles/personal';
import { usePersonInfo } from '@/data/Content/PersonInfo';
import { ContentProvider } from '@/data/context/content';
import { Paper } from '@mui/material';
import { FC } from 'react';

export const AccountPersonal: FC = () => {
	const { editing, ...rest } = usePersonInfo();
	return (
		<ContentProvider value={{ editing, ...rest }}>
			<Paper sx={accountPersonalSX}>
				{editing ? <AccountInformationForm /> : <AccountInformation />}
			</Paper>
		</ContentProvider>
	);
};
