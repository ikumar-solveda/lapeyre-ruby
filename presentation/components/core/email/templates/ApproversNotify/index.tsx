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
import { getTypedLocalization } from '@/data/Localization-Server';
import { ESPOT_NAME, FLOW_IDENTIFIER } from '@/data/constants/emailTemplate';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ServerPageProps } from '@/data/types/AppRouter';
import { getHostWithBasePath } from '@/utils/getHostWithBasePath-Server';
import { Paper, Table, TableBody, TableContainer, TableRow, Typography } from '@mui/material';
import { FC } from 'react';

export const ApproversNotify: FC<ServerPageProps> = async (props) => {
	const { context, cache, searchParams } = props;
	const {
		orderId,
		logonId,
		usr_logonId,
		firstName,
		lastName,
		parentMember,
		org_orgEntityName,
		flowType,
	} = searchParams as Record<string, string>;
	const { Greetings, CloseEmail, OrgRegNotification, OrgAdminRegNotification } = (
		await getTypedLocalization(cache, context.locale as string, 'EmailTemplate')
	).Approval;

	const settings = await getEmailSettings(cache, context);
	const { userData } = settings;
	let emsName;
	let substitutionMap: Record<string, string> | undefined;
	let content;
	let mappedContent;
	let organizationName: string;
	let adminName: string;
	let emailContent;

	const orgRegFlow =
		flowType === FLOW_IDENTIFIER.organization || flowType === FLOW_IDENTIFIER.orgAdmin;

	switch (flowType) {
		case FLOW_IDENTIFIER.order:
			substitutionMap = {
				'[orderNumber]': orderId,
				'[storeName]': settings.storeName,
			};
			emsName = ESPOT_NAME.OrderApprovalNotification;
			break;
		case FLOW_IDENTIFIER.user:
			const orgName = parentMember.split('=')[1].replaceAll('+', '');
			substitutionMap = {
				'[orgName]': orgName as string,
				'[userName]': `${logonId} (${firstName} ${lastName})`,
				'[storeName]': settings.storeName,
			};
			emsName = ESPOT_NAME.UserApprovalNotification;
			break;
		case FLOW_IDENTIFIER.organization:
			organizationName = org_orgEntityName.replace('["', '').replace('"]', '') as string;
			emailContent = OrgRegNotification.t({ organizationName });
			break;
		case FLOW_IDENTIFIER.orgAdmin:
			organizationName = org_orgEntityName.replace('["', '').replace('"]', '') as string;
			adminName = usr_logonId.replace('["', '').replace('"]', '') as string;
			emailContent = OrgAdminRegNotification.t({ adminName, organizationName });
			break;
		default:
			emsName = EMPTY_STRING;
	}

	if (emsName) {
		content = await getContentRecommendationForEmails({
			cache,
			context,
			substitutionMap,
			properties: { emsName },
		});
		mappedContent = dataMap(content);
	}

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
						{mappedContent ? (
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
						) : orgRegFlow ? (
							<TableRow>
								<TableCell>
									<Typography variant="h5">{Greetings.t()}</Typography>
									<Typography>{emailContent}</Typography>
									<Typography>{CloseEmail.t()}</Typography>
								</TableCell>
							</TableRow>
						) : null}
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
