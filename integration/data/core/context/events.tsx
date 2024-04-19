/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */
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
import { PageDataFromId } from '@/data/types/PageDataFromId';
import { ProductType } from '@/data/types/Product';
import { noop } from 'lodash';
import { FC, PropsWithChildren, createContext, useCallback, useState } from 'react';

type EventHandlers = {
	onPageView: (page: PageDataFromId['page']) => void;
	onCategoryView: typeof categoryViewDelegator;
	onProductView: typeof productViewDelegator;
	onProductClick: typeof productClickDelegator;
	onCartPageView: typeof cartPageViewDelegator;
	onCartView: typeof cartViewDelegator;
	onAddToCart: typeof addToCartDelegator;
	onAddToWishlist: (product: ProductType, quantity: number) => void;
	onCheckout: typeof checkoutDelegator;
	onCheckoutShipping: typeof checkoutShippingDelegator;
	onCheckoutPayment: typeof checkoutPaymentDelegator;
	onCheckoutPageView: typeof checkoutPageViewDelegator;
	onEmptyCart: () => void;
	onPromotionClick: typeof promotionClickDelegator;
	onPromotionView: typeof promotionViewDelegator;
	onSearchResultsView: typeof searchResultsViewDelegator;
	onItemListView: typeof itemListViewDelegator;
	onRemoveFromCart: typeof removeFromCartDelegator;
	onPurchase: typeof purchaseDelegator;
};

type RegisterEvent = <T extends keyof EventHandlers>(
	eventType: T,
	handler: EventHandlers[T]
) => void;

type EventData = Record<keyof EventHandlers, any>;

export type EventsContextType = {
	addEventData: (eventType: keyof EventHandlers, data: any) => void;
	clearEventData: (eventType: keyof EventHandlers) => void;
	eventData: EventData;
	registerEvent: RegisterEvent;
	onPageView: EventHandlers['onPageView'];
	onCategoryView: EventHandlers['onCategoryView'];
	onProductView: EventHandlers['onProductView'];
	onProductClick: EventHandlers['onProductClick'];
	onCartPageView: EventHandlers['onCartPageView'];
	onCartView: EventHandlers['onCartView'];
	onAddToCart: EventHandlers['onAddToCart'];
	onAddToWishlist: EventHandlers['onAddToWishlist'];
	onCheckout: EventHandlers['onCheckout'];
	onCheckoutShipping: EventHandlers['onCheckoutShipping'];
	onCheckoutPayment: EventHandlers['onCheckoutPayment'];
	onCheckoutPageView: EventHandlers['onCheckoutPageView'];
	onEmptyCart: EventHandlers['onEmptyCart'];
	onPromotionClick: EventHandlers['onPromotionClick'];
	onPromotionView: EventHandlers['onPromotionView'];
	onSearchResultsView: EventHandlers['onSearchResultsView'];
	onItemListView: EventHandlers['onItemListView'];
	onRemoveFromCart: EventHandlers['onRemoveFromCart'];
	onPurchase: EventHandlers['onPurchase'];
};

export const EventsContext = createContext<EventsContextType>({
	addEventData: noop,
	clearEventData: noop,
	eventData: {} as EventData,
	registerEvent: noop,
	onPageView: noop,
	onCategoryView: noop as EventHandlers['onCategoryView'],
	onProductView: noop as EventHandlers['onProductView'],
	onProductClick: noop as EventHandlers['onProductClick'],
	onCartPageView: noop as EventHandlers['onCartPageView'],
	onCartView: noop as EventHandlers['onCartView'],
	onAddToCart: noop as EventHandlers['onAddToCart'],
	onAddToWishlist: noop,
	onCheckout: noop as EventHandlers['onCheckout'],
	onCheckoutPayment: noop as EventHandlers['onCheckoutPayment'],
	onCheckoutShipping: noop as EventHandlers['onCheckoutShipping'],
	onCheckoutPageView: noop as EventHandlers['onCheckoutPageView'],
	onEmptyCart: noop,
	onPromotionClick: noop as EventHandlers['onPromotionClick'],
	onPromotionView: noop as EventHandlers['onPromotionView'],
	onSearchResultsView: noop as EventHandlers['onSearchResultsView'],
	onItemListView: noop as EventHandlers['onItemListView'],
	onRemoveFromCart: noop as EventHandlers['onRemoveFromCart'],
	onPurchase: noop as EventHandlers['onPurchase'],
});
const Provider = EventsContext.Provider;

