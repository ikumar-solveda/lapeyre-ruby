/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CheckoutProfilesEach } from '@/components/content/CheckoutProfiles/parts/Landing/Each';
import { CheckoutProfileData } from '@/data/types/CheckoutProfiles';
import { FC, useMemo, useState } from 'react';

const EMPTY_ARRAY: CheckoutProfileData[] = [];
export const CheckProfilesList: FC<{ profiles: CheckoutProfileData[] }> = ({
	profiles = EMPTY_ARRAY,
}) => {
	const [expanded, setExpanded] = useState<string>('');
	const toggleExpand = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : '');
	};
	const reversedProfiles = useMemo(() => profiles.slice().reverse(), [profiles]);
	return (
		<>
			{reversedProfiles.map((profile) => (
				<CheckoutProfilesEach
					key={profile.xchkout_ProfileId}
					{...{ profile }}
					expanded={expanded === profile.xchkout_ProfileId}
					toggleExpanded={toggleExpand(profile.xchkout_ProfileId)}
				/>
			))}
		</>
	);
};
