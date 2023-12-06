import { SxProps, Theme } from '@mui/material';

export const recurringOrderIconFlexBoxSX: SxProps<Theme> = (theme: Theme) => ({
	display: 'flex',
	flex: 'wrap',
	alignItems: 'center',
	'>.MuiBox-root:first-child': {
		pr: theme.spacing(2),
	},
});
