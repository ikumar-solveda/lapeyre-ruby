/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable/server';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
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
import { ESPOT_NAME } from '@/data/constants/emailTemplate';
import { ServerPageProps } from '@/data/types/AppRouter';
import { getHostWithBasePath } from '@/utils/getHostWithBasePath-Server';
import { Paper, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import { FC } from 'react';

export const UserAccountEmailActivateNotify: FC<ServerPageProps> = async (props) => {
	const { context, cache, searchParams } = props;
	const settings = await getEmailSettings(cache, context);
	const { userData, storeName } = settings;
	const { activationURL, logonId } = searchParams as Record<string, string>;
	const substitutionMap = {
		'[userId]': logonId,
		'[link]': activationURL,
		'[storeName]': storeName,
	};
	const emsName = ESPOT_NAME.UserAccountEmailActivateNotify;
	const content = await getContentRecommendationForEmails({
		cache,
		context,
		substitutionMap,
		properties: { emsName },
	});
	const mappedContent = dataMap(content);
	const { UserAccountEmailActivateNotify } = (
		await getTypedLocalization(cache, context.locale as string, 'EmailTemplate')
	).ContentFallback;

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
								{mappedContent ? (
									mappedContent?.map((content, key) => (
										<RenderContentModern
											key={key}
											content={content}
											options={getHostWithBasePath(userData)}
										/>
									))
								) : (
									<>
										{UserAccountEmailActivateNotify.message.t()}
										{activationURL ? (
											<LocalizationWithComponent
												text={UserAccountEmailActivateNotify.link.t()}
												components={[
													<Linkable key="0" href={activationURL}>
														{activationURL}
													</Linkable>,
												]}
											/>
										) : null}
									</>
								)}
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
