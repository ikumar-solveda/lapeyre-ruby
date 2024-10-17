# Selected Store State Management

Selected Store (for pickup) is managed in the following ways according to current UXD.

## Select Store from Store Locator Page

When a shopper is on the Store Locator page and tries to select a physical store as their preferred store for pickup, the following happens:

- If the shopper has items with "Pickup In Store" selected in their cart:

  - `selectedStore` will be set to these items.
  - The store locator's `selectedStore` will update to the physical store.

- If the shopper doesn't have any "Pickup In Store" items:
  - `selectedStore` will be directly set to the Store Locator State.

## Select Store from Product Pages (PLP, PDP) During Add to Cart

The "set selected store" behavior should have the same behavior as mentioned in the [Select Store from Store Locator Page](#select-store-from-store-locator-page).

In addition, if the shopper doesn't have a cart yet, the `Add to Cart` call will add the item to the cart with the specific selected store and `Pickup` ship mode.

## Selected Store Might Change to the Pickup Store in Cart After Shopper Login

In this scenario, a shopper who does not have a cart selects a store as their preferred pickup location and logs in as a registered shopper. If the registered shopper already has items in the cart for pickup, the selected store will be updated to the pickup store specified in their current cart.
