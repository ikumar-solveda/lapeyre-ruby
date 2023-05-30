/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import type { StorybookConfig } from '@storybook/core-common';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path';
import { SetupStories } from './plugins/SetupStories';

const config: StorybookConfig = {
	stories: [
		'../presentation/**/*.stories.mdx',
		'../presentation/**/*.stories.@(js|jsx|ts|tsx)',
		'../.stories/*.stories.tsx',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'storybook-addon-next-router',
		'@storybook/addon-a11y',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
	// Enabling this feature seems to come at the cost of not detecting file additions or deletions.
	// features: {
	// 	storyStoreV7: true,
	// },
	webpackFinal: async (config, { configType }) => {
		if (config.resolve) {
			config.resolve.plugins = [
				new TsconfigPathsPlugin(),
				new SetupStories({
					muiStories: path.resolve(__dirname, 'muiStories.json'),
					output: path.resolve(__dirname, '../.stories'),
					mocks: path.resolve(__dirname, '../integration/mocks'),
				}),
			];
			// @ts-ignore
			config.resolve.fallback = { ...config.resolve?.fallback, http: false };
		}
		return config;
	},
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			// speeds up storybook build time
			allowSyntheticDefaultImports: false,
			// speeds up storybook build time
			esModuleInterop: false,
			// makes union prop types like variant and size appear as select controls
			shouldExtractLiteralValuesFromEnum: true,
			// makes string and boolean types that can be undefined appear as inputs and switches
			shouldRemoveUndefinedFromOptional: true,
			// Filter out third-party props from node_modules except @mui packages
			propFilter: (prop: { parent: { fileName: string } }) =>
				prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true,
		},
	},
	staticDirs: ['../public', { from: '../integration/mocks', to: '/mocks' }],
};

module.exports = config;
