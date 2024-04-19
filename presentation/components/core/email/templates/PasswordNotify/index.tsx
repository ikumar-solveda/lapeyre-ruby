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
import { ServerPageProps } from '@/data/types/AppRouter';
import { getHostWithBasePath } from '@/utils/getHostWithBasePath-Server';
import { Paper, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import { FC } from 'react';

export const PasswordNotify: FC<ServerPageProps> = async (props) => {
	const { context, cache, searchParams } = props;
	const settings = await getEmailSettings(cache, context);
	const { userData, storeName } = settings;
	const { logonId, logonPassword, resetPasswordFormURL } = searchParams as Record<string, string>;
	const substitutionMap = {
		'[userName]': logonId,
		'[storeName]': storeName,
	};
	const maskedMap = {
		'[validationCode]': logonPassword,
		'[password]': logonPassword,
	};

	const emsName = resetPasswordFormURL ? ESPOT_NAME.PasswordNotifyAdmin : ESPOT_NAME.PasswordNotify;
	const content = await getContentRecommendationForEmails({
		cache,
		context,
		substitutionMap,
		maskedMap,
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
