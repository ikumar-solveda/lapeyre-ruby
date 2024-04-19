/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { StorybookConfig } from '@storybook/nextjs';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
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
		'@storybook/addon-a11y',
	],

	framework: {
		name: '@storybook/nextjs',
		options: {},
	},

	core: {},

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
			config.resolve.fallback = {
				// @ts-ignore
				...config.resolve?.fallback,
				http: false,
				zlib: false,
				fs: false,
				stream: false,
			};
			config.resolve.alias = {
				...config.resolve.alias,
				'next/router': 'next-router-mock',
				'next/headers': path.resolve(__dirname, './aliases/withNextHeadersMock'),
			};
		}
		return config;
	},

	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			compilerOptions: {
				// speeds up storybook build time
				allowSyntheticDefaultImports: false,
				// speeds up storybook build time
				esModuleInterop: false,
			},
			// makes union prop types like variant and size appear as select controls
			shouldExtractLiteralValuesFromEnum: true,
			// makes string and boolean types that can be undefined appear as inputs and switches
			shouldRemoveUndefinedFromOptional: true,
			// Filter out third-party props from node_modules except @mui packages
			propFilter: (prop) =>
				prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true,
		},
	},

	staticDirs: ['../public', { from: '../integration/mocks', to: '/mocks' }],

	docs: {
		autodocs: true,
	},
};

module.exports = config;
