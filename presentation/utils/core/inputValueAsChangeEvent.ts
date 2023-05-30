/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ChangeEvent } from 'react';

type Props = { name: string; value: string | number };

export const inputValueAsChangeEvent = ({ value, name }: Props) =>
	({ target: { value, name, type: 'text', checked: false } } as ChangeEvent<HTMLInputElement>);
