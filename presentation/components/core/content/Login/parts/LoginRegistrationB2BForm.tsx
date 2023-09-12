/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { FC } from 'react';

import { loginContainerSX } from '@/components/content/Login/styles/container';
import { loginRegistrationB2BFormIconSX } from '@/components/content/Login/styles/registrationB2BFormIcon';
import { loginRegistrationB2BFormIconContainerSX } from '@/components/content/Login/styles/registrationB2BFormIconContainer';
import { useLocalization } from '@/data/Localization';
import RegisterOrg from '@mui/icons-material/Business';
import RegisterBuyer from '@mui/icons-material/PersonOutlineOutlined';
import { Box, Grid, Paper, Stack, Typography, useTheme } from '@mui/material';

/**
 * Registration links for B2B
 * displays links to B2B registration forms
 * @param props
 */

export const LoginRegistrationB2BForm: FC = () => {
	const labels = useLocalization('RegistrationB2BLayout');
	const routes = useLocalization('Routes');

	const {
		dimensions: { contentSpacing },
	} = useTheme();

	return (
		<Paper sx={loginContainerSX}>
			<Stack rowGap={contentSpacing}>
				<Typography variant="h4" component="div">
					{labels.Title.t()}
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Linkable
							href={routes.BuyerUserRegistration.route.t()}
							id={routes.BuyerUserRegistration.route.t()}
							data-testid={routes.BuyerUserRegistration.route.t()}
							aria-label={labels.Actions.BuyerReg.t()}
							type="button"
							variant="outlined"
							fullWidth
						>
							<Stack alignItems="center" rowGap={2}>
								<Box sx={loginRegistrationB2BFormIconContainerSX}>
									<RegisterBuyer sx={loginRegistrationB2BFormIconSX} color="primary" />
								</Box>
								{labels.Actions.BuyerReg.t()}
								<Typography variant="caption" gutterBottom align="center">
									{labels.Actions.AddBuyer.t()}
								</Typography>
							</Stack>
						</Linkable>
					</Grid>
					<Grid item xs={12} md={6}>
						<Linkable
							href={routes.BuyerOrganizationRegistration.route.t()}
							id={routes.BuyerOrganizationRegistration.route.t()}
							data-testid={routes.BuyerOrganizationRegistration.route.t()}
							aria-label={labels.Actions.OrgReg.t()}
							type="button"
							variant="outlined"
							fullWidth
						>
							<Stack alignItems="center" rowGap={2}>
								<Box sx={loginRegistrationB2BFormIconContainerSX}>
									<RegisterOrg sx={loginRegistrationB2BFormIconSX} color="primary" />
								</Box>
								{labels.Actions.OrgReg.t()}
								<Typography variant="caption" gutterBottom align="center">
									{labels.Actions.AddOrg.t()}
								</Typography>
							</Stack>
						</Linkable>
					</Grid>
				</Grid>
			</Stack>
		</Paper>
	);
};
