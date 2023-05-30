/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, MouseEventHandler } from 'react';
import { Stack, Card as MatCard, SxProps, Theme } from '@mui/material';
import { UserActions } from '@/components/blocks/Card/UserActions';
import { CardHeader } from '@/components/blocks/Card/Header';
import { CardMain } from '@/components/blocks/Card/Main';
import { cardSX } from '@/components/blocks/Card/styles/card';
import { combineSX } from '@/utils/combineSX';

type Props = {
	cardHeader?: JSX.Element;
	cardMain?: JSX.Element;
	cardFooter?: JSX.Element;
	testId: string;
	actions?: any[];
	confirmLabel?: string;
	cancelLabel?: string;
	onCardArea?: MouseEventHandler<HTMLButtonElement>;
	extraSX?: SxProps<Theme>[];
};

const EMPTY_SX: SxProps<Theme>[] = [];
export const Card: FC<Props> = ({
	cardHeader,
	cardMain,
	actions,
	cardFooter,
	confirmLabel,
	cancelLabel,
	testId,
	onCardArea,
	extraSX = EMPTY_SX,
}) => (
	<MatCard sx={combineSX([cardSX, ...extraSX])}>
		<Stack justifyContent="space-between" alignItems="stretch" sx={{ height: '100%' }}>
			<CardHeader content={cardHeader as JSX.Element} divider={!!(cardMain || actions?.length)} />

			<CardMain
				onCardArea={onCardArea}
				content={cardMain as JSX.Element}
				divider={!!actions?.length}
				testId={testId}
			/>

			{actions?.length ? <UserActions {...{ testId, actions, confirmLabel, cancelLabel }} /> : null}

			{cardFooter}
		</Stack>
	</MatCard>
);
