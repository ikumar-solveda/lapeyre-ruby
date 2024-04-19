/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { RenderContentModern } from '@/components/blocks/RenderContent/modern';
import { TemplateContainer } from '@/components/email/blocks/Container';
import { Footer } from '@/components/email/blocks/Footer';
import { Header } from '@/components/email/blocks/Header';
import { TableCell } from '@/components/email/blocks/Table/TableCell';
import {
	dataMap,
	getContentRecommendationForEmails,
} from '@/data/Content/ContentRecommendation-Server';
import { getEmailSettings } from '@/data/EmailSettings-Server';
import { ESPOT_NAME } from '@/data/constants/emailTemplate';
import { StoreOnlineStoreContactInfoType } from '@/data/types/Address';
import { ServerPageProps } from '@/data/types/AppRouter';
import { getHostWithBasePath } from '@/utils/getHostWithBasePath-Server';
import { Paper, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import { FC } from 'react';

export const OrderAuthorized: FC<ServerPageProps> = async (props) => {
	const { context, cache, searchParams } = props;
	const settings = await getEmailSettings(cache, context);
	const { userData } = settings;
	const { orderId } = searchParams as Record<string, string>;
	const contacts: StoreOnlineStoreContactInfoType[] = settings.contactInfo;
	const { emailAddress1 = '', telephone1 = '' } = contacts?.at(0) ?? {};
	const substitutionMap = {
		'[orderNumber]': orderId,
		'[emailAddress]': emailAddress1,
		'[phoneNumber]': telephone1,
		'[storeName]': settings.storeName,
	};
	const emsName = ESPOT_NAME.OrderAuthorized;
	const content = await getContentRecommendationForEmails({
		cache,
		context,
		substitutionMap,
		properties: { emsName },
	});
	const mappedContent = dataMap(content);

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
								{mappedContent?.map((content, key) => (
									<RenderContentModern
										key={key}
										content={content}
										options={getHostWithBasePath(userData)}
									/>
								))}
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
