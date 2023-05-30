/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const CatalogEntryListResultsHeader: FC = () => {
	const {
		total,
		filteredParams: { searchTerm },
	} = useContext(ContentContext) as ReturnType<typeof useCatalogEntryList>;
	const productGridNLS = useLocalization('ProductGrid');
	return (
		<Typography variant="subtitle2">
			{typeof searchTerm === 'string' && searchTerm.trim() !== ''
				? productGridNLS.Labels.productSearchFound.t({ count: total || 0, searchTerm })
				: productGridNLS.Labels.productFound.t({ count: total || 0 })}
		</Typography>
	);
};
