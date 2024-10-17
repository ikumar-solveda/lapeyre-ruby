/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import nextJest from 'next/jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	roots: ['<rootDir>'],

	moduleFileExtensions: ['js', 'ts', 'tsx'],
	setupFilesAfterEnv: [
		'@testing-library/jest-dom',
		'jest-axe/extend-expect',
		'react-intersection-observer/test-utils',
		'<rootDir>/jest.setup.ts',
	],
	modulePaths: [compilerOptions.baseUrl],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/',
	}),
	testEnvironment: 'jest-environment-jsdom',
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	// testMatch: ['**/BreadcrumbTrail.test.tsx'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
