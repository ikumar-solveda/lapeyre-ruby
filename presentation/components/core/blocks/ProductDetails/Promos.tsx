/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useProductDetails } from '@/data/Content/ProductDetails';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext } from '@/data/context/content';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const ProductDetailsPromos: FC = () => {
	const { promos } = useContext(ContentContext) as ReturnType<typeof useProductDetails> &
		ReturnType<typeof useSkuListTable>;

	return (
		<>
			{promos?.map((promoDesc, i) => (
				<Typography key={i} variant="body2" gutterBottom>
					{promoDesc}
				</Typography>
			))}
		</>
	);
};
