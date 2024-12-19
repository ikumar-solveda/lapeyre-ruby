/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMarketingSpot } from '@/components/schemaOrg/blocks/EMarketingSpot';
import { DataProps } from '@/data/types/SchemaOrg';
import { FC, Fragment } from 'react';

export const ContentPage: FC<DataProps> = (props) => {
	const { data } = props;
	return (
		<>
			{data?.layout?.slots?.map((slot, outerIndex) => (
				<Fragment key={outerIndex}>
					{slot?.widgets?.map((widget, index) => (
						<EMarketingSpot key={index} widget={widget} />
					))}
				</Fragment>
			))}
		</>
	);
};
