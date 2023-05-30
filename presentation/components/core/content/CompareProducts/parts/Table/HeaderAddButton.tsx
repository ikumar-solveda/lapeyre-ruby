/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { compareProductsTableAddAnotherProductSX } from '@/components/content/CompareProducts/styles/Table/addAnotherProduct';
import { compareProductsTableAddProductIconSX } from '@/components/content/CompareProducts/styles/Table/addProductIcon';
import { useLocalization } from '@/data/Localization';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { ID } from '@/data/types/Basic';
import { compareProductsTableStackSX } from '@/components/content/CompareProducts/styles/Table/stack';

export const CompareProductsTableHeaderAddButton: FC<{ id: ID }> = ({ id }) => {
	const localization = useLocalization('compare');
	const router = useNextRouter();
	return (
		<Stack sx={compareProductsTableStackSX} justifyContent="center">
			<Stack sx={compareProductsTableAddAnotherProductSX}>
				<Button
					variant="text"
					id={`product-compare-add-another-product-${id}`}
					data-testid={`product-compare-add-another-product-${id}`}
					onClick={() => router.back()}
				>
					<AddIcon sx={compareProductsTableAddProductIconSX} />
				</Button>
			</Stack>
			<Typography sx={compareProductsTableAddAnotherProductSX} variant="body2">
				{localization.addAnother.t()}
			</Typography>
		</Stack>
	);
};
