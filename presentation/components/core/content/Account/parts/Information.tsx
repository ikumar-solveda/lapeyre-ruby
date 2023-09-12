/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AccountAddress } from '@/components/content/Account/parts/Address';
import { AccountChangePasswordDialog } from '@/components/content/Account/parts/ChangePasswordDialog';
import { AccountContact } from '@/components/content/Account/parts/Contact';
import { usePersonInfo } from '@/data/Content/PersonInfo';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { FC, useContext } from 'react';

export const AccountInformation: FC = () => {
	const AccountLabels = useLocalization('AccountSummary');
	const PersonalLabels = useLocalization('PersonalInformation');
	const { edit, openPasswordDialog } = useContext(ContentContext) as ReturnType<
		typeof usePersonInfo
	>;
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	return (
		<Stack spacing={contentSpacing}>
			<Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
				<Typography variant="h4" component="h3">
					{AccountLabels.Title.t()}
				</Typography>
				<Stack direction="row" spacing={1}>
					<Button
						variant="outlined"
						onClick={edit}
						data-testid="button-edit-personal-info"
						id="button-edit-personal-info"
					>
						{PersonalLabels.Edit.t()}
					</Button>
					<Button
						variant="outlined"
						onClick={openPasswordDialog}
						data-testid="button-change-password-dialog-open"
						id="button-change-password-dialog-open"
					>
						{PersonalLabels.ChangePassword.t()}
					</Button>
					<AccountChangePasswordDialog />
				</Stack>
			</Stack>
			<Box>
				<Grid container spacing={contentSpacing}>
					<Grid item xs={12} sm={6}>
						<AccountContact />
					</Grid>
					<Grid item xs={12} sm={6}>
						<AccountAddress />
					</Grid>
				</Grid>
			</Box>
		</Stack>
	);
};
