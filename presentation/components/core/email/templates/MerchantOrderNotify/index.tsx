/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { TemplateContainer } from '@/components/email/blocks/Container';
import { Footer } from '@/components/email/blocks/Footer';
import { Header } from '@/components/email/blocks/Header';
import { Order } from '@/components/email/blocks/Order';
import { TableCell } from '@/components/email/blocks/Table/TableCell';
import { getTypedLocalization } from '@/data/Localization-Server';
import { ServerPageProps } from '@/data/types/AppRouter';
import { Paper, Table, TableBody, TableContainer, TableRow, Typography } from '@mui/material';
import { FC } from 'react';

export const MerchantOrderNotify: FC<ServerPageProps> = async (props) => {
	const { cache, context } = props;
	const localization = (
		await getTypedLocalization(cache, context.locale as string, 'EmailTemplate')
	).Order;

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
								<Typography variant="h3">{localization.Notification.t()}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Order {...props} />
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
