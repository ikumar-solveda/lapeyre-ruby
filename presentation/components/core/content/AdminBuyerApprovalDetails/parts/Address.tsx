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
import { UserRegistrationDetailsResponse } from '@/data/types/Person';
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

const EMPTY_BUYER_DETAILS = {} as UserRegistrationDetailsResponse;
export const AdminBuyerApprovalDetailsAddress: FC = () => {
	const BuyerApprovalDetailsNLS = useLocalization('BuyerApprovalDetails');
	const { data } = useContext(ContentContext) as ReturnType<typeof useAdmin_BuyerApprovalsDetails>;
	const { address } = data?.buyerDetails ?? EMPTY_BUYER_DETAILS;
	const { firstName = EMPTY_STRING, lastName = EMPTY_STRING } = address;
	const fullName = useMemo(
		() => BuyerApprovalDetailsNLS.FullName.t({ firstName, lastName }),
		[BuyerApprovalDetailsNLS, firstName, lastName]
	);
	const buyerAddress = address?.address1 ?? address?.address2 ?? address?.address3 ?? EMPTY_STRING;
	const fields = useMemo(
		() => [fullName, buyerAddress, address?.city, address?.country],
		[address, buyerAddress, fullName]
	);
	return (
		<Paper elevation={4} sx={adminBuyerApprovalDetailsSectionPaperSX}>
			<Stack spacing={2}>
				<Typography variant="h4">{BuyerApprovalDetailsNLS.AddressTitle.t()}</Typography>
				<Divider />
				<Grid container>
					<Grid item xs={12} sm={3} />
					<Grid item>
						<Stack spacing={1}>
							{fields.map((f, i) => (
								<Typography key={i} sx={adminBuyerApprovalDetailsValuesSX}>
									{f}
								</Typography>
							))}
						</Stack>
					</Grid>
				</Grid>
			</Stack>
		</Paper>
	);
};
