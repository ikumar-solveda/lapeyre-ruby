/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { Linkable } from '@/components/blocks/Linkable';
import { footerLinkSX } from '@/components/content/Footer/styles/link';
import { useStaticPageURL } from '@/data/Content/_StaticPagesURL';
import { useLocalization } from '@/data/Localization';
import { PageLink } from '@/data/Navigation';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { FALLBACK_URL_PRIVACY_POLICY, PAGE_NAME_PRIVACY_POLICY } from '@/data/constants/page';
import { Stack, Tooltip, Typography } from '@mui/material';
import { useMemo } from 'react';

type CustomerServicePageLink = PageLink & {
	disabled: boolean;
	flexFlow?: string;
	hidden?: boolean;
};

export const CustomerServiceLinks = () => {
	const footerNLS = useLocalization('Footer');
	const routesNLS = useLocalization('Routes');
	const quickOrderRoute = routesNLS.QuickOrder.route.t();
	const disabledMessage = footerNLS.DisabledMessage.t();
	const contactUsLabel = footerNLS.CustomerService.ContactUs.t();
	const privacyPolicyLabel = footerNLS.CustomerService.PrivacyPolicy.t();
	const quickOrderLabel = footerNLS.CustomerService.QuickOrder.t();
	const { pageUrl } = useStaticPageURL(PAGE_NAME_PRIVACY_POLICY);
	const { desktopURLKeyword } = pageUrl ?? {};
	// TODO Links should come from integration data layer
	const customerServiceLinks: CustomerServicePageLink[] = useMemo(
		() => [
			{
				label: quickOrderLabel,
				url: quickOrderRoute,
				children: [],
				disabled: false,
				flexFlow: EMS_STORE_FEATURE.QUICK_ORDER,
			}, // can also call useFlexflowStoreFeature to filter this out. To demo, use Flow tag here.
			{
				label: contactUsLabel,
				url: 'contact-us',
				children: [],
				disabled: true,
			},
			{
				label: privacyPolicyLabel,
				url: desktopURLKeyword || FALLBACK_URL_PRIVACY_POLICY,
				children: [],
				disabled: !desktopURLKeyword,
			},
		],
		[contactUsLabel, desktopURLKeyword, privacyPolicyLabel, quickOrderLabel, quickOrderRoute]
	);
	return (
		<Stack spacing={0.5}>
			<Typography variant="overline">{footerNLS.CustomerService.Label.t()}</Typography>
			{customerServiceLinks
				.filter(({ hidden }) => !hidden)
				.map(({ label, url, disabled, flexFlow }) =>
					disabled ? (
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
					) : flexFlow ? (
						<FlowIfEnabled feature={flexFlow} key={url}>
							<Linkable key={url} data-testid={url} id={url} href={url} sx={footerLinkSX}>
								{label}
							</Linkable>
						</FlowIfEnabled>
					) : (
						<Linkable key={url} data-testid={url} id={url} href={url} sx={footerLinkSX}>
							{label}
						</Linkable>
					)
				)}
		</Stack>
	);
};
