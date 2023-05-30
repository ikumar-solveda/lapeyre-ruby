/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { useNotifications } from '@/data/Content/Notifications';
import { useLocalization } from '@/data/Localization';
import { FC, useCallback } from 'react';

export const ShippingInfoError: FC<{ text: string }> = ({ text }) => {
	const cart = useLocalization('Routes').Cart;
	const { clearMessage } = useNotifications();
	const onClick = useCallback(() => clearMessage(), [clearMessage]);

	return (
		<LocalizationWithComponent
			text={text}
			components={[
				<Linkable
					type="inline"
					id="view-cart-after-error"
					data-testid="view-cart-after-error"
					onClick={onClick}
					href={cart.route.t()}
					key="1"
				/>,
			]}
		/>
	);
};
