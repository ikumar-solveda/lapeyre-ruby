/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { useLocalization } from '@/data/Localization';
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';
import { ContentContext } from '@/data/context/content';

export const CartProfileSelection: FC = () => {
	const localization = useLocalization('CheckoutProfile');
	const { validProfiles, validById, onSelectProfile, selectedProfile } = useContext(
		ContentContext
	) as ReturnType<typeof useCheckoutProfiles>;

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="subtitle1" gutterBottom>
					{localization.Title.t()}
				</Typography>
				<FormControl variant="outlined">
					<InputLabel shrink htmlFor="checkout-profile-select">
						{localization.Label.t()}
					</InputLabel>
				</FormControl>
				<Select
					value={validById[selectedProfile.profile]?.xchkout_ProfileId ?? ''}
					onChange={onSelectProfile}
					data-testid="checkout-profile-select"
					id="checkout-profile-select"
					fullWidth
					size="small"
				>
					<MenuItem value="">{localization.none.t()}</MenuItem>
					{validProfiles.map((profile, index) => (
						<MenuItem
							key={`${profile.xchkout_ProfileId}_${index}`}
							value={profile.xchkout_ProfileId}
						>
							{profile.xchkout_ProfileName}
						</MenuItem>
					))}
				</Select>
			</Grid>
		</Grid>
	);
};
