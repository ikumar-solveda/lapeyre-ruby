/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { RenderContentModern } from '@/components/blocks/RenderContent/modern';
import { TemplateContainer } from '@/components/email/blocks/Container';
import { Footer } from '@/components/email/blocks/Footer';
import { Header } from '@/components/email/blocks/Header';
import { TableCell } from '@/components/email/blocks/Table/TableCell';
import { passwordNotifyInnerTypography } from '@/components/email/templates/PasswordNotify/styles/innerTypography';
import { passwordNotifyListItemTypography } from '@/components/email/templates/PasswordNotify/styles/listItemTypography';
import { passwordNotifyOuterTypography } from '@/components/email/templates/PasswordNotify/styles/outerTypography';
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
	const { PasswordNotify } = (
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
								) : resetPasswordFormURL ? (
									<LocalizationWithComponent
										text={PasswordNotify.messageAdmin.t({
											userName: logonId,
											validationCode: logonPassword,
										})}
										components={[
											<Typography key="0" {...passwordNotifyOuterTypography}>
												<Typography {...passwordNotifyInnerTypography} />
											</Typography>,
											<Typography key="1" {...passwordNotifyOuterTypography} />,
											<Typography key="2" {...passwordNotifyOuterTypography}>
												<Typography {...passwordNotifyInnerTypography} />
											</Typography>,
											<Typography key="3" />,
											<Typography key="4" {...passwordNotifyListItemTypography}>
												<Typography {...passwordNotifyInnerTypography} />
											</Typography>,
											<Typography key="5" {...passwordNotifyListItemTypography}>
												<Typography {...passwordNotifyInnerTypography} />
											</Typography>,
											<Typography key="6" {...passwordNotifyListItemTypography}>
												<Typography {...passwordNotifyInnerTypography} />
											</Typography>,
											<Typography key="7" {...passwordNotifyListItemTypography}>
												<Typography {...passwordNotifyInnerTypography} />
												<Typography {...passwordNotifyInnerTypography} />
											</Typography>,
											<Typography key="8" {...passwordNotifyListItemTypography}>
												<Typography {...passwordNotifyInnerTypography} />
											</Typography>,
										]}
									/>
								) : (
									<LocalizationWithComponent
										text={PasswordNotify.message.t({
											userName: logonId,
											validationCode: logonPassword,
										})}
										components={[
											<Typography key="0" {...passwordNotifyOuterTypography}>
												<Typography {...passwordNotifyInnerTypography} />
											</Typography>,
											<Typography key="1" {...passwordNotifyOuterTypography} />,
											<Typography key="2" {...passwordNotifyOuterTypography}>
												<Typography {...passwordNotifyInnerTypography} />
											</Typography>,
											<Typography key="3" />,
										]}
									/>
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
