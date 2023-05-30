/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Order } from '@/data/types/Order';
import { PageDataFromId } from '@/data/types/PageDataFromId';
import { ProductType } from '@/data/types/Product';
import { noop } from 'lodash';
import { FC, createContext, useState, PropsWithChildren, useCallback } from 'react';

type EventHandlers = {
	onPageView: (page: PageDataFromId['page']) => void;
	onProductView: (product: ProductType) => void;
	onCartView: (order: Order) => void;
	onAddToCart: (product: ProductType, quantity: number) => void;
	onAddToWishlist: (product: ProductType, quantity: number) => void;
	onCheckout: (order: Order) => void;
	onEmptyCart: () => void;
};

type RegisterEvent = <T extends keyof EventHandlers>(
	eventType: T,
	handler: EventHandlers[T]
) => void;

export type EventsContextType = {
	registerEvent: RegisterEvent;
	onPageView: EventHandlers['onPageView'];
	onProductView: EventHandlers['onProductView'];
	onCartView: EventHandlers['onCartView'];
	onAddToCart: EventHandlers['onAddToCart'];
	onAddToWishlist: EventHandlers['onAddToWishlist'];
	onCheckout: EventHandlers['onCheckout'];
	onEmptyCart: EventHandlers['onEmptyCart'];
};

export const EventsContext = createContext<EventsContextType>({
	registerEvent: noop,
	onPageView: noop,
	onProductView: noop,
	onCartView: noop,
	onAddToCart: noop,
	onAddToWishlist: noop,
	onCheckout: noop,
	onEmptyCart: noop,
});
const Provider = EventsContext.Provider;

export const EventsProvider: FC<PropsWithChildren> = ({ children }) => {
	const [onPageView, setOnPageView] = useState<EventHandlers['onPageView']>(() => noop);
	const [onProductView, setOnProductView] = useState<EventHandlers['onProductView']>(() => noop);
	const [onCartView, setOnCartView] = useState<EventHandlers['onCartView']>(() => noop);
	const [onAddToCart, setOnAddToCart] = useState<EventHandlers['onAddToCart']>(() => noop);
	const [onAddToWishlist, setOnAddToWishlist] = useState<EventHandlers['onAddToWishlist']>(
		() => noop
	);
	const [onCheckout, setOnCheckout] = useState<EventHandlers['onCheckout']>(() => noop);
	const [onEmptyCart, setOnEmptyCart] = useState<EventHandlers['onEmptyCart']>(() => noop);

	const registerEvent: RegisterEvent = useCallback((eventType, handler) => {
		switch (eventType) {
			case 'onPageView':
				setOnPageView(() => handler);
				break;
			case 'onProductView':
				setOnProductView(() => handler);
				break;
			case 'onCartView':
				setOnCartView(() => handler);
				break;
			case 'onAddToCart':
				setOnAddToCart(() => handler);
				break;
			case 'onAddToWishlist':
				setOnAddToWishlist(() => handler);
				break;
			case 'onCheckout':
				setOnCheckout(() => handler);
				break;
			case 'onEmptyCart':
				setOnEmptyCart(() => handler);
				break;
		}
	}, []);

	return (
		<Provider
			value={{
				registerEvent,
				onPageView,
				onProductView,
				onCartView,
				onAddToCart,
				onAddToWishlist,
				onCheckout,
				onEmptyCart,
			}}
		>
			{children}
		</Provider>
	);
};
