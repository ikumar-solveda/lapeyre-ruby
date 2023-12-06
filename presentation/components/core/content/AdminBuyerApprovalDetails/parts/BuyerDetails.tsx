/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { adminBuyerApprovalDetailsSectionPaperSX } from '@/components/content/AdminBuyerApprovalDetails/styles/sectionPaper';
import { adminBuyerApprovalDetailsValuesSX } from '@/components/content/AdminBuyerApprovalDetails/styles/values';
import { useAdmin_BuyerApprovalsDetails } from '@/data/Content/Admin_BuyerApprovalDetails';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import {
	AdminBuyerApprovalDetailsResponse,
	Submitter,
} from '@/data/types/Admin_ApprovalsManagement';
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { FC, Fragment, useContext, useMemo } from 'react';

const EMPTY_BUYER_APPROVAL_RESPONSE_DATA = {} as AdminBuyerApprovalDetailsResponse;
const EMPTY_SUBMITTER = {} as Submitter;
export const AdminBuyerApprovalDetailsBuyerDetails: FC = () => {
	const BuyerApprovalDetailsNLS = useLocalization('BuyerApprovalDetails');
	const { data } = useContext(ContentContext) as ReturnType<typeof useAdmin_BuyerApprovalsDetails>;
	const { approvalDetails, buyerDetails } = data ?? EMPTY_BUYER_APPROVAL_RESPONSE_DATA;
	const { firstName = EMPTY_STRING, lastName = EMPTY_STRING } =
		approvalDetails?.submitter ?? EMPTY_SUBMITTER;
	const fullName = useMemo(
		() => BuyerApprovalDetailsNLS.FullName.t({ firstName, lastName }),
		[BuyerApprovalDetailsNLS, firstName, lastName]
	);
	const { language: langLocale, currency: currencyLocale } = useLocalization('CommerceEnvironment');
	const buyerEmail = buyerDetails?.address.email1 ?? buyerDetails?.address.email2 ?? EMPTY_STRING;
	const fields = useMemo(
		() => [
			{ label: BuyerApprovalDetailsNLS.LogonId.t(), value: buyerDetails?.logonId },
			{ label: BuyerApprovalDetailsNLS.Name.t(), value: fullName },
			{ label: BuyerApprovalDetailsNLS.Email.t(), value: buyerEmail },
			{
				label: BuyerApprovalDetailsNLS.PreferredLanguage.t(),
				value: langLocale[buyerDetails?.preferredLanguage as keyof typeof langLocale].t(),
			},
			{
				label: BuyerApprovalDetailsNLS.PreferredCurrency.t(),
				value: currencyLocale[buyerDetails?.preferredCurrency as keyof typeof currencyLocale].t(),
			},
		],
		[BuyerApprovalDetailsNLS, buyerDetails, buyerEmail, currencyLocale, fullName, langLocale]
	);
	return (
		<Paper elevation={4} sx={adminBuyerApprovalDetailsSectionPaperSX}>
			<Stack spacing={2}>
				<Typography variant="h4">{BuyerApprovalDetailsNLS.BuyerDetailsTitle.t()}</Typography>
				<Divider />
				<Grid container rowSpacing={1}>
					{fields.map(({ label, value }, i) => (
						<Fragment key={i}>
							<Grid item xs={12} sm={3}>
								<Typography variant="body2">{label}</Typography>
							</Grid>
							<Grid item xs={12} sm={9}>
								<Typography sx={adminBuyerApprovalDetailsValuesSX}>{value}</Typography>
							</Grid>
						</Fragment>
					))}
				</Grid>
			</Stack>
		</Paper>
	);
};
