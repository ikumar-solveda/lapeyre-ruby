import { CompanyLinks } from '@/components/content/Footer/parts/CompanyLink';
import { Copyright } from '@/components/content/Footer/parts/Copyright';
import { CustomerServiceLinks } from '@/components/content/Footer/parts/CustomerService';
import { ContentRecommendation } from '@/components/content/ContentRecommendation';
import { SocialLinks } from '@/components/content/Footer/parts/SocialLink';
import { footerBottomSX } from '@/components/content/Footer/styles/bottom';
import { footerTopSX } from '@/components/content/Footer/styles/top';
import { footerContainerSX } from '@/components/content/Footer/styles/container';
import { useFooter } from '@/data/Content/Footer';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { Container, Paper, Grid, Typography, Stack } from '@mui/material';
import { FC } from 'react';
import { useSettings } from '@/data/Settings';

export const Footer: FC<{
	id: ID;
	clickAction?: () => void;
}> = ({ id }) => {
	const footerNLS = useLocalization('Footer');
	const { settings } = useSettings();
	const { contentItems } = useFooter(id);
	return (
		<Paper
			component="footer"
			sx={footerContainerSX(settings?.csrSession)}
			{...(settings?.csrSession && { 'data-iframe-height': '' })}
		>
			<Container>
				<Grid container spacing={2} sx={footerTopSX}>
					<Grid item xs={12} lg={4}>
						<Stack gap={1}>
							{contentItems.map((properties) => (
								<ContentRecommendation
									key={properties.emsName}
									id={`${id}-${properties.emsName}`}
									properties={properties}
								/>
							))}
							<Typography variant="caption">{footerNLS.Description.t()}</Typography>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={4} lg={2}>
						<CustomerServiceLinks />
					</Grid>
					<Grid item xs={12} sm={4} lg={2}>
						<CompanyLinks />
					</Grid>
					<Grid item xs={12} sm={4} lg={4}>
						<SocialLinks />
					</Grid>
				</Grid>
				<Grid container sx={footerBottomSX}>
					<Grid item xs={12} sm={9}>
						<Copyright />
					</Grid>
				</Grid>
			</Container>
		</Paper>
	);
};
