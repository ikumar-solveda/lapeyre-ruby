/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { adminOrganizationListItemDisplaySX } from '@/components/blocks/AdminOrganizationListItemDisplay/style';
import { OrganizationDataBean } from '@/data/types/Organization';
import { Info } from '@mui/icons-material';
import { IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, MouseEvent, RefObject } from 'react';

type Props = {
	organization: OrganizationDataBean;
	anchorRef?: RefObject<HTMLDivElement>;
};
const onTooltip = (event: MouseEvent<HTMLButtonElement>) => event.stopPropagation();

export const AdminOrganizationListItemDisplay: FC<Props> = ({ organization, anchorRef }) => {
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
	const { displayName, distinguishedName, organizationId } = organization;
	return isMobile ? (
		<>
			{displayName}
			<Tooltip disableFocusListener title={distinguishedName}>
				<IconButton
					data-testid={`show-dn-${organizationId}`}
					id={`show-dn-${organizationId}`}
					color="info"
					size="small"
					onClick={onTooltip}
				>
					<Info />
				</IconButton>
			</Tooltip>
		</>
	) : (
		<Tooltip title={distinguishedName}>
			<Typography variant="body2" sx={adminOrganizationListItemDisplaySX(anchorRef)}>
				{displayName}
				<Typography component="span">{` (${distinguishedName})`}</Typography>
			</Typography>
		</Tooltip>
	);
};
