import { Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

// import { useTranslation } from "react-i18next";
// import AsyncCall from "../../../../_foundation/gtm/async.service";
import { ImageLayout } from '@/components/content/components/ImageLayout';
import { StyledProductMonth } from '@/components/content/components/styled-productMonth';

import { isValidDate } from '@/utils/utils';
// import storeUtil from '../../../../utils/storeUtil';
// import { CLICK } from "../../../../_foundation/constants/gtm";

interface ProductMonthProps {
	content?: Record<any, any>[];
}

const ProductMonth: React.FC<ProductMonthProps> = ({ data }: any) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	// const { t } = useTranslation();
	console.log('###productMonth123', data);
	const validProductMonthData = data?.filter((item: any) => isValidDate(item)) || [];
	const variante1 = validProductMonthData.find((item: any) => item.variante === 1);
	const variante2 = validProductMonthData.find((item: any) => item.variante === 2);
	const variante3 = validProductMonthData.find((item: any) => item.variante === 3);

	// const sendVarianteGTMEvent = (variante: Record<any, any>) => {
	//   AsyncCall.sendClick(CLICK.CTA, {
	//     btn_label: isMobile ? variante?.imageMobile : variante?.imageDesktop,
	//   });
	// };

	if (!variante3 || (!variante1 && !variante2)) {
		return <></>;
	}

	return (
		<StyledProductMonth>
			<Container>
				<Grid container justifyContent="center" sx={{ position: 'relative' }}>
					<Grid container item xs={12} sm={10} lg={9}>
						<Grid item xs={12} className="text-align-center">
							<Typography component="h1" variant="h4" pb={3} className="uppercase">
								{'Les produits Lapeyre du mois'}
							</Typography>
							<Typography component="p" variant="body2" pb={12}>
								{
									'Chaque mois nous sélectionnons les produits qui vous garantissent la qualité Lapeyre au meilleur prix.'
								}
							</Typography>
						</Grid>
					</Grid>
					<Grid container item xs={12}>
						{variante3 && (
							<Grid item xs={12}>
								{/* <Link to={variante3?.link?.url} onClick={() => sendVarianteGTMEvent(variante3)}> */}
								<ImageLayout
									src={
										isMobile
											? `https://www.statics-lapeyre.fr${variante3.imageMobile}`
											: `https://www.statics-lapeyre.fr${variante3.imageDesktop}`
									}
									alt=""
									width="100%"
									height="auto"
									className="productMonth-variant-3-img"
								/>
								{/* </Link> */}
							</Grid>
						)}
						{variante1 && variante2 && (
							<>
								<Grid item xs={12} sm={3.86} mt={6}>
									{/* <Link to={variante1?.link?.url} onClick={() => sendVarianteGTMEvent(variante1)}> */}
									<ImageLayout
										src={
											isMobile
												? `https://www.statics-lapeyre.fr${variante1.imageMobile}`
												: `https://www.statics-lapeyre.fr${variante1.imageDesktop}`
										}
										alt=""
										width="100%"
										height="auto"
										className="productMonth-variant-1-img"
									/>
									{/* </Link> */}
								</Grid>
								<Grid item xs={12} sm={8.14} mt={6} pl={{ xs: 0, sm: 5 }}>
									{/* <Link to={variante2?.link?.url} onClick={() => sendVarianteGTMEvent(variante2)}> */}
									<ImageLayout
										src={
											isMobile
												? `https://www.statics-lapeyre.fr${variante2.imageMobile}`
												: `https://www.statics-lapeyre.fr${variante2.imageDesktop}`
										}
										alt=""
										width="100%"
										height="auto"
										className="productMonth-variant-2-img"
									/>
									{/* </Link> */}
								</Grid>
							</>
						)}
					</Grid>
				</Grid>
			</Container>
		</StyledProductMonth>
	);
};

export default ProductMonth;
