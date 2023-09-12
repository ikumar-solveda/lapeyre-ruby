/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { useNotifications } from '@/data/Content/Notifications';
import { useLocalization } from '@/data/Localization';
import { FC, useCallback } from 'react';

export const CopyOrderMessage: FC<{ fullCopy: boolean }> = ({ fullCopy }) => {
	const cart = useLocalization('Routes').Cart;
	const success = useLocalization('success-message');
	const { clearMessage } = useNotifications();
	const onClick = useCallback(() => clearMessage(), [clearMessage]);

	return (
		<LocalizationWithComponent
			text={success[fullCopy ? 'CopyOrder' : 'PartialCopyOrder'].t()}
			components={[
				<Linkable
					type="inline"
					id="view-cart-after-copy"
					data-testid="view-cart-after-copy"
					onClick={onClick}
					href={cart.route.t()}
					key="1"
				/>,
			]}
		/>
	);
};
