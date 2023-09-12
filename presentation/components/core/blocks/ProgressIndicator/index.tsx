/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { progressIndicatorSX } from '@/components/blocks/ProgressIndicator/style';
import { useLocalization } from '@/data/Localization';
import { Box, CircularProgress, LinearProgress, SxProps, Theme } from '@mui/material';
import { FC, useMemo } from 'react';

type ProgressIndicatorProps = {
	variant?: 'circular' | 'linear';
	padding?: 'array' | 'number';
	sx?: SxProps<Theme>;
};

export const ProgressIndicator: FC<ProgressIndicatorProps> = ({
	variant = 'circular',
	padding = [2, 4, 6, 8],
	sx: _sx,
}) => {
	const progressIndicatorNLS = useLocalization('ProgressIndicator');
	const sx = useMemo(() => ({ ...progressIndicatorSX, ..._sx }), [_sx]);

	const a11yProps = {
		title: 'progress indicator',
		'aria-label': progressIndicatorNLS.label.t(),
	};

	return (
		<Box p={padding} display="flex" justifyContent="center" alignItems="center">
			{variant === 'circular' ? (
				<CircularProgress sx={sx} {...a11yProps} />
			) : (
				<LinearProgress sx={{ width: '100%', ...sx }} {...a11yProps} />
			)}
		</Box>
	);
};
