/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { marketingConsentChoiceLabelSX } from '@/components/blocks/MarketingConsentChoice/style';
import { useLocalization } from '@/data/Localization';
import { Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent, FC } from 'react';

type Props = {
	name: string;
	value: string | boolean;
	checked: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const MarketingConsentChoice: FC<Props> = ({ name, value, checked, onChange }) => {
	const privacyNLS = useLocalization('PrivacyPolicy');
	return (
		<FormControlLabel
			sx={marketingConsentChoiceLabelSX}
			control={
				<Checkbox
					id="enable-tracking-for-marketing"
					data-testid="enable-tracking-for-marketing"
					aria-label={privacyNLS.MarketingConsent.t()}
					name={name}
					checked={checked}
					onChange={onChange}
					value={value}
				/>
			}
			label={privacyNLS.MarketingConsent.t()}
		/>
	);
};
