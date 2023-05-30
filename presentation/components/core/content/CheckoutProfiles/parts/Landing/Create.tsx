/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import Add from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Grid,
	TextField,
	Typography,
	InputAdornment,
	Box,
} from '@mui/material';
import { useLocalization } from '@/data/Localization';
import { IconLabel } from '@/components/blocks/IconLabel';
import { ContentContext } from '@/data/context/content';
import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';
import { checkoutProfileAccordionSummarySX } from '@/components/content/CheckoutProfiles/styles/Landing/accordionSummary';

export const CheckoutProfilesCreate: FC = () => {
	const localization = useLocalization('CheckoutProfile');
	const { onSearch, onCreate } = useContext(ContentContext) as ReturnType<
		typeof useCheckoutProfiles
	>;
	return (
		<Box>
			<Accordion id="checkout-profile-create" data-testid="checkout-profile-create">
				<AccordionSummary
					sx={checkoutProfileAccordionSummarySX}
					expandIcon={<ExpandMoreIcon />}
					id="checkout-profiles-create"
					aria-controls="checkout-profile-search-create-details"
				>
					<IconLabel
						icon={<Add color="primary" />}
						label={
							<Typography variant="subtitle1">{localization.CreateCheckoutButton.t()}</Typography>
						}
					/>
				</AccordionSummary>
				<AccordionDetails id="checkout-profile-search-create-details">
					<Grid container spacing={2} alignItems="flex-end">
						<Grid item xs={12} sm={6} md={5}>
							<TextField
								fullWidth
								id="search-checkout-profile-name"
								data-testid="search-checkout-profile-name"
								name="checkoutProfilesName"
								label={<Typography variant="subtitle1">{localization.Name.t()}</Typography>}
								placeholder={localization.Name.t()}
								inputProps={{ maxLength: 128 }}
								onChange={onSearch}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<SearchIcon onClick={() => null} id="dummy-search-icon" />
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={3} md={3}>
							<Button
								id="checkout-profile-create-new"
								data-testid="checkout-profile-create-new"
								fullWidth
								variant="contained"
								onClick={onCreate}
							>
								{localization.CreateNewButton.t()}
							</Button>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
};
