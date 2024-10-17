/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { FC, PropsWithChildren } from 'react';

export const IfTrue: FC<PropsWithChildren<{ condition: boolean }>> = ({ condition, children }) =>
	condition ? <>{children}</> : null;
