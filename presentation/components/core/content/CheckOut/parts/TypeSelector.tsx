/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { checkOutTypeSelectorPaperSX } from '@/components/content/CheckOut/styles/typeSelectorPaper';
import { checkOutTypeSelectorToggleButtonSX } from '@/components/content/CheckOut/styles/typeSelectorToggleButton';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Grid, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { FC, useContext } from 'react';
/** @deprecated */
export const CheckOutTypeSelector: FC = () => {
	const localization = useLocalization('OrderMethod');
	const { bopisSelected, toggleBopis } = useContext(ContentContext) as ReturnType<
		typeof useCheckOut
	>;

	return (
		<Paper sx={checkOutTypeSelectorPaperSX}>
			<Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
				<Grid item>
					<Typography variant="body2">{localization.Message.t()}</Typography>
				</Grid>
				<Grid item>
					<ToggleButtonGroup
						color="primary"
						value={!!bopisSelected}
						exclusive
						onChange={toggleBopis}
					>
						<ToggleButton
							id="checkout-bopis-toggle-delivery"
							data-testid="checkout-bopis-toggle-delivery"
							sx={checkOutTypeSelectorToggleButtonSX}
							value={false}
						>
							{localization.Delivery.t()}
						</ToggleButton>
						<ToggleButton
							id="checkout-bopis-toggle-pickup"
							data-testid="checkout-bopis-toggle-pickup"
							sx={checkOutTypeSelectorToggleButtonSX}
							value={true}
						>
							{localization.Pickup.t()}
						</ToggleButton>
					</ToggleButtonGroup>
				</Grid>
			</Grid>
		</Paper>
	);
};
