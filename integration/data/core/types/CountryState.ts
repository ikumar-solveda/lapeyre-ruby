/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import type {
	ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummary,
	ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummaryCountries,
	ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummaryCountryCodeStates,
} from 'integration/generated/transactions/data-contracts';

export type CountryStates =
	ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummary;
export type Country =
	ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummaryCountries;
export type State =
	ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummaryCountryCodeStates;
