/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { contentManifest } from '@/components/content/manifest';
import { PreviewWidgetFrame } from '@/components/preview/PreviewWidgetFrame';
import { ContentItem } from '@/data/types/LayoutAllSlots';
import { FC } from 'react';

type Props = {
	slot?: ContentItem[];
	SlotWrap?: FC;
	ItemWrap?: FC;
};

const NullElement: FC = () => null;

const FragmentWrap: FC<{ children?: JSX.Element | JSX.Element[] }> = ({ children }) => (
	<>{children}</>
);

export const LayoutSlot: FC<Props> = ({ slot, SlotWrap = FragmentWrap, ItemWrap = FragmentWrap }) =>
	slot ? (
		<SlotWrap>
			{slot.map((contentItem) => {
				const { name, id, properties, widgetRaw } = contentItem;
				const Element = contentManifest[name];
				return Element ? (
					widgetRaw ? (
						<ItemWrap key={name + id + properties?.emsName}>
							<PreviewWidgetFrame widget={{ ...widgetRaw, dataId: id }}>
								<Element id={id} properties={properties} />
							</PreviewWidgetFrame>
						</ItemWrap>
					) : (
						<ItemWrap key={name + id + properties?.emsName}>
							<Element id={id} properties={properties} />
						</ItemWrap>
					)
				) : (
					<NullElement key={name + id + properties?.emsName} />
				);
			})}
		</SlotWrap>
	) : null;
