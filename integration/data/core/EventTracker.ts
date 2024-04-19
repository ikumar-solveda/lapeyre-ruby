/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { EventsContext } from '@/data/context/events';
import { addToCartDelegator } from '@/data/events/delegators/AddToCart';
import { cartPageViewDelegator } from '@/data/events/delegators/CartPageView';
import { cartViewDelegator } from '@/data/events/delegators/CartView';
import { categoryViewDelegator } from '@/data/events/delegators/CategoryView';
import { checkoutDelegator } from '@/data/events/delegators/Checkout';
import { checkoutPageViewDelegator } from '@/data/events/delegators/CheckoutPageView';
import { checkoutPaymentDelegator } from '@/data/events/delegators/CheckoutPayment';
import { checkoutShippingDelegator } from '@/data/events/delegators/CheckoutShipping';
import { itemListViewDelegator } from '@/data/events/delegators/ItemListView';
import { productClickDelegator } from '@/data/events/delegators/ProductClick';
import { productViewDelegator } from '@/data/events/delegators/ProductView';
import { promotionClickDelegator } from '@/data/events/delegators/PromotionClick';
import { promotionViewDelegator } from '@/data/events/delegators/PromotionView';
import { purchaseDelegator } from '@/data/events/delegators/Purchase';
import { removeFromCartDelegator } from '@/data/events/delegators/RemoveFromCart';
import { searchResultsViewDelegator } from '@/data/events/delegators/SearchResultsView';
import { useContext, useEffect } from 'react';

export const useEventTracker = () => {
	const { registerEvent } = useContext(EventsContext);

	useEffect(() => {
		registerEvent('onPageView', () => {
			// do something
		});
		registerEvent('onAddToCart', addToCartDelegator);
		registerEvent('onCategoryView', categoryViewDelegator);
		registerEvent('onProductView', productViewDelegator);
		registerEvent('onProductClick', productClickDelegator);
		registerEvent('onCheckout', checkoutDelegator);
		registerEvent('onCheckoutShipping', checkoutShippingDelegator);
		registerEvent('onCheckoutPayment', checkoutPaymentDelegator);
		registerEvent('onPromotionClick', promotionClickDelegator);
		registerEvent('onPromotionView', promotionViewDelegator);
		registerEvent('onSearchResultsView', searchResultsViewDelegator);
		registerEvent('onItemListView', itemListViewDelegator);
		registerEvent('onCartView', cartViewDelegator);
		registerEvent('onCartPageView', cartPageViewDelegator);
		registerEvent('onRemoveFromCart', removeFromCartDelegator);
		registerEvent('onCheckoutPageView', checkoutPageViewDelegator);
		registerEvent('onPurchase', purchaseDelegator);
	}, [registerEvent]);
	return {};
};
