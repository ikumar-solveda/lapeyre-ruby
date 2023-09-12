/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { accountToolIconSX } from '@/components/content/Account/styles/toolIcon';
import { accountToolLinkSX } from '@/components/content/Account/styles/toolLink';
import { accountToolPaperSX } from '@/components/content/Account/styles/toolPaper';
import { AccountTool } from '@/utils/useAccountTools';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const Tool: FC<AccountTool> = ({ title, description, icon, href }) => (
	<Linkable sx={accountToolLinkSX(!href)} href={href} data-testid={href} id={href}>
		<Paper sx={accountToolPaperSX}>
			<Stack direction="row">
				<Box sx={accountToolIconSX(!href)}>{icon}</Box>
				<Stack>
					<Typography variant="subtitle1">{title}</Typography>
					<Typography>{description}</Typography>
				</Stack>
			</Stack>
		</Paper>
	</Linkable>
);
