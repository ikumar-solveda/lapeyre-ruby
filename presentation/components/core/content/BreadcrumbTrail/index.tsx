/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { breadcrumbTrailContainerSX } from '@/components/content/BreadcrumbTrail/styles/container';
import { useBreadcrumbTrail } from '@/data/Content/BreadcrumbTrail';
import { ID } from '@/data/types/Basic';
import { getHref_Breadcrumb } from '@/utils/getHref_Breadcrumb';
import { Breadcrumbs, Typography } from '@mui/material';
import { FC } from 'react';

export const BreadcrumbTrail: FC<{ id: ID }> = () => {
	const { breadcrumb, uniqueId } = useBreadcrumbTrail();
	const breadcrumbLength = breadcrumb?.length;

	return breadcrumbLength ? (
		<Breadcrumbs sx={breadcrumbTrailContainerSX} aria-label={breadcrumb?.at(-1)?.label}>
			{breadcrumb.map(({ href, label, trail }, index: number) => (
				<Linkable
					key={`breadcrumb-${uniqueId}-${index}-${label}`}
					href={index < breadcrumbLength - 1 ? getHref_Breadcrumb(href, trail) : undefined}
					type={index < breadcrumbLength - 1 ? 'inline' : 'link'}
					data-testid={`breadcrumb-${uniqueId}-${index}-${label}`}
					id={`breadcrumb-${uniqueId}-${index}-${label}`}
				>
					{index < breadcrumbLength - 1 ? (
						label
					) : (
						<Typography variant="body1AsH1">{label}</Typography>
					)}
				</Linkable>
			))}
		</Breadcrumbs>
	) : null;
};
