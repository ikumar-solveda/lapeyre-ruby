import { useLocalization } from '@/data/Localization';
import { Box, Typography } from '@mui/material';

export const Copyright = () => {
	const footerNLS = useLocalization('Footer');
	return (
		<Box>
			<Typography variant="caption">
				{footerNLS.CopyrightFull.t({ date: `${new Date().getFullYear()}` })}
			</Typography>
		</Box>
	);
};
