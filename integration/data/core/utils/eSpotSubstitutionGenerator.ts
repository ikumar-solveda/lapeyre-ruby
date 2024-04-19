/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

export const eSpotSubstitutionGenerator = (source: Record<string, string>, prefix: string) =>
	Object.entries(source).reduce((aggregator, [key, value], index) => {
		const ordinal = index + 1;
		aggregator[`${prefix}Name${ordinal}`] = key;
		aggregator[`${prefix}Value${ordinal}`] = value;
		return aggregator;
	}, {} as Record<string, string>);
