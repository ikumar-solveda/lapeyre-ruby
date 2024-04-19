/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { useLocalization } from '@/data/Localization';
import { MARKETING_TRACKING_CONSENT_KEY } from '@/data/constants/privacyPolicy';
import { ProcessedContent } from '@/data/types/Marketing';
import { MouseEvent } from 'react';

export type PrivacyPolicy = {
	sessionId?: string;
	[MARKETING_TRACKING_CONSENT_KEY]?: string;
} & Record<string, number | string | boolean>;

export type CustomizeLabelKey = keyof ReturnType<
	typeof useLocalization<'PrivacyPolicy'>
>['Customize'];

export type PrivacyPolicyTabProps = {
	content?: ProcessedContent[];
	onSubmit: (payload?: PrivacyPolicy) => (_event: MouseEvent<HTMLButtonElement>) => Promise<void>;
};
