/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TemplateContainer } from '@/components/email/blocks/Container';
import { Footer } from '@/components/email/blocks/Footer';
import { Header } from '@/components/email/blocks/Header';
import { TableCell } from '@/components/email/blocks/Table/TableCell';
import { getTypedLocalization } from '@/data/Localization-Server';
import { FLOW_IDENTIFIER } from '@/data/constants/emailTemplate';
import { ServerPageProps } from '@/data/types/AppRouter';
import { Paper, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export const ResellerRegistrationRejectedNotify: FC<ServerPageProps> = async (props) => {
	const { cache, context, searchParams } = props;
	const { flowType } = searchParams; // ResellerOrgEntityRegistrationAdd, ResellerUserRegistrationAdd
	const { OrgRejected, UserRejected } = (
		await getTypedLocalization(cache, context.locale as string, 'EmailTemplate')
	).Reseller;
	const label = flowType === FLOW_IDENTIFIER.orgAdmin ? UserRejected : OrgRejected;

	return (
		<TemplateContainer>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								<Header {...props} />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Typography>{label.t()}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Footer {...props} />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</TemplateContainer>
	);
};
