/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Switch } from '@/utils/switch';
import { Box, Button, ButtonProps, CircularProgress, IconButton } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';

type Props = ButtonProps & {
	spin?: boolean;
	spinSize?: number;
	wrapper?: 'button' | 'icon';
};

export const OneClick: FC<Props> = ({
	onClick,
	disabled,
	children,
	spin,
	wrapper,
	spinSize,
	...props
}) => {
	const [disabledOverride, setDisabledOverride] = useState<boolean>(false);

	const onClickOverride = async (event: MouseEvent<HTMLButtonElement>) => {
		if (onClick) {
			try {
				setDisabledOverride(true);
				await onClick(event);
			} finally {
				setDisabledOverride(false);
			}
		}
	};

	return disabledOverride && spin ? (
		<Box component="span">
			<CircularProgress size={spinSize ?? 40} />
		</Box>
	) : (
		Switch(wrapper)
			.case('icon', () => (
				<IconButton
					{...{
						...props,
						disabled: disabledOverride || disabled,
						onClick: onClickOverride,
					}}
				>
					{children}
				</IconButton>
			))
			.defaultTo(() => (
				<Button {...{ ...props, disabled: disabledOverride || disabled, onClick: onClickOverride }}>
					{children}
				</Button>
			))
	);
};
