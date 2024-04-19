/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { Decorator } from '@storybook/react';

const _headers = new Map();
const _cookies = new Map();
const addToMap = (target: Map<string, any>, collection: Record<string, any>) =>
	collection && Object.entries(collection).forEach(([key, value]) => target.set(key, value));

export const headers = () => _headers;
export const cookies = () => _cookies;

export const withNextHeadersMock: Decorator = (story, { parameters }) => {
	addToMap(_headers, parameters?.nextHeaders);
	addToMap(_cookies, parameters?.nextCookies);
	return story();
};

// reference workaround from: https://github.com/storybookjs/storybook/discussions/25218
