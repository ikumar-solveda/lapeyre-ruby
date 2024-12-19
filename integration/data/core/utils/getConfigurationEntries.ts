/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CurrencyConfiguration, LanguageConfiguration } from '@/data/types/Configuration';
import type { ConfigurationConfigurationAttributeType } from 'integration/generated/transactions/data-contracts';

export const getConfigurationEntries = <T extends LanguageConfiguration | CurrencyConfiguration>(
	configurationAttributes: ConfigurationConfigurationAttributeType[]
): T[] =>
	configurationAttributes
		.map(({ primaryValue, additionalValue }) =>
			(additionalValue ?? []).reduce(
				(acc, { name, value }) => ({
					...acc,
					...(value && {
						[name]: name === 'localeName' ? value.replace('_', '-')?.toLowerCase() : value,
					}),
				}), // replace underscore with hyphen for localeName
				{
					[primaryValue.name]: primaryValue.value,
				} as T
			)
		)
		.filter(Boolean);
