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
import { ESPOT_NAME } from '@/data/constants/emailTemplate';
import { ServerPageProps } from '@/data/types/AppRouter';
import { getHostWithBasePath } from '@/utils/getHostWithBasePath-Server';
import { Paper, Table, TableBody, TableContainer, TableRow, Typography } from '@mui/material';
import { FC } from 'react';

export const InterestItemListMessage: FC<ServerPageProps> = async (props) => {
	const { context, cache, searchParams } = props;
	const settings = await getEmailSettings(cache, context);
	const { userData } = settings;
	const { MessageIntro } = (
		await getTypedLocalization(cache, context.locale as string, 'EmailTemplate')
	).Wishlist;
	const { senderName, senderEmail, message, giftListId } = searchParams as Record<string, string>;
	const substitutionMap = {
		'[senderName]': senderName,
		'[senderEmail]': senderEmail,
		'[link]': `ABSOLUTE-PATH-LINK-GENERATION-REPLACEMENT-TODO-${giftListId}`,
		'[storeName]': settings.storeName,
	};
	const content = await getContentRecommendationForEmails({
		cache,
		context,
		substitutionMap,
		properties: { emsName: ESPOT_NAME.InterestItemListMessage },
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
						{message ? (
							<TableRow>
								<TableCell>
									<Typography variant="h5">{MessageIntro.t({ senderName })}</Typography>
									<Typography>{message}</Typography>
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
