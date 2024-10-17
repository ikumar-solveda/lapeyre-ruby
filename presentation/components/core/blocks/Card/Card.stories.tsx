/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Card } from '@/components/blocks/Card';
import { Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import imageFile from '/public/EmeraldSAS/images/promotion/promo-lg-1200px.jpg';

export default {
	title: 'Blocks/Card',
	component: Card,
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;

export const CardStory = Template.bind({});
CardStory.args = {
	cardHeader: (
		<CardMedia
			key="333"
			component="img"
			height="100%"
			width="1200"
			image={`/${imageFile}`}
			alt="Image Temporary Alt Text"
		/>
	),
	cardMain: (
		<CardContent>
			<Typography variant="h6">{'Title'}</Typography>
			<Typography variant="subtitle2">{'Lorem Ipsum Text Here'}</Typography>
		</CardContent>
	),
	cardFooter: (
		<CardActions>
			<Button variant="contained">{'Confirm'}</Button>
			<Button variant="outlined">{'Cancel'}</Button>
		</CardActions>
	),
	testId: '123',
};

CardStory.storyName = 'Card';
