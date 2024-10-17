# Store feature FlexFlow tag

The two components `FlowIfEnabled` and `FlowIfDisabled` in `presentation/components/core/blocks/FlexFlow` provide a convenient way to render child components based on the enablement value of a specific store feature.

## example of GuestShopping FlexFlow

- if feature enabled

```tsx
<FlowIfEnabled feature={EMS_STORE_FEATURE.GUEST_SHOPPING}>
	<child
		components
		//...
	/>
</FlowIfEnabled>
```

- if feature disabled

```tsx
<FlowIfDisabled feature={EMS_STORE_FEATURE.GUEST_SHOPPING}>
	<child
		components
		//...
	/>
</FlowIfDisabled>
```
