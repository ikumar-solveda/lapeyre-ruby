/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { useLocalization } from '@/data/Localization';
import { orderItemTableAttributesButtonSX } from '@/components/content/OrderItemTable/styles/orderItemTableAttributesButton';

type Props = {
	isExpanded: boolean;
	setIsExpanded: Dispatch<SetStateAction<boolean>>;
};

export const OrderItemDrawerToggle: FC<Props> = ({ isExpanded, setIsExpanded }) => {
	const orderItemTableNLS = useLocalization('OrderItemTable');

	return (
		<Button
			variant="outlined"
			size="small"
			startIcon={isExpanded ? <ArrowDropDown /> : <ArrowRight />}
			onClick={() => setIsExpanded((current) => !current)}
			sx={orderItemTableAttributesButtonSX}
		>
			{isExpanded ? orderItemTableNLS.Labels.hideAttrs.t() : orderItemTableNLS.Labels.showAttrs.t()}
		</Button>
	);
};
