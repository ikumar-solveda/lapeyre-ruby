/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { notFoundCodeSX } from '@/components/email/blocks/NotFound/styles/code';
import { notFoundRootSX } from '@/components/email/blocks/NotFound/styles/root';
import { notFoundTextSX } from '@/components/email/blocks/NotFound/styles/text';
import { Box, Typography } from '@mui/material';

export const NotFound = () => (
	<Box sx={notFoundRootSX}>
		<Typography variant="h1" sx={notFoundCodeSX}>
			{404}
		</Typography>
		<Typography sx={notFoundTextSX}>{'Content not found.'}</Typography>
	</Box>
);
