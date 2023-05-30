/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, MouseEventHandler } from 'react';
import { CardActionArea, CardContent, Divider, Grid } from '@mui/material';
import { kebabCase } from 'lodash';
import { cardContentSX } from '@/components/blocks/Card/styles/cardContent';

type Props = {
	content: JSX.Element;
	divider?: boolean;
	onCardArea?: MouseEventHandler<HTMLButtonElement>;
	testId: string;
};

const Garnish: FC<{ content: JSX.Element }> = ({ content }) =>
	content ? (
		<Grid item xs sx={{ width: '100%' }}>
			<CardContent sx={cardContentSX}>{content}</CardContent>
		</Grid>
	) : null;

export const CardMain: FC<Props> = ({ content, onCardArea, divider, testId }) =>
	content ? (
		<>
			{onCardArea ? (
				<CardActionArea
					id={kebabCase(`card-action-area-${testId}`)}
					data-testid={kebabCase(`card-action-area-${testId}`)}
					onClick={onCardArea}
				>
					<Garnish content={content} />
				</CardActionArea>
			) : (
				<Garnish content={content} />
			)}
			{divider ? <Divider /> : null}
		</>
	) : null;
