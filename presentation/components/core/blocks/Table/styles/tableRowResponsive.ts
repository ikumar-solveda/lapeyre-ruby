/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Theme, SxProps } from '@mui/system';

export const tableRowResponsiveSX =
	({ expanded = false, expandedContent = false }): SxProps<Theme> =>
	(theme) => ({
		[theme.breakpoints.down('md')]: {
			// mobile view
			display: 'block',
			border: '2px solid',
			borderColor: 'grey.400',
			borderRadius: 1,
			my: 1,
			...(expanded
				? {
						borderBottomWidth: 0,
						borderBottomLeftRadius: 0,
						borderBottomRightRadius: 0,
						mb: 0,
				  }
				: expandedContent
				? {
						borderTopWidth: 0,
						mt: 0,
						borderTopLeftRadius: 0,
						borderTopRightRadius: 0,
				  }
				: undefined),
		},
	});
