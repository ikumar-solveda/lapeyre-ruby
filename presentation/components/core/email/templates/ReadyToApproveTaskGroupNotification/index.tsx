/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TemplateContainer } from '@/components/email/blocks/Container';
import { Footer } from '@/components/email/blocks/Footer';
import { Header } from '@/components/email/blocks/Header';
import { TableCell } from '@/components/email/blocks/Table/TableCell';
import { getTypedLocalization } from '@/data/Localization-Server';
import { ServerPageProps } from '@/data/types/AppRouter';
import { Paper, Table, TableBody, TableContainer, TableRow, Typography } from '@mui/material';
import { FC } from 'react';

export const ReadyToApproveTaskGroupNotification: FC<ServerPageProps> = async (props) => {
	const { cache, context } = props;
	const { DearContentContributor, TaskGroupApproval } = (
		await getTypedLocalization(cache, context.locale as string, 'EmailTemplate')
	).Workspace;

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
								<Typography variant="h5">{DearContentContributor.t()}</Typography>
								<Typography>{TaskGroupApproval.t()}</Typography>
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
