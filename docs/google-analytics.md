## Google Analytics Integration Overview

The documentation that describes how our stores send data to Google Analytics (Data Collection) as well as
report generation (GA Reporting APIs) inside of Management Center is described here.

[Google Analytics Integration documentation](https://help.hcltechsw.com/commerce/9.1.0/integration/concepts/ga_introduction_916.html)

## Google Analytics & Google Tag Manager Integration

This store will make use of a React library, React Google Tag Manager Module (`react-gtm-module`) to send
custom events (Google Tag Manager custom event types) from the store to Google Tag Manager.

https://www.npmjs.com/package/react-gtm-module

The payload of these events may be different for Universal Analytics and GA4, so there are 2 separate custom events sent.

ie. In most event cases:

- 1 for Universal Analytics
- 1 for GA4

These custom events are parsed in Google Tag Manager (using the data sent to the Google Tag Manager data layer) and transformed into well structured events for both Universal Analytics and GA4 events.

The following are topics about the data layer. It includes code examples on how to push data to the data layer, however since we are using a react library, it helps us push the data.

- [The data layer](https://support.google.com/tagmanager/answer/6164391?hl=en)
- [Push data to the data layer](https://developers.google.com/tag-platform/tag-manager/datalayer#datalayerpush)

## Universal Analytics

Universal Analytics integration is included, but Google has stopped processing the event data as of July 1, 2023 for free accounts. Event processing for paid accounts remains until July 2024, or later. (Check with Google)

- [Basic Tagging](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages)
- [Enhanced ecommerce events](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce)

## GA4 Analytics

Most of the GA4 Analytics events are included that are recommended for online sales.

- [Automatically collected events](https://support.google.com/analytics/answer/9234069?hl=en&ref_topic=13367566&sjid=1142978733444367752-NA)
- [GA4 recommended events](https://support.google.com/analytics/answer/9267735?visit_id=637465761008583948-2791914230&rd=1)

## Custom Events sent to Google Tag Manager

### Event List

| Event                                             | Description                                                                   |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| [onProductView](#event-item-view)                 | When a shopper views an item in the store                                     |
| [onProductClick](#event-item-click)               | When a shopper clicks on an item in the store.                                |
| [onItemListViewed](#event-item-list-viewed)       | When a shopper views a product in a list in the store.                        |
| [onSearchResultsView](#event-search)              | When a shopper performs a keyword search in the store.                        |
| [onSearchResultsView](#event-view-search-results) | When a shopper views the results of a search in the store.                    |
| [onCartView](#event-view-cart)                    | When a shopper views the shopping cart                                        |
| [onAddToCart](#event-add-to-cart)                 | When a shopper adds an item to the shopping cart.                             |
| [onRemoveFromCart](#event-remove-from-cart)       | When a shopper removes an item from the shopping cart.                        |
| [onCheckout](#event-checkout-begin)               | When a shopper begins checkout.                                               |
| [onCheckoutPayment](#event-checkout-payment)      | When a shopper adds payment information during checkout.                      |
| [onCheckoutShipping](#event-checkout-shipping)    | When a shopper adds shipping information during checkout.                     |
| [onPurchase](#event-purchase)                     | When a shopper makes a purchase.                                              |
| [onPromotionView](#event-promotion-view)          | When a shopper views a promotion (marketing/promotion content) in the store.  |
| [onPromotionClick](#event-promotion-click)        | When a shopper clicks a promotion (marketing/promotion content) in the store. |

---

### Event: Item View

_When a shopper views an item in the store._

| Event           | Event Triggered in              | Event Handler                      |
| --------------- | ------------------------------- | ---------------------------------- |
| `onProductView` | (integration) ProductDetails.ts | events/handlers/gtm/ProductView.ts |

GA4 Analytics

- [view_item](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "view_item",
  eventModel: {
    count_view_item: 1,
    currency: "USD",
    items: [
      {
        item_name: "Wooden Angled Chair",
        item_id: "LR-FNTR-0001",
        item_brand: "Home Design",
        item_category: "",
        price: 749.99,
      }
    ],
    value: 749.99
  },
  gtm.uniqueEventId: 359
})
```

Universal Analytics

- [product impression data](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#product-data)

Datalayer push (UA)

```javascript
dataLayer.push({
  event: "productDetail",
  ecommerce: {
    currencyCode: "USD",
    detail: {
      actionField: {list: "Search Results", action: "detail"},
      products: [
        {
          name: "Wooden Angled Chair",
          id: "LR-FNTR-0001",
          price: 749.99,
          brand: "Home Design",
          dimension9: undefined,
          dimension10: "Ruby"
        }
      ]
    }
  },
  gtm.uniqueEventId: 294
})
```

---

### Event: Item Click

_When a shopper clicks on an item in the store._

| Event            | Event Triggered in               | Event Handler                       |
| ---------------- | -------------------------------- | ----------------------------------- |
| `onProductClick` | (integration) \_ProductEvents.ts | events/handlers/gtm/ProductClick.ts |

GA4 Analytics

- [select_item](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_item)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "select_item",
  eventModel: {
    count_select_item: 1,
    currency: "USD",
    items: [
      {
        item_name: "Flared Accent Chair",
        item_id: "LR-FNTR-0002",
        item_brand: "Stockholm",
        item_category: "",
        price: 549.99,
      }
    ]
  },
  gtm.uniqueEventId: 122
})
```

Universal Analytics

- [click action type](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-types)

Datalayer push (UA)

```javascript
dataLayer.push({
  event: "productClick",
  ecommerce: {
    currencyCode: "USD",
    click: {
      actionField: {list: "Search Results", action: "click"},
      products: [
        {
          name: "Wooden Angled Chair",
          id: "LR-FNTR-0001",
          price: 749.99,
          brand: "Home Design",
          dimension9: undefined,
          dimension10: "Ruby"
        }
      ]
    }
  },
  gtm.uniqueEventId: 272
})
```

---

### Event: Item list viewed

_When a shopper views a product in a list in the store._

| Event              | Event Triggered in             | Event Handler                       |
| ------------------ | ------------------------------ | ----------------------------------- |
| `onItemListViewed` | (presentation) ProductGrid.tsx | events/handlers/gtm/ItemListView.ts |

GA4 Analytics

- [view_item_list](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item_list)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "view_item_list",
  currency: "USD",
  eventModel: {
    count_view_item_list: 1,
    item_list_name: "Item list",
    item_list_id: "Item list",
    items: [
      {
        item_name: "Modern Pendant Light",
        item_id: "LR-LITB-0001",
        hclMarketplace: "Ruby",
        index: 0,
        price: 135,
        item_brand: "Style Home",
        item_list_name: "Item list",
        currency: "USD",
        affiliation: undefined,
        hclMarketplaceSeller: undefined
      },
      {
        item_name: "Weathered Pendant Light",
        item_id: "LR-LITB-0002",
        hclMarketplace: "Ruby",
        index: 1,
        price: 160,
        item_brand: "Bender Home Fashions",
        item_list_name: "Item list",
        currency: "USD",
        affiliation: undefined,
        hclMarketplaceSeller: undefined
      },
      {
        item_name: "Solid Pendant Light",
        item_id: "LR-LITB-0003",
        hclMarketplace: "Ruby",
        index: 2,
        price: 145,
        item_brand: "Kerry's Glass",
        item_list_name: "Item list",
        currency: "USD",
        affiliation: undefined,
        hclMarketplaceSeller: undefined
      },
      {
        item_name: "Brushed Pendant Light",
        item_id: "LR-LITB-0004",
        hclMarketplace: "Ruby",
        index: 3,
        price: 135,
        item_brand: "Kerry's Glass",
        item_list_name: "Item list",
        currency: "USD",
        affiliation: undefined,
        hclMarketplaceSeller: undefined
      },
      {
        item_name: "Circular Chandelier",
        item_id: "LR-LITB-0005",
        hclMarketplace: "Ruby",
        index: 4,
        price: 349.99,
        item_brand: "Kerry's Glass",
        item_list_name: "Item list",
        currency: "USD",
        affiliation: undefined,
        hclMarketplaceSeller: undefined
      },
      {
        item_name: "Raindrop Chandelier",
        item_id: "LR-LITB-0006",
        hclMarketplace: "Ruby",
        index: 5,
        price: 1749,
        item_brand: "Stockholm",
        item_list_name: "Item list",
        currency: "USD",
        affiliation: undefined,
        hclMarketplaceSeller: undefined
      },
      {
        item_name: "Rattan Ceiling Light",
        item_id: "LR-LITB-0007",
        hclMarketplace: "Ruby",
        index: 6,
        price: 749.99,
        item_brand: "Stockholm",
        item_list_name: "Item list",
        currency: "USD",
        affiliation: undefined,
        hclMarketplaceSeller: undefined
      },
      {
        item_name: "Nordic Lamp",
        item_id: "LR-LITB-0008",
        hclMarketplace: "Ruby",
        index: 7,
        price: 249.99,
        item_brand: "Stockholm",
        item_list_name: "Item list",
        currency: "USD",
        affiliation: undefined,
        hclMarketplaceSeller: undefined
      }
    ],
    hclMarketplace: "Ruby"
  },
  gtm.uniqueEventId: 128
})
```

Universal Analytics

- [page view](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages)

Datalayer push (UA)

```javascript
dataLayer.push({
  event: "productImpression",
  ecommerce: {
    currencyCode: "USD",
    impressions: [
      {
        name: "Modern Pendant Light",
        id: "LR-LITB-0001",
        position: 0,
        price: 135,
        brand: "Style Home",
        list: "Item list",
        dimension9: undefined,
        dimension10: "Ruby",
        affiliation: undefined
      },
      {
        name: "Weathered Pendant Light",
        id: "LR-LITB-0002",
        position: 1,
        price: 160,
        brand: "Bender Home Fashions",
        list: "Item list",
        dimension9: undefined,
        dimension10: "Ruby",
        affiliation: undefined
      },
      {
        name: "Solid Pendant Light",
        id: "LR-LITB-0003",
        position: 2,
        price: 145,
        brand: "Kerry's Glass",
        list: "Item list",
        dimension9: undefined,
        dimension10: "Ruby",
        affiliation: undefined
      },
      {
        name: "Brushed Pendant Light",
        id: "LR-LITB-0004",
        position: 3,
        price: 135,
        brand: "Kerry's Glass",
        list: "Item list",
        dimension9: undefined,
        dimension10: "Ruby",
        affiliation: undefined
      },
      {
        name: "Circular Chandelier",
        id: "LR-LITB-0005",
        position: 4,
        price: 349.99,
        brand: "Kerry's Glass",
        list: "Item list",
        dimension9: undefined,
        dimension10: "Ruby",
        affiliation: undefined
      },
      {
        name: "Raindrop Chandelier",
        id: "LR-LITB-0006",
        position: 5,
        price: 1749,
        brand: "Stockholm",
        list: "Item list",
        dimension9: undefined,
        dimension10: "Ruby",
        affiliation: undefined
      },
      {
        name: "Rattan Ceiling Light",
        id: "LR-LITB-0007",
        position: 6,
        price: 749.99,
        brand: "Stockholm",
        list: "Item list",
        dimension9: undefined,
        dimension10: "Ruby",
        affiliation: undefined
      },
      {
        name: "Nordic Lamp",
        id: "LR-LITB-0008",
        position: 7,
        price: 249.99,
        brand: "Stockholm",
        list: "Item list",
        dimension9: undefined,
        dimension10: "Ruby",
        affiliation: undefined
      }
    ],
    dimension10: "Ruby"
  },
  gtm.uniqueEventId: 122
})
```

---

### Event: Search

_When a shopper performs a keyword search in the store._

| Event                 | Event Triggered in             | Event Handler                            |
| --------------------- | ------------------------------ | ---------------------------------------- |
| `onSearchResultsView` | (presentation) ProductGrid.tsx | events/handlers/gtm/SearchResultsView.ts |

GA4 Analytics

- [search](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#search)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "search",
  eventModel: {search_term: "table", search_type: "Product", number_of_results: 10},
  gtm.uniqueEventId: 109
})
```

Universal Analytics

- [page view](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages)

Datalayer push (UA)

```javascript
dataLayer.push({
  event: "keywordSearch",
  pageCategory: "Onsite Search",
  onsiteSearch: "Successful Search",
  searchTerm: "chair",
  productResults: 9,
  gtm.uniqueEventId: 389
})
```

---

### Event: View Search Results

_When a shopper views the results of a search in the store._

| Event                 | Event Triggered in             | Event Handler                            |
| --------------------- | ------------------------------ | ---------------------------------------- |
| `onSearchResultsView` | (presentation) ProductGrid.tsx | events/handlers/gtm/SearchResultsView.ts |

GA4 Analytics

- [view_search_results](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#view_search_results)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "view_search_results",
  eventModel: {search_term: "table suited", search_type: "Product", number_of_results: 0},
  gtm.uniqueEventId: 124
})
```

---

### Event: View cart

_When a shopper views the shopping cart._

| Event        | Event Triggered in                    | Event Handler                   |
| ------------ | ------------------------------------- | ------------------------------- |
| `onCartView` | (presentation) content/Cart/index.tsx | events/handlers/gtm/CartView.ts |

GA4 Analytics

- [view_cart](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_cart)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "view_cart",
  eventModel: {
    count_view_cart: 1,
    currency: "USD",
    items: [
      {
        item_name: "Stonehenge Closet Chest of Drawers",
        item_id: "BD-DRSS-0002-0001",
        price: "999.99000",
        item_brand: "Stonehenge",
        item_category: "Dressers",
        item_variant: {Color: "blonde"},
        quantity: 1,
        currency: "USD",
        discount: "-214.60000",
      },
      {
        item_name: "Style Home InOffice Double Sofa",
        item_id: "LR-FNTR-CO-0002-0003",
        price: "569.99000",
        item_brand: "Style Home",
        item_category: "LivingRoomFurniture",
        item_variant: {Color: "darkgrey", Size: "48x6x48"},
        quantity: 1,
        currency: "USD",
        discount: "-10.40000",
      }
    ],
    value: "1344.98000",
  },
  gtm.uniqueEventId: 268
})
```

Universal Analytics

- [page view](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages)

---

### Event: Add to cart

_When a shopper adds an item to the shopping cart._

| Event         | Event Triggered in              | Event Handler                    |
| ------------- | ------------------------------- | -------------------------------- |
| `onAddToCart` | (integration) ProductDetails.ts | events/handlers/gtm/AddToCart.ts |

GA4 Analytics

- [add_to_cart](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_to_cart)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "add_to_cart",
  eventModel: {
    count_add_to_cart: 1,
    currency: "USD",
    items: [
      {
        item_id: "BD-BEDS-0001-0001",
        item_name: "Twin Bunk Bed",
        item_brand: "Sleepy Head",
        item_category: "Beds",
        price: 559.99,
        currency: "USD",
        quantity: 1,
      }
    ],
    value: 559.99,
  },
  gtm.uniqueEventId: 213
})
```

Universal Analytics

- [add action type](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-types)

Datalayer push (UA)

```javascript
dataLayer.push({
  event: "addToCart",
  ecommerce: {
    currencyCode: "USD",
    add: {
      products: [
        {
          name: "StyleHome Comfy Dining chair",
          id: "DR-CHRS-0004-0001",
          variant: {Color: "lightgrey"},
          dimension9: undefined,
          brand: "Stonehenge",
          category: "DiningChairs",
          price: 225,
          quantity: 1
        }
      ]
    },
    dimension10: "Ruby"
  },
  gtm.uniqueEventId: 585
})
```

---

### Event: Remove from cart

_When a shopper removes an item from the shopping cart._

| Event              | Event Triggered in          | Event Handler                         |
| ------------------ | --------------------------- | ------------------------------------- |
| `onRemoveFromCart` | (presentation) Quantity.tsx | events/handlers/gtm/RemoveFromCart.ts |

GA4 Analytics

- [remove_from_cart](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#remove_from_cart)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "remove_from_cart",
  eventModel: {
    currency: "USD",
    value: "189.00000",
    items: [
      {
        item_id: "BR-LGHT-0001-0001",
        item_name: "Cluster globe ceiling light",
        item_variant: "BR-LGHT-0001-0001",
        price: "189.00000",
        currency: "USD",
        quantity: 1,
      }
    ],
    count_remove_from_cart: 1,
  },
  gtm.uniqueEventId: 284
})
```

Universal Analytics

- [remove action type](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-types)

Datalayer push (UA)

```javascript
dataLayer.push({
  event: "removeFromCart",
  ecommerce: {
    currencyCode: "USD",
    remove: {
      products: [
        {
          name: "Wooden Angled Chair",
          id: "LR-FNTR-0001-0001",
          price: 749.99,
          quantity: 1,
          dimension9: undefined,
          dimension10: "Ruby"
        }
      ]
    }
  },
  gtm.uniqueEventId: 1060
})
```

---

### Event: Checkout begin

_When a shopper begins checkout._

| Event        | Event Triggered in                | Event Handler                   |
| ------------ | --------------------------------- | ------------------------------- |
| `onCheckout` | (integration) \_CheckoutEvents.ts | events/handlers/gtm/Checkout.ts |

GA4 Analytics

- [begin_checkout](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#begin_checkout)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "begin_checkout",
  eventModel: {
    currency: "USD",
    value: "1344.98000",
    items: [
      {
        item_id: "BD-DRSS-0002-0001",
        item_name: "Stonehenge Closet Chest of Drawers",
        price: "999.99000",
        quantity: 1,
        currency: "USD",
      },
      {
        item_id: "LR-FNTR-CO-0002-0003",
        item_name: "Style Home InOffice Double Sofa",
        price: "569.99000",
        quantity: 1,
        currency: "USD",
      }
    ],
    count_begin_checkout: 1
  },
  gtm.uniqueEventId: 85
})
```

Universal Analytics

- [checkout action type](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-types)

Datalayer push (UA)

```javascript
dataLayer.push({
  event: "checkout",
  ecommerce: {
    currencyCode: "USD",
    checkout: {
      actionField: {step: 1, option: "shipping", action: "checkout"},
      products: [
        {
          id: "LR-FNTR-0001-0001",
          name: "Wooden Angled Chair",
          price: "749.99000",
          quantity: 1,
          currency: "USD",
          shippingTier: "Mail",
        }
      ]
    },
  },
  gtm.uniqueEventId: 260
})
```

---

### Event: Checkout payment

_When a shopper adds payment information during checkout._

| Event               | Event Triggered in                | Event Handler                          |
| ------------------- | --------------------------------- | -------------------------------------- |
| `onCheckoutPayment` | (integration) \_CheckoutEvents.ts | events/handlers/gtm/CheckoutPayment.ts |

GA4 Analytics

- [add_payment_info](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_payment_info)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "add_payment_info",
  eventModel: {
    currency: "USD",
    value: "1344.98000",
    payment_type: "COD",
    items: [
      {
        item_id: "BD-DRSS-0002-0001",
        item_name: "Stonehenge Closet Chest of Drawers",
        price: "999.99000",
        quantity: 1,
        currency: "USD",
      },
      {
        item_id: "LR-FNTR-CO-0002-0003",
        item_name: "Style Home InOffice Double Sofa",
        price: "569.99000",
        quantity: 1,
        currency: "USD",
      }
    ],
    count_add_payment_info: 1
  },
  gtm.uniqueEventId: 131
})
```

Universal Analytics

- [checkout action type](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-types)

Datalayer push (UA)

```javascript
dataLayer.push({
  event: "checkout",
  ecommerce: {
    currencyCode: "USD",
    checkout: {
      actionField: {step: 2, option: "payment", action: "checkout"},
      products: [
        {
          id: "LR-FNTR-0001-0001",
          name: "Wooden Angled Chair",
          price: "749.99000",
          quantity: 1,
          currency: "USD",
          shippingTier: "Mail",
        }
      ]
    },
  },
  gtm.uniqueEventId: 278
})
```

---

### Event: Checkout shipping

_When a shopper adds shipping information during checkout._

| Event                | Event Triggered in                | Event Handler                           |
| -------------------- | --------------------------------- | --------------------------------------- |
| `onCheckoutShipping` | (integration) \_CheckoutEvents.ts | events/handlers/gtm/CheckoutShipping.ts |

GA4 Analytics

- [add_shipping_info](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_shipping_info)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "add_shipping_info",
  eventModel: {
    currency: "USD",
    value: "1344.98000",
    shipping_tier: "Mail",
    items: [
      {
        item_id: "BD-DRSS-0002-0001",
        item_name: "Stonehenge Closet Chest of Drawers",
        price: "999.99000",
        quantity: 1,
        currency: "USD",
      },
      {
        item_id: "LR-FNTR-CO-0002-0003",
        item_name: "Style Home InOffice Double Sofa",
        price: "569.99000",
        quantity: 1,
        currency: "USD",
      }
    ],
    count_add_shipping_info: 1
  },
  gtm.uniqueEventId: 111
})
```

Universal Analytics

- [checkout action type](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-types)

Datalayer push (UA)

```javascript
dataLayer.push({
  event: "checkout",
  ecommerce: {
    currencyCode: "USD",
    checkout: {
      actionField: {step: 3, option: "review", action: "checkout"},
      products: [
        {
          id: "LR-FNTR-0001-0001",
          name: "Wooden Angled Chair",
          price: "749.99000",
          quantity: 1,
          currency: "USD",
          shippingTier: "Mail",
        }
      ]
    },
  },
  gtm.uniqueEventId: 300
})
```

---

### Event: Purchase

_When a shopper makes a purchase._

| Event        | Event Triggered in        | Event Handler                   |
| ------------ | ------------------------- | ------------------------------- |
| `onPurchase` | (integration) CheckOut.ts | events/handlers/gtm/Purchase.ts |

GA4 Analytics

- [purchase](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#purchase)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "GA4_purchase",
  eventModel: {
    transaction_id: "23032913",
    currency: "USD",
    value: "2024.98000",
    tax: "0",
    shipping: "0.00000",
    items: [
      {
        item_name: "Sleepy Head Elegant Queen Bed",
        item_id: "BD-BEDS-0002-0001",
        price: "1249.99000",
        item_brand: "Bender Home Fashions",
        item_category: "Beds",
        item_list_name: "Beds",
        quantity: 1,
        currency: "USD",
        tax: "0",
        discount: "-125.00000",
      },
      {
        item_name: "Luncheon Table",
        item_id: "DR-TBLS-0001-0001",
        price: "999.99000",
        item_brand: "Moderno",
        item_category: "DiningTables",
        item_list_name: "DiningTables",
        quantity: 1,
        currency: "USD",
        tax: "0",
        discount: "-100.00000",
      }
    ],
    count_purchase: 1
  },
  gtm.uniqueEventId: 582
})
```

Universal Analytics

- [purchase action type](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-types)

Datalayer push (UA)

```javascript
dataLayer.push({
  event: "purchase",
  ecommerce: {
    currencyCode: "USD",
    purchase: {
      actionField: {
        id: "8665247",
        affiliation: "Ruby",
        revenue: "1499.98000",
        tax: "0",
        shipping: "0.00000",
        coupon: "0.00000",
        list: ["LivingRoomFurniture"],
        action: "purchase"
      },
      products: [
        {
          name: "Wooden Angled Chair",
          id: "LR-FNTR-0001-0001",
          price: "749.99000",
          brand: "Home Design",
          category: "LivingRoomFurniture",
          quantity: 2,
          dimension9: undefined
        }
      ]
    },
    hcl_account: null,
    dimension10: "Ruby"
  },
  gtm.uniqueEventId: 1480
})
```

---

### Event: Promotion view

_When a shopper views a promotion (marketing/promotion content) in the store._

| Event             | Event Triggered in                   | Event Handler                        |
| ----------------- | ------------------------------------ | ------------------------------------ |
| `onPromotionView` | (integration) \_ESpotDataFromName.ts | events/handlers/gtm/PromotionView.ts |

GA4 Analytics

- [view_promotion](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#view_promotion)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "view_promotion",
  eventModel: {
    count_view_promotion: 1,
    creative_name: "MarketingContent",
    creative_slot: "DiningRoomHeroContent",
    promotion_id: "17510",
    promotion_name: "DiningRoomHeroContent",
    items: undefined
  },
  gtm.uniqueEventId: 3237
})
```

Universal Analytics

- [promotion impression data](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#promotion-data)

Datalayer push (UA)

```javascript
dataLayer.push({
  event: "promoView",
  ecommerce: {
    promoView: {
      promotions: [{name: "LivingRoomHeroContent", id: "17507", creative: "MarketingContent"}]
    }
  },
  gtm.uniqueEventId: 130
})
```

---

### Event: Promotion click

_When a shopper clicks a promotion (marketing/promotion content) in the store._

| Event              | Event Triggered in                                                                                     | Event Handler                         |
| ------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `onPromotionClick` | (integration) CatalogEntryRecommendation.ts, <br/> CategoryRecommendation.ts, <br/> \_ContentEvents.ts | events/handlers/gtm/PromotionClick.ts |

GA4 Analytics

- [select_promotion](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#select_promotion)

Datalayer push (GA4)

```javascript
dataLayer.push({
  event: "select_promotion",
  eventModel: {
    count_select_promotion: 1,
    creative_name: "CatalogEntry",
    creative_slot: "Soft Plush Sofa",
    promotion_id: "11002",
    promotion_name: "Home recommended products",
    items: [{item_id: "LR-FNTR-CO-0007", item_name: "Soft Plush Sofa"}]
  },
  gtm.uniqueEventId: 2183
})
```

Universal Analytics

- [promo_click action type](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-types)

Datalayer push (UA)

```javascript
dataLayer.push({
  event: "promotionClick",
  ecommerce: {promoClick: {promotions: [{name: "FooterStoreLogo", id: "17502"}]}},
  gtm.uniqueEventId: 213
})
```

---
