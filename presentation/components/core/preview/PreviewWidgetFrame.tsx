/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { previewWidgetFrameSX } from '@/components/preview/styles/previewWidgetFrame';
import { previewWidgetFrameInfoButton } from '@/components/preview/styles/previewWidgetFrameInfoButton';
import { previewWidgetFrameInfoIconSX } from '@/components/preview/styles/previewWidgetFrameInfoIcon';
import { previewWidgetFrameParentSX } from '@/components/preview/styles/previewWidgetFrameParent';
import { useSettings } from '@/data/Settings';
import { usePreviewMessageState, postPreviewMessage } from '@/data/state/usePreviewMessageState';
import { ID } from '@/data/types/Basic';
import { WidgetData } from '@/data/types/Preview';
import { Widget } from '@/data/types/Slot';
import { Info } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { isEqual } from 'lodash';
import { FC, PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';

type Props = PropsWithChildren<{
	widget: Widget & {
		// the ID that using to retrieve widget data.
		dataId: ID;
	};
}>;

type PreviewWidgetContextValue = {
	setESpotData?: (eSpot: WidgetData['marketingSpotData']) => void;
};

const PreviewWidgetContext = createContext<PreviewWidgetContextValue>({});
const PreviewWidgetProvider = PreviewWidgetContext.Provider;
export const usePreviewWidget = () => useContext(PreviewWidgetContext);
/**
 * This is used as widget level message sender and highlighter
 */
export const PreviewWidgetFrame: FC<Props> = ({ widget, children }) => {
	const { settings } = useSettings();
	const { previewMessage } = usePreviewMessageState();
	const [marketingSpotData, setMarketingSpotData] = useState<WidgetData['marketingSpotData']>();
	const showInfo = previewMessage?.action === 'PREVIEW_SHOW_PAGE_INFORMATION';

	const setESpotData = useCallback((eSpot: WidgetData['marketingSpotData']) => {
		setMarketingSpotData((pre) => (isEqual(pre, eSpot) ? pre : eSpot));
	}, []);

	const { inPreview } = settings;

	const onClick = () => {
		const widgetData = { widget, marketingSpotData };
		inPreview &&
			postPreviewMessage({
				message: {
					data: widgetData,
					action: 'PREVIEW_SHOW_WIDGET_INFO',
				},
			});
	};

	return inPreview ? (
		<Box sx={previewWidgetFrameParentSX(widget.widgetName)}>
			<PreviewWidgetProvider value={{ setESpotData }}>{children}</PreviewWidgetProvider>
			<Box sx={previewWidgetFrameSX(showInfo, widget.widgetName)}>
				<Button
					id={`widget-info-button-${widget.id}`}
					data-testid={`widget-info-button-${widget.id}`}
					variant="outlined"
					onClick={onClick}
					sx={previewWidgetFrameInfoButton}
				>
					<Info sx={previewWidgetFrameInfoIconSX} fontSize="small" />
				</Button>
			</Box>
		</Box>
	) : (
		<PreviewWidgetProvider value={{ setESpotData }}>{children}</PreviewWidgetProvider>
	);
};
