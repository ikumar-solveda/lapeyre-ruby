import { SxProps, Theme } from '@mui/material';

export const recurringOrdersPopUpBorderSX: SxProps<Theme> = (theme: Theme) => ({
	borderTopWidth: 2,
	borderTopColor: theme.palette.primary.main,
	borderTopStyle: 'solid',
});
