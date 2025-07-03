import { ImageLayout } from '@/components/content/components/ImageLayout';
import { Box, Container, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import 'keen-slider/keen-slider.min.css';
import { KeenSliderInstance, useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

type OfferLink = {
	url: string;
	type: string;
};

type Banner = {
	id: string;
	imageDesktop: string;
	imageMobile: string;
	link: OfferLink;
	dateStart: string;
	dateEnd: string;
};

type Product = Banner;

type OffresProps = {
	data: {
		pushBanner?: Banner[];
		pushProducts?: Product[];
	};
};

const isValidDate = (item: { dateStart: string; dateEnd: string }) => {
	const now = new Date();
	const start = new Date(item.dateStart);
	const end = new Date(item.dateEnd);
	return now >= start && now <= end;
};

export const Offres: React.FC<OffresProps> = ({ data }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const pushBanner = data?.pushBanner ?? [];
	const pushProducts = data?.pushProducts ?? [];

	const validBanners = useMemo(() => pushBanner.filter(isValidDate), [pushBanner]);
	const validProducts = useMemo(() => pushProducts.filter(isValidDate), [pushProducts]);

	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		created(slider: KeenSliderInstance) {
			setLoaded(true);
		},
		slideChanged(slider: KeenSliderInstance) {
			setCurrentSlide(slider.track.details.rel);
		},
		slides: {
			perView: 4,
			spacing: 20,
		},
		breakpoints: {
			'(max-width: 767px)': {
				slides: { perView: 'auto', spacing: 20 },
			},
		},
	});

	return (
		<Box sx={{ py: 6, bgcolor: '#F9F4EE' }}>
			<Container>
				<Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
					Les bonnes affaires du moment
				</Typography>

				{/* Push Banner */}
				{/* {validBanners.length > 0 && (
					<Box mt={4} textAlign="center">
						<Link href={validBanners[0].link.url} target="_blank" rel="noopener noreferrer">
							<Image
								src={
									isMobile
										? 'https://recette.statics-lapeyre.fr/img/OP/2025/OP07/Banniere/HP_banniere_flash_OP07_Mob_470x680.webp'
										: 'https://recette.statics-lapeyre.fr/img/OP/2025/OP07/Banniere/HP_banniere_flash_OP07_Desktop_1440x388.webp'
								}
								alt={validBanners[0].id}
								width={1200}
								height={400}
								style={{ maxWidth: '100%', height: 'auto' }}
							/>
						</Link>
					</Box>
				)} */}
				{validBanners && (
					<Grid item xs={12}>
						{/* <Link to={variante3?.link?.url} onClick={() => sendVarianteGTMEvent(variante3)}> */}
						<ImageLayout
							src={
								isMobile
									? `https://recette.statics-lapeyre.fr${pushBanner[0].imageMobile}`
									: `https://recette.statics-lapeyre.fr${pushBanner[0].imageDesktop}`
							}
							alt=""
							width="100%"
							height="auto"
							className="productMonth-variant-3-img"
						/>
						{/* </Link> */}
					</Grid>
				)}

				{/* Push Products */}
				{validProducts.length > 0 && (
					<>
						{validProducts.length > 3 ? (
							<Box ref={sliderRef} className="keen-slider" mt={6}>
								{validProducts.map((item, i) => (
									<Box
										key={i}
										className="keen-slider__slide"
										sx={{ px: 1, minWidth: 265, maxWidth: 360 }}
									>
										<Link href={item.link.url} target="_blank" rel="noopener noreferrer">
											<Image
												src={
													isMobile
														? `https://recette.statics-lapeyre.fr${pushBanner[0].imageMobile}`
														: `https://recette.statics-lapeyre.fr${pushBanner[0].imageDesktop}`
												}
												alt={item.id}
												width={360}
												height={240}
												style={{ width: '100%', height: 'auto' }}
											/>
										</Link>
									</Box>
								))}
							</Box>
						) : (
							<Stack direction="row" spacing={3} mt={6} flexWrap="wrap" justifyContent="center">
								{validProducts.map((item, i) => (
									<Box key={i} sx={{ maxWidth: 360 }}>
										<Link href={item.link.url} target="_blank" rel="noopener noreferrer">
											<Image
												src={
													isMobile
														? `https://recette.statics-lapeyre.fr${pushBanner[0].imageMobile}`
														: `https://recette.statics-lapeyre.fr${pushBanner[0].imageDesktop}`
												}
												alt={item.id}
												width={360}
												height={240}
												style={{ width: '100%', height: 'auto' }}
											/>
										</Link>
									</Box>
								))}
							</Stack>
						)}
					</>
				)}
			</Container>
		</Box>
	);
};
