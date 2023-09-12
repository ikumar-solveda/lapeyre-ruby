/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useProductDetails } from '@/data/Content/ProductDetails';
import { ContentContext } from '@/data/context/content';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
export const ProductDetailsPromos: FC = () => {
	const { promos } = useContext(ContentContext) as ReturnType<typeof useProductDetails>;

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
