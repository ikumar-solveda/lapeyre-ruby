/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Attachment } from '@/components/blocks/Attachment';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { productDetailsTabsDescriptionSX } from '@/components/blocks/ProductDetails/styles/tabsDescription';
import { TabData, Tabs } from '@/components/blocks/Tabs';
import { TYPES } from '@/data/constants/product';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import {
	Attachment as AttachmentType,
	ProductAttribute,
	ProductAttributeValue,
} from '@/data/types/Product';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { productIsA } from '@/utils/productIsA';
import { Box, Typography } from '@mui/material';
import HTMLReactParser from 'html-react-parser';
import { uniq, uniqWith } from 'lodash';
import { FC, Fragment, useContext } from 'react';

type Props = {
	attachments: AttachmentType[];
	longDescription: string;
	descriptiveAttributes: ProductAttribute[];
	longCompDesc: string[];
};

const comparator = (l: ProductAttributeValue, r: ProductAttributeValue) => l.value === r.value;
const emptyAttrValues: ProductAttributeValue[] = [];

const LongDesc: FC<Props> = ({ longDescription, longCompDesc }) =>
	longDescription ? (
		<>
			<Typography component="div" sx={productDetailsTabsDescriptionSX}>
				{HTMLReactParser(longDescription)}
			</Typography>
			{longCompDesc?.length ? (
				<ul>
					{uniq(longCompDesc).map((v, key) => (
						<li key={key}>{v}</li>
					))}
				</ul>
			) : null}
		</>
	) : null;

const DescriptiveAttributes: FC<Props> = ({ descriptiveAttributes }) => {
	const localization = useLocalization('productDetail');
	return descriptiveAttributes?.length ? (
		<Box data-testid="product-details-container" id="product-details-container">
			{descriptiveAttributes.map(({ identifier, name, values = emptyAttrValues }) => (
				<Box
					key={`product-attribute-${identifier}`}
					data-testid={`product-attribute-${identifier}`}
					id={`product-attribute-${identifier}`}
				>
					<LocalizationWithComponent
						text={localization.descAttrLabelWithTagValues.t({ name })}
						components={[
							<Typography variant="body2" component="span" key="0" />,
							<Fragment key="1">
								{uniqWith(values, comparator).map(({ identifier: vIdentifier, value }, _, all) => (
									<Typography key={vIdentifier} {...(all.length === 1 && { component: 'span' })}>
										{value}
									</Typography>
								))}
							</Fragment>,
						]}
					/>
				</Box>
			))}
		</Box>
	) : null;
};
const Attachments: FC<Props> = ({ attachments }) => <Attachment {...{ attachments }} />;

export const ProductDetailsTabs: FC = () => {
	const localization = useLocalization('productDetail');
	const { selection, product } = useContext(ContentContext) as ReturnType<
		typeof useProductDetails
	> &
		ReturnType<typeof useSkuListTable>;
	const sku = !productIsA(product, TYPES.bundle) ? selection?.sku : product;
	const {
		tabsData: { longDescription, descriptiveAttributes, attachments, longCompDesc },
	} = getProductDisplayInfo(sku, product);

	const tabs: TabData[] = [
		{
			title: localization.Description.t(),
			F: LongDesc,
			data: { longDescription, longCompDesc },
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
			content: <tab.F {...{ longDescription, descriptiveAttributes, attachments, longCompDesc }} />,
		}));

	return <Tabs tabs={tabs} collectionName="product-details" />;
};
