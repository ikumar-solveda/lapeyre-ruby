/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ColumnInstance, Row } from 'react-table';

export type ReactTableRow = Row<Record<string, unknown>>;

export type ReactTableVisibleColumns = ColumnInstance<Record<string, unknown>>[];
