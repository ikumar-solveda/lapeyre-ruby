/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { filterEmptyObjectValues } from './filterEmptyObjectValues';

export const getMissingValues = ({
	reference,
	check,
}: Record<string, Record<string, any>>) => {
	const missing = filterEmptyObjectValues(
		Object.entries(reference).reduce((changes, [key, refValue]) => {
			const checkValue = check[key];
			return typeof checkValue === 'string'
				? changes
				: {
						...changes,
						[key]:
							typeof checkValue === 'object'
								? getMissingValues({ reference: refValue, check: checkValue })
								: refValue,
				  };
		}, {})
	);
	return Object.keys(missing).length === 0 ? null : missing;
};
