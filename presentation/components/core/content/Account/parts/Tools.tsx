/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Tool } from '@/components/content/Account/parts/Tool';
import { useLocalization } from '@/data/Localization';
import { useAccountTools } from '@/utils/useAccountTools';
import { Box, Grid, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { FC } from 'react';

export const AccountTools: FC = () => {
	const AccountLinks = useLocalization('AccountLinks');
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const tools = useAccountTools();

	return (
		<Stack spacing={contentSpacing}>
			{tools.map(({ title, tools }, index) => (
				<Stack key={`${title}${index}`} spacing={2}>
					<Typography variant="h4" component="h3">
						{title}
					</Typography>
					<Box>
						<Grid container spacing={2}>
							{tools.map((tool, index) => (
								<Grid key={index} item xs={12} sm={6} md={4}>
									{tool.href ? (
										<Tool {...tool} />
									) : (
										<Tooltip title={AccountLinks.DisabledMessage.t()} placement="top">
											<Box>
												<Tool {...tool} />
											</Box>
										</Tooltip>
									)}
								</Grid>
							))}
						</Grid>
					</Box>
				</Stack>
			))}
		</Stack>
	);
};
