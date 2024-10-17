/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { oneClickBackdropSX } from '@/components/blocks/OneClick/styles/backdrop';
import { Switch } from '@/utils/switch';
import { Backdrop, Button, ButtonProps, CircularProgress, IconButton } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';

type Props = ButtonProps & {
	spin?: boolean;
	spinSize?: number;
	wrapper?: 'button' | 'icon';
	overlay?: boolean;
};

export const OneClick: FC<Props> = ({
	onClick,
	disabled,
	children,
	spin,
	wrapper,
	spinSize,
	overlay,
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

	return disabledOverride && overlay ? (
		// overlay block mouse action at page level
		<Backdrop sx={oneClickBackdropSX} open={true}>
			<CircularProgress size={spinSize ?? 40} />
		</Backdrop>
	) : disabledOverride && spin ? (
		<CircularProgress size={spinSize ?? 40} />
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
