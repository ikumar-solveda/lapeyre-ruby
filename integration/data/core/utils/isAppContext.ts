/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { AppContextWrapper } from '@/data/types/AppRouter';
import { GetServerSidePropsContext } from 'next';

export const isAppContext = (context: GetServerSidePropsContext) =>
	!!(context as AppContextWrapper).isWrapper;
