/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { CircularProgress, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { GDPRDialog } from '@/components/content/Footer/parts/GDPRDialog';
import { footerBottomSX } from '@/components/content/Footer/styles/bottom';
import { footerContainerSX } from '@/components/content/Footer/styles/container';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { useFooter } from '@/data/Content/Footer';
import { useModalPrivacyPolicy } from '@/data/Content/ModalPrivacyPolicy';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { ID } from '@/data/types/Basic';

type FooterLink = {
	label: string;
	url: string;
	target: string;
	type: 'internal' | 'external';
};

type NavigationLink = {
	title: string;
	links: FooterLink[];
};

type Category = {
	name: string;
	seo?: { href: string };
	children?: Category[];
};

type FooterProps = {
	id: ID;
};

export const Footer: FC<FooterProps> = ({ id }) => {
	const footerNLS = useLocalization('Footer');
	const { settings } = useSettings();
	const { contentItems } = useFooter(id);

	const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
	const [navigationLinks, setNavigationLinks] = useState<NavigationLink[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const [topCategories, setTopCategories] = useState<Category[]>([]);
	const [loadingCats, setLoadingCats] = useState(true);
	const [errorCats, setErrorCats] = useState<string | null>(null);

	const {
		data,
		loading: gdprLoading,
		onSubmit,
		privacyNoticeVersion,
		privacyNoticeVersionValue,
	} = useModalPrivacyPolicy();

	const acceptedSessionPrivacyPolicy =
		dFix(privacyNoticeVersion ?? '') === dFix(privacyNoticeVersionValue ?? '');

	useEffect(() => {
		const fetchNavigationData = async () => {
			try {
				const res = await fetch('https://www.statics-lapeyre.fr/json/navigation-links.json');
				if (!res.ok) throw new Error('Failed to load footer links');
				const data = await res.json();

				setFooterLinks(data.footerLinks || []);
				setNavigationLinks(data.navigationLinks || []);
			} catch (err: any) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		const fetchCategories = async () => {
			try {
				const res = await fetch(
					'https://www.lapeyre.fr/search/resources/api/v2/categories?storeId=715842484&depthAndLimit=11%2C15%2C-1%2C-1&contractId=4000000000000000003&profileName=LP_HCL_V2_findSubCategories&langId=-2'
				);
				if (!res.ok) throw new Error('Failed to load categories');
				const data = await res.json();

				const allCategories: Category[] = data.contents || [];

				const filtered = allCategories.filter(
					(cat) =>
						Array.isArray(cat.children) &&
						cat.children.some((child) => Array.isArray(child.children) && child.children.length > 0)
				);

				setTopCategories(filtered);
			} catch (err: any) {
				setErrorCats(err.message || 'Unknown error');
			} finally {
				setLoadingCats(false);
			}
		};

		fetchNavigationData();
		fetchCategories();
	}, []);

	return (
		<Paper
			component="footer"
			sx={footerContainerSX(settings?.csrSession)}
			{...(settings?.csrSession && { 'data-iframe-height': '' })}
		>
			<Container sx={{ bgcolor: '#F9F4EE' }}>
				{/* Navigation Sections */}
				<Grid container spacing={4} sx={{ mt: 2 }}>
					<Grid item xs={12} sm={6} md={3}>
						<Typography variant="subtitle1" fontWeight="bold">
							TOUS NOS PRODUITS
						</Typography>

						{loadingCats && <CircularProgress size={20} sx={{ mt: 1 }} />}
						{errorCats && (
							<Typography color="error" variant="body2" sx={{ mt: 1 }}>
								Erreur: {errorCats}
							</Typography>
						)}
						{!loadingCats && !errorCats && (
							<Stack spacing={0.5}>
								{topCategories.map((cat, i) => (
									<Link key={i} href={cat.seo?.href || '#'} passHref>
										<Typography
											variant="body2"
											sx={{
												fontWeight: cat.name.toLowerCase().includes('bon plan') ? 'bold' : 'normal',
												color: cat.name.toLowerCase().includes('bon plan') ? 'red' : 'inherit',
												cursor: 'pointer',
												'&:hover': { textDecoration: 'underline' },
											}}
										>
											{cat.name}
										</Typography>
									</Link>
								))}
							</Stack>
						)}
					</Grid>

					{navigationLinks.map((section, i) => (
						<Grid item xs={12} sm={6} md={3} key={i}>
							<Typography variant="subtitle1" fontWeight="bold">
								{section.title}
							</Typography>
							<Stack spacing={0.5}>
								{section.links.map((link, index) => (
									<Link
										key={index}
										href={link.url}
										target={link.target}
										rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
									>
										<Typography variant="body2">{link.label}</Typography>
									</Link>
								))}
							</Stack>
						</Grid>
					))}
				</Grid>

				{/* Bottom Footer */}
				<Grid container sx={footerBottomSX} mt={4}>
					<Grid item xs={12} sm={9}>
						<Stack direction="row" spacing={2} flexWrap="wrap">
							{footerLinks.map((link, index) => (
								<Link
									key={`bottom-${index}`}
									href={link.url}
									target={link.target}
									rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
								>
									<Typography
										variant="body2"
										sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
									>
										{link.label}
									</Typography>
								</Link>
							))}
						</Stack>
					</Grid>
				</Grid>

				{/* Loading/Error Feedback */}
				{loading && <CircularProgress size={20} sx={{ mt: 2 }} />}
				{error && <Typography color="error">Erreur: {error.message}</Typography>}
			</Container>

			{/* GDPR Modal */}
			{!acceptedSessionPrivacyPolicy && (
				<FlowIfEnabled feature={EMS_STORE_FEATURE.CONSENT_OPTIONS}>
					{gdprLoading ? <ProgressIndicator /> : <GDPRDialog data={data} onSubmit={onSubmit} />}
				</FlowIfEnabled>
			)}
		</Paper>
	);
};
