# Shipping

## Toggle single/multiple shipment

Single and multiple shipment is determined by `selectedItems` state variable in `integration\data\core\Content\Shipping.ts`

1. multiple shipments

   - `selectedItems.length === 0`. Multiple shipments order item table view to select item.
   - `selectedItems.length < orderItems.length`. Shipping address and method selection view.

2. single shipment

   - `selectedItems.length === orderItems.length` Shipping address and method selection view..
