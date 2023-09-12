/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { footerLinkSX } from '@/components/content/Footer/styles/link';
import { Linkable } from '@/components/blocks/Linkable';
import { useLocalization } from '@/data/Localization';
import { PageLink } from '@/data/Navigation';
import { Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';

export const CustomerServiceLinks = () => {
	const footerNLS = useLocalization('Footer');
	const disabledMessage = footerNLS.DisabledMessage.t();
	// TODO Links should come from integration data layer
	const customerServiceLinks: PageLink[] = [
		{
			label: footerNLS.CustomerService.ContactUs.t(),
			url: 'contact-us',
			children: [],
		},
		{
			label: footerNLS.CustomerService.PrivacyPolicy.t(),
			url: 'privacy-policy',
			children: [],
		},
	];
	return (
		<Stack spacing={0.5}>
			<Typography variant="overline">{footerNLS.CustomerService.Label.t()}</Typography>
			{customerServiceLinks.map(({ label, url }) => (
				<Tooltip title={disabledMessage} key={url}>
					<Linkable
						key={url}
						data-testid={url}
						id={url}
						href="/"
						onClick={(event: Event) => event.preventDefault()}
						sx={footerLinkSX}
					>
						{label}
					</Linkable>
				</Tooltip>
			))}
		</Stack>
	);
};
