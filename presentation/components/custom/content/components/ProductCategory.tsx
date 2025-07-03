import { StyledProductCategory } from '@/components/content/components/styled-productCategory';
// import AsyncCall from '@/_foundation/gtm/async.service';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Container,
	Grid,
	Hidden,
	Link as MuiLink,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
// import { StyledProductCategory } from './styled-productCategory';

interface LinkItem {
	label: string;
	url: string;
	target?: string;
	type?: string;
}

interface NavigationItem {
	title: string;
	links: LinkItem[];
}

interface ContentType {
	title: string;
	navigation: NavigationItem[];
}

interface ProductCategoryProps {
	content?: ContentType;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({ content }) => {
	// const sendGTMPageClickEvent = (item: NavigationItem, link: LinkItem) => {
	// 	AsyncCall.sendPageClickCtaEvent({
	// 		btn_label: `${content?.title}-${item?.title}-${link?.label}`,
	// 	});
	// };

	if (!content || Object.keys(content).length === 0) {
		return null;
	}

	return (
		<StyledProductCategory>
			<Container maxWidth={false}>
				<Grid container pt={{ xs: 12, md: 15 }} pb={{ xs: 7, md: 15 }}>
					<Grid item xs={12}>
						<Typography
							variant="h4"
							component="p"
							pb={{ xs: 10, sm: 15 }}
							align="center"
							className="uppercase"
						>
							{content.title}
						</Typography>
					</Grid>

					{/* Desktop View */}
					<Hidden mdDown>
						<Grid container item>
							{content.navigation.map((item, index) => (
								<Grid item md={3} xs={12} pr={2} key={index}>
									<Typography variant="body1" component="p" pb={4} className="uppercase">
										{item.title}
									</Typography>
									<ul className="product-category-list">
										{item.links.map((link, linkIndex) => (
											<li key={linkIndex}>
												{link.type === 'external' ? (
													<MuiLink
														href={link.url}
														target={link.target || '_self'}
														color="primary"
														// onClick={() => sendGTMPageClickEvent(item, link)}
													>
														{link.label}
													</MuiLink>
												) : (
													<Link href={link.url} passHref legacyBehavior>
														<MuiLink
															target={link.target || '_self'}
															color="primary"
															// onClick={() => sendGTMPageClickEvent(item, link)}
														>
															{link.label}
														</MuiLink>
													</Link>
												)}
											</li>
										))}
									</ul>
								</Grid>
							))}
						</Grid>
					</Hidden>

					{/* Mobile View */}
					<Hidden mdUp>
						{content.navigation.map((item, index) => (
							<Accordion key={index} square className="product-category-accordion">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel-content"
									id={`panel-${index}`}
								>
									<Typography variant="body1" className="uppercase">
										{item.title}
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<ul className="product-category-list">
										{item.links.map((link, linkIndex) => (
											<li key={linkIndex}>
												{link.type === 'external' ? (
													<MuiLink href={link.url} target={link.target || '_self'} color="primary">
														{link.label}
													</MuiLink>
												) : (
													<Link href={link.url} passHref legacyBehavior>
														<MuiLink target={link.target || '_self'} color="primary">
															{link.label}
														</MuiLink>
													</Link>
												)}
											</li>
										))}
									</ul>
								</AccordionDetails>
							</Accordion>
						))}
					</Hidden>
				</Grid>
			</Container>
		</StyledProductCategory>
	);
};

export default ProductCategory;
