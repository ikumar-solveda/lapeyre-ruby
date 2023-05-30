/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useState } from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import { ResponseProductAttribute } from '@/data/types/Product';
import { OrderItemDrawerToggle } from '@/components/content/OrderItemTable/parts/DrawerToggle';

type Props = {
	attributes: ResponseProductAttribute[];
};

export const OrderItemAttributeDrawer: FC<Props> = ({ attributes }) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	return (
		<>
			<OrderItemDrawerToggle isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
			{isExpanded ? (
				<Stack spacing={0.25}>
					{attributes.map(({ identifier, name, values }, i: number) => (
						<Stack
							key={`order-item-attribute-${i}`}
							direction={{ xs: 'column', md: 'row' }}
							spacing={0.5}
							alignItems={{ xs: 'left', md: 'center' }}
						>
							<Typography
								variant="body2"
								component="span"
								id="orderItem-attributeName"
								data-testid="orderItem-attributeName"
							>
								{`${name}:`}
							</Typography>
							{values.map(({ value }, i: number) => (
								<Typography
									key={`order-item-attribute-${identifier}-${i}`}
									variant="body1"
									component="span"
									data-testid="orderItem-attributeValue"
									id="orderItem-attributeValue"
								>
									{value}
								</Typography>
							))}
						</Stack>
					))}
					<Divider />
				</Stack>
			) : null}
		</>
	);
};
