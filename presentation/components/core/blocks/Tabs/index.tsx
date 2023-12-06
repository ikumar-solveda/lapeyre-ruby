/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TabPanel } from '@/components/blocks/Tabs/Panel';
import { tabsButtonSX } from '@/components/blocks/Tabs/styles/button';
import { tabContainerSX } from '@/components/blocks/Tabs/styles/container';
import { ID } from '@/data/types/Basic';
import { combineSX } from '@/utils/combineSX';
import { AppBar, Box, Tab as MatTab, Tabs as MatTabs, SxProps } from '@mui/material';
import { FC, useState } from 'react';

export type TabData = {
	id?: ID;
	title: string;
	content: JSX.Element;
};
type Props = {
	tabs: TabData[];
	collectionName: string;
	tabSX?: SxProps;
	initial?: number;
};

export const Tabs: FC<Props> = ({
	tabs,
	collectionName: name,
	tabSX: overWriteTabSX,
	initial = 0,
}) => {
	const [value, setValue] = useState(initial);

	const onChange = (e: any, chosenIndex: number) => setValue(chosenIndex);
	const a11yProps = (index: number) => ({
		id: `${name}-tab-${index}`,
		'aria-controls': `${name}-tabpanel-${index}`,
	});

	return (
		<Box sx={tabContainerSX}>
			<AppBar position="static">
				<MatTabs
					value={value}
					onChange={onChange}
					aria-label={`tabs-${name}`}
					sx={overWriteTabSX ? combineSX([tabsButtonSX, overWriteTabSX]) : tabsButtonSX}
				>
					{tabs.map((tab, index) => (
						<MatTab key={index} label={tab.title} {...a11yProps(index)} />
					))}
				</MatTabs>
			</AppBar>
			{tabs.map((tab, index) => (
				<TabPanel name={name} key={index} index={index} hidden={value !== index}>
					{value === index ? tab?.content : null}
				</TabPanel>
			))}
		</Box>
	);
};
