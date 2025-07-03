/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

// import { ItemWrap } from '@/components/layouts/ItemWrap';
import HeroBanner from '@/components/content/components/HeroBanner';
import { Offres } from '@/components/content/components/Offres';
import ProductCategory from '@/components/content/components/ProductCategory';
import ProductMonth from '@/components/content/components/ProductMonth';
import { LayoutSlot } from '@/components/layouts/LayoutSlot';
import { layoutMainSX } from '@/components/layouts/styles/main';
import { Layout } from '@/data/types/Layout';
import { fetchFromAPI } from '@/utils/utils';
import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useEffect, useState } from 'react';

export const HomePage: FC<{ layout: Layout }> = ({ layout }) => {
	const {
		dimensions: { contentSpacing },
	} = useTheme();

	const [staticData, setStaticData] = useState<any | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchFromAPI();
				console.log('## data in homepage_layout', data);
				setStaticData(data);
			} catch (err) {
				console.error('Failed to fetch static homepage data:', err);
			}
		};
		fetchData();
	}, []);

	const emsComponents: Record<string, React.ComponentType<any>> = {
		hero: HeroBanner,
		productMonth: ProductMonth,
		offres: Offres,
		productCategory: ProductCategory,
	};
	const getOrderedWidgets = (layout: any): any[] => {
		const widgets: any[] = [];
		Object.entries(layout.slots).forEach(([key, widgetData]) => {
			if (['header', 'footer'].includes(key)) return;
			widgets.push(...(widgetData || []));
		});
		return widgets;
	};
	const contentWidgets = getOrderedWidgets(layout);

	console.log('###contentWidget', staticData);
	return (
		layout &&
		staticData && (
			<>
				<LayoutSlot slot={layout.slots.header} />

				<Stack
					component="main"
					gap={contentSpacing}
					alignItems="center"
					sx={layoutMainSX(contentWidgets.length)}
				>
					{contentWidgets.map((widget, index) => {
						const emsName = widget?.widgetRaw?.properties?.emsName;
						const Component = emsComponents[emsName];

						if (!Component) return null;
						// Use staticData[emsName] if available, else fallback to [widget]
						const widgetData = staticData?.[emsName] ?? [widget];

						return <Component key={`${emsName}-${index}`} data={widgetData} />;
					})}

					<LayoutSlot slot={layout.slots.footer} />
				</Stack>
			</>
		)
	);
};
