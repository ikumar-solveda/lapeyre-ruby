/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { resBreak } from '@/utils/resBreak';
import { StackProps } from '@mui/material';

export const accountStack: StackProps = {
	direction: resBreak({ mobile: 'column', tablet: 'row' }),
	alignItems: resBreak({ mobile: 'flex-start', tablet: 'center' }),
	justifyContent: resBreak({ mobile: 'center', tablet: 'space-between' }),
	spacing: 2,
	sx: {
		whiteSpace: 'normal',
		overflowWrap: 'break-word',
		wordWrap: 'break-word',
		wordBreak: 'break-word',
	},
};
