/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SelectWithResize } from '@/components/blocks/SelectWithResize';
import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import { FormControl, Grid, InputLabel, MenuItem, Typography } from '@mui/material';
import { FC, useContext } from 'react';

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
				<SelectWithResize
					value={validById[selectedProfile]?.xchkout_ProfileId ?? EMPTY_STRING}
					onChange={onSelectProfile}
					data-testid="checkout-profile-select"
					id="checkout-profile-select"
					fullWidth
					size="small"
				>
					<MenuItem value="">
						<Typography variant="inherit" noWrap>
							{localization.none.t()}
						</Typography>
					</MenuItem>
					{validProfiles.map((profile, index) => (
						<MenuItem
							key={`${profile.xchkout_ProfileId}_${index}`}
							value={profile.xchkout_ProfileId}
						>
							<Typography variant="inherit" noWrap>
								{profile.xchkout_ProfileName}
							</Typography>
						</MenuItem>
					))}
				</SelectWithResize>
			</Grid>
		</Grid>
	);
};
