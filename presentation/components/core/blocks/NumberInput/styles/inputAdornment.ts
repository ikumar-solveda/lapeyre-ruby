import { SxProps, Theme } from '@mui/material';

export const numberInputInputAdornmentSX: SxProps<Theme> = (theme) => ({
	color: 'text.secondary',
	bgcolor: `${theme.palette.background.default}${theme.palette.background.transparency}`,
	padding: 1,
	height: '100%',
	maxHeight: 'unset',
	borderRadius: 1,
	'&.MuiInputAdornment-positionStart': {
		ml: -1.8,
		borderRight: '1px solid',
		borderRightColor: 'text.disabled',
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},
	'&.MuiInputAdornment-positionEnd': {
		mr: -1.8,
		borderLeft: '1px solid',
		borderLeftColor: 'text.disabled',
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
	},
});
