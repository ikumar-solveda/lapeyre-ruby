/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AppContextWrapper } from '@/data/types/AppRouter';
import { ID } from '@/data/types/Basic';
import { Cache } from '@/data/types/Cache';
import { WidgetProperties } from '@/data/types/Slot';
import { GetServerSidePropsContext } from 'next';

export type ContentProps = {
	cache: Cache;
	id: ID;
	context: GetServerSidePropsContext;
	properties?: WidgetProperties;
};

export type EmailContentProps = {
	cache: Cache;
	id?: ID;
	context: AppContextWrapper;
	properties?: WidgetProperties;
	substitutionMap?: Record<string, string>;
	maskedMap?: Record<string, string>;
};
