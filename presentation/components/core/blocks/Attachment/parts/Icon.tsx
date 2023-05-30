/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import {
	ImageRounded,
	AttachFileOutlined,
	OndemandVideoOutlined,
	Summarize,
} from '@mui/icons-material';

type Props = {
	fileExtension: string;
};

const ExtensionIconMap: Record<string, JSX.Element> = {
	IMAGE: <ImageRounded />,
	VIDEO: <OndemandVideoOutlined />,
	APPLICATION: <Summarize />,
};

export const AttachmentIcon: FC<Props> = ({ fileExtension }) => {
	const key = fileExtension.toUpperCase().split('/')[0];
	const icon = ExtensionIconMap[key] ?? <AttachFileOutlined />;
	return icon;
};
