/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

export const RECURRING_ORDER_OPTIONS = [
	{
		value: 'Everyday',
		fulfillmentInterval: '1',
		fulfillmentIntervalUOM: 'DAY',
	},
	{
		value: 'EveryWeek',
		fulfillmentInterval: '1',
		fulfillmentIntervalUOM: 'WEE',
	},
	{
		value: 'EveryTwoWeeks',
		fulfillmentInterval: '2',
		fulfillmentIntervalUOM: 'WEE',
	},
	{
		value: 'EveryThreeWeeks',
		fulfillmentInterval: '3',
		fulfillmentIntervalUOM: 'WEE',
	},
	{
		value: 'EveryFourWeeks',
		fulfillmentInterval: '4',
		fulfillmentIntervalUOM: 'WEE',
	},
];

export const RECURRING_ORDER_INFO_KEY = 'recurringorder';
