/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { MuiCardMedia } from '@/components/blocks/MuiCardMedia';
import { compareProductsTableThumbnailSX } from '@/components/content/CompareProducts/styles/Table/thumbnail';
import { CatSEO } from '@/data/types/Category';
import { FC } from 'react';

export type CompareProductsTableThumbnailProps = {
	seo?: CatSEO;
	thumbnail: string;
	name: string;
};
export const CompareProductsTableThumbnail: FC<CompareProductsTableThumbnailProps> = ({
	seo,
	thumbnail,
	name,
}) => (
	<Linkable href={seo?.href ?? ''} id={seo?.href ?? ''} data-testid={seo?.href ?? ''}>
		<MuiCardMedia
			component="div"
			sx={compareProductsTableThumbnailSX}
			image={thumbnail}
			title={name}
		></MuiCardMedia>
	</Linkable>
);
