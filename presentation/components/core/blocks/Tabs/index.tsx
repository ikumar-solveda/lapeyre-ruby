/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React, { FC, useState } from 'react';
import { AppBar, Tabs as MatTabs, Tab as MatTab } from '@mui/material';
import { tabContainerSX } from '@/components/blocks/Tabs/styles/container';
import { Box } from '@mui/material';
import { TabPanel } from '@/components/blocks/Tabs/Panel';

export type TabData = {
	title: string;
	content: JSX.Element;
};
type Props = {
	tabs: TabData[];
	collectionName: string;
};

export const Tabs: FC<Props> = ({ tabs, collectionName: name }) => {
	const [value, setValue] = useState(0);

	const onChange = (e: any, chosenIndex: number) => setValue(chosenIndex);
	const a11yProps = (index: number) => ({
		id: `${name}-tab-${index}`,
		'aria-controls': `${name}-tabpanel-${index}`,
	});

	return (
		<Box sx={tabContainerSX}>
			<AppBar position="static">
				<MatTabs value={value} onChange={onChange} aria-label={`tabs-${name}`}>
					{tabs.map((tab, index) => (
						<MatTab key={index} label={tab.title} {...a11yProps(index)} />
					))}
				</MatTabs>
			</AppBar>
			{tabs.map((tab, index) => (
				<TabPanel name={name} key={index} index={index} hidden={value !== index}>
					{tab?.content}
				</TabPanel>
			))}
		</Box>
	);
};
