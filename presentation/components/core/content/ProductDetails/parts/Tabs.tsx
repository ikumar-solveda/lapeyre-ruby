/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Attachment } from '@/components/blocks/Attachment';
import { productDetailsTabsDescriptionSX } from '@/components/content/ProductDetails/styles/tabsDescription';
import { TabData, Tabs } from '@/components/blocks/Tabs';
import { useLocalization } from '@/data/Localization';
import { Attachment as AttachmentType, ProductAttribute } from '@/data/types/Product';
import { parseHTML } from '@/utils/parseHTML';
import { Box, Typography } from '@mui/material';
import HTMLReactParser from 'html-react-parser';
import { FC, useContext } from 'react';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { ContentContext } from '@/data/context/content';

type Props = {
	attachments: AttachmentType[];
	longDescription: string;
	descriptiveAttributes: ProductAttribute[];
};

const LongDesc: FC<Props> = ({ longDescription }) =>
	longDescription ? (
		<Typography component="div" sx={productDetailsTabsDescriptionSX}>
			{HTMLReactParser(longDescription)}
		</Typography>
	) : null;

const DescriptiveAttributes: FC<Props> = ({ descriptiveAttributes }) => {
	const localization = useLocalization('productDetail');
	return descriptiveAttributes?.length ? (
		<Box data-testid="product-details-container" id="product-details-container">
			{descriptiveAttributes.map(({ identifier, name, values }) => (
				<Typography
					key={`product-attribute-${identifier}`}
					data-testid={`product-attribute-${identifier}`}
					id={`product-attribute-${identifier}`}
				>
					{parseHTML(
						localization.descAttrLabel.t({
							name,
							values: values?.map(({ value }) => [value].flat(1).join(', ')).join(', '),
						})
					)}
				</Typography>
			))}
		</Box>
	) : null;
};
const Attachments: FC<Props> = ({ attachments }) => <Attachment {...{ attachments }} />;

export const ProductDetailsTabs: FC = () => {
	const localization = useLocalization('productDetail');
	const {
		selection: { sku },
		product,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	const {
		tabsData: { longDescription, descriptiveAttributes, attachments },
	} = getProductDisplayInfo(sku, product);

	const tabs: TabData[] = [
		{
			title: localization.Description.t(),
			F: LongDesc,
			data: longDescription,
		},
		{
			title: localization.ProductDetails.t(),
			F: DescriptiveAttributes,
			data: descriptiveAttributes,
		},
		{ title: localization.Attachments.t(), F: Attachments, data: attachments },
	]
		.filter(({ data }) => !!(Array.isArray(data) ? data.length : data))
		.map((tab) => ({
			...tab,
			content: <tab.F {...{ longDescription, descriptiveAttributes, attachments }} />,
		}));

	return <Tabs tabs={tabs} collectionName="product-details" />;
};
