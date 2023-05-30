/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { footerLinkSX } from '@/components/content/Footer/styles/link';
import { Linkable } from '@/components/blocks/Linkable';
import { useLocalization } from '@/data/Localization';
import { PageLink } from '@/data/Navigation';
import { Stack, Tooltip, Typography } from '@mui/material';

export const CompanyLinks = () => {
	const footerNLS = useLocalization('Footer');
	// TODO Links should come from integration data layer
	const companyLinks: PageLink[] = [
		{
			label: footerNLS.CompanyLinks.OurStory.t(),
			url: 'our-story',
			children: [],
		},
		{
			label: footerNLS.CompanyLinks.Careers.t(),
			url: 'careers',
			children: [],
		},
	];
	return (
		<Stack spacing={0.5}>
			<Typography variant="overline">{footerNLS.CompanyLinks.Label.t()}</Typography>
			{companyLinks.map(({ label, url }) => (
				<Tooltip title={label} key={url}>
					<Linkable
						data-testid={url}
						id={url}
						key={url}
						href={url}
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
