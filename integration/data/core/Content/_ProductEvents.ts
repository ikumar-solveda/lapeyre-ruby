/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useSettings } from '@/data/Settings';
import { ContentContext } from '@/data/context/content';
import { EventsContext } from '@/data/context/events';
import { GTMContainerListType } from '@/data/types/GTM';
import { ProductType } from '@/data/types/Product';
import { useCallback, useContext } from 'react';

type Props = {
	product: ProductType;
	partNumber?: string;
	[extra: string]: any;
};
export const useProductEvents = ({ product }: Props) => {
	/** can add a fetch if partNumber is provided and product isn't --
	 *    but right now assume product is
	 */
	const { onProductClick } = useContext(EventsContext);
	const { productListData } = useContext(ContentContext) as GTMContainerListType;
	const { settings } = useSettings();

	const onClick = useCallback(
		(clickAction?: (() => Promise<void>) | (() => void), pageNumber?: number) => async () => {
			if (clickAction) {
				await clickAction();
			}
			onProductClick({
				gtm: {
					product,
					listerFlag: false, // TODO... is this needed?
					storeName: settings.storeName,
					settings,
					listName: productListData?.listName,
					listId: productListData?.listId,
					pageNumber,
				},
			});
		},
		[onProductClick, product, productListData, settings]
	);

	return { onClick };
};
