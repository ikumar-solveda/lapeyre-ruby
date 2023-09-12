/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CopyOrderMessage } from '@/components/blocks/CopyOrderMessage';

type Props = {
	fullCopy: boolean;
};
export const generateCopyOrderMessage = ({ fullCopy }: Props) => ({
	text: <CopyOrderMessage {...{ fullCopy }} />,
});
