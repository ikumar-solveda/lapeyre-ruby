/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Stack, Typography } from '@mui/material';
import { footerSocialLinkSX } from '@/components/content/Footer/styles/socialLink';
import { useLocalization } from '@/data/Localization';
import { Linkable } from '@/components/blocks/Linkable';

const socialIcons = {
	facebook: <FacebookIcon />,
	twitter: <TwitterIcon />,
	instagram: <InstagramIcon />,
};

type SocialLink = {
	name: 'facebook' | 'twitter' | 'instagram';
	url: string;
};

export const SocialLinks = () => {
	const footerNLS = useLocalization('Footer');
	// TODO Links should come from integration data layer
	const socialLinks: SocialLink[] = [
		{ name: 'facebook', url: 'https://facebook.com' },
		{ name: 'twitter', url: 'https://twitter.com' },
		{ name: 'instagram', url: 'https://instagram.com' },
	];
	return (
		<Stack spacing={1}>
			<Typography variant="overline" component="div">
				{footerNLS.FollowUs.t()}
			</Typography>
			<Stack direction="row" spacing={1}>
				{socialLinks.map(({ name, url }) => (
					<Linkable type="button" href={url} key={url} sx={footerSocialLinkSX} aria-label={name}>
						{socialIcons[name]}
					</Linkable>
				))}
			</Stack>
		</Stack>
	);
};
