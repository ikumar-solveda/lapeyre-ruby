/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { Breadcrumbs } from '@mui/material';
import { useBreadcrumbTrail } from '@/data/Content/BreadcrumbTrail';
import { Linkable } from '@/components/blocks/Linkable';
import { breadcrumbTrailContainerSX } from '@/components/content/BreadcrumbTrail/styles/container';
import { ID } from '@/data/types/Basic';

export const BreadcrumbTrail: FC<{ id: ID }> = () => {
	const { breadcrumb, uniqueId } = useBreadcrumbTrail();
	const breadcrumbLength = breadcrumb?.length;

	return breadcrumbLength ? (
		<Breadcrumbs sx={breadcrumbTrailContainerSX} aria-label={breadcrumb?.at(-1)?.label}>
			{breadcrumb.map(({ href, label }, index: number) => (
				<Linkable
					key={`breadcrumb-${uniqueId}-${index}-${label}`}
					href={index < breadcrumbLength - 1 ? href : undefined}
					type={index < breadcrumbLength - 1 ? 'inline' : 'link'}
					data-testid={`breadcrumb-${uniqueId}-${index}-${label}`}
					id={`breadcrumb-${uniqueId}-${index}-${label}`}
				>
					{label}
				</Linkable>
			))}
		</Breadcrumbs>
	) : null;
};