export const EventsProvider: FC<PropsWithChildren> = ({ children }) => {
	const [onPageView, setOnPageView] = useState<EventHandlers['onPageView']>(() => noop);
	const [onCategoryView, setOnCategoryView] = useState<EventHandlers['onCategoryView']>(
		() => noop as EventHandlers['onCategoryView']
	);
	const [onProductView, setOnProductView] = useState<EventHandlers['onProductView']>(
		() => noop as EventHandlers['onProductView']
	);
	const [onProductClick, setOnProductClick] = useState<EventHandlers['onProductClick']>(
		() => noop as EventHandlers['onProductClick']
	);
	const [onCartPageView, setOnCartPageView] = useState<EventHandlers['onCartPageView']>(
		() => noop as EventHandlers['onCartPageView']
	);
	const [onCartView, setOnCartView] = useState<EventHandlers['onCartView']>(
		() => noop as EventHandlers['onCartView']
	);
	const [onAddToCart, setOnAddToCart] = useState<EventHandlers['onAddToCart']>(
		() => noop as EventHandlers['onAddToCart']
	);
	const [onAddToWishlist, setOnAddToWishlist] = useState<EventHandlers['onAddToWishlist']>(
		() => noop
	);
	const [onCheckout, setOnCheckout] = useState<EventHandlers['onCheckout']>(
		() => noop as EventHandlers['onCheckout']
	);
	const [onCheckoutShipping, setOnCheckoutShipping] = useState<EventHandlers['onCheckoutShipping']>(
		() => noop as EventHandlers['onCheckoutShipping']
	);
	const [onCheckoutPayment, setOnCheckoutPayment] = useState<EventHandlers['onCheckoutPayment']>(
		() => noop as EventHandlers['onCheckoutPayment']
	);
	const [onCheckoutPageView, setOnCheckoutPageView] = useState<EventHandlers['onCheckoutPageView']>(
		() => noop as EventHandlers['onCheckoutPageView']
	);
	const [onRemoveFromCart, setOnRemoveFromCart] = useState<EventHandlers['onRemoveFromCart']>(
		() => noop as EventHandlers['onRemoveFromCart']
	);
	const [onEmptyCart, setOnEmptyCart] = useState<EventHandlers['onEmptyCart']>(
		() => noop as EventHandlers['onRemoveFromCart']
	);
	const [onPromotionClick, setOnPromotionClick] = useState<EventHandlers['onPromotionClick']>(
		() => noop as EventHandlers['onPromotionClick']
	);
	const [onPromotionView, setOnPromotionView] = useState<EventHandlers['onPromotionView']>(
		() => noop as EventHandlers['onPromotionView']
	);
	const [onSearchResultsView, setOnSearchResultsView] = useState<
		EventHandlers['onSearchResultsView']
	>(() => noop as EventHandlers['onSearchResultsView']);
	const [onItemListView, setOnItemListView] = useState<EventHandlers['onItemListView']>(
		() => noop as EventHandlers['onItemListView']
	);
	const [onPurchase, setOnPurchase] = useState<EventHandlers['onPurchase']>(
		() => noop as EventHandlers['onPurchase']
	);
	const [eventData, setEventData] = useState<EventData>({} as EventData);
	const addEventData = useCallback((eventType: keyof EventHandlers, eventData: any) => {
		setEventData((old) => ({
			...old,
			[eventType]: old[eventType] ? { ...old[eventType], ...eventData } : { ...eventData },
		}));
	}, []);
	const clearEventData = useCallback((eventType: keyof EventHandlers) => {
		setEventData((old) => ({ ...old, [eventType]: {} }));
	}, []);

	// eslint-disable-next-line complexity
	const registerEvent: RegisterEvent = useCallback((eventType, handler) => {
		switch (eventType) {
			case 'onPageView':
				setOnPageView(() => handler);
				break;
			case 'onCategoryView':
				setOnCategoryView(() => handler as EventHandlers['onCategoryView']);
				break;
			case 'onProductView':
				setOnProductView(() => handler as EventHandlers['onProductView']);
				break;
			case 'onProductClick':
				setOnProductClick(() => handler as EventHandlers['onProductClick']);
				break;
			case 'onCartPageView':
				setOnCartPageView(() => handler as EventHandlers['onCartPageView']);
				break;
			case 'onCartView':
				setOnCartView(() => handler as EventHandlers['onCartView']);
				break;
			case 'onAddToCart':
				setOnAddToCart(() => handler as EventHandlers['onAddToCart']);
				break;
			case 'onAddToWishlist':
				setOnAddToWishlist(() => handler);
				break;
			case 'onCheckout':
				setOnCheckout(() => handler as EventHandlers['onCheckout']);
				break;
			case 'onCheckoutShipping':
				setOnCheckoutShipping(() => handler as EventHandlers['onCheckoutShipping']);
				break;
			case 'onCheckoutPayment':
				setOnCheckoutPayment(() => handler as EventHandlers['onCheckoutPayment']);
				break;
			case 'onCheckoutPageView':
				setOnCheckoutPageView(() => handler as EventHandlers['onCheckoutPageView']);
				break;
			case 'onPromotionClick':
				setOnPromotionClick(() => handler as EventHandlers['onPromotionClick']);
				break;
			case 'onItemListView':
				setOnItemListView(() => handler as EventHandlers['onItemListView']);
				break;
			case 'onSearchResultsView':
				setOnSearchResultsView(() => handler as EventHandlers['onSearchResultsView']);
				break;
			case 'onRemoveFromCart':
				setOnRemoveFromCart(() => handler as EventHandlers['onRemoveFromCart']);
				break;
			case 'onEmptyCart':
				setOnEmptyCart(() => handler as EventHandlers['onEmptyCart']);
				break;
			case 'onPurchase':
				setOnPurchase(() => handler as EventHandlers['onPurchase']);
				break;
			case 'onPromotionView':
				setOnPromotionView(() => handler as EventHandlers['onPromotionView']);
				break;
		}
	}, []);

	return (
		<Provider
			value={{
				registerEvent,
				addEventData,
				clearEventData,
				eventData,
				onPageView,
				onCategoryView,
				onProductView,
				onProductClick,
				onCartPageView,
				onCartView,
				onAddToCart,
				onAddToWishlist,
				onCheckout,
				onCheckoutShipping,
				onCheckoutPayment,
				onCheckoutPageView,
				onEmptyCart,
				onPromotionClick,
				onPromotionView,
				onSearchResultsView,
				onItemListView,
				onRemoveFromCart,
				onPurchase,
			}}
		>
			{children}
		</Provider>
	);
};
