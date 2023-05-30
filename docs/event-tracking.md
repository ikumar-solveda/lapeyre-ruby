### Event Tracking

The event context provides a way to register and trigger event handlers for key events in the user experience. Several events are setup to trigger, if handlers are registered for them.

#### Event Handler Registration

Copy `integration/data/core/EventTracker.ts` into the `integration/data/custom`

Use the registerEvent method within a useEffect to register the required event triggers.

#### Example:

```typescript
import { useContext, useEffect } from 'react';
import { EventsContext } from '@/data/context/events';

export const useEventTracker = () => {
	const { registerEvent } = useContext(EventsContext);
	useEffect(() => {
		registerEvent('onPageView', (page) => {
			console.log('onPageView', page);
		});
		registerEvent('onCartView', (order) => {
			console.log('onCartView', order);
		});
		registerEvent('onAddToCart', (product) => {
			console.log('onAddToCart', product);
		});
		registerEvent('onEmptyCart', () => {
			console.log('onEmptyCart');
		});
	}, [registerEvent]);
	return {};
};
```
