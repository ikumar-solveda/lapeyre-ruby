/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { FILE_SIZE_THRESHOLDS } from '@/data/constants/common';
import { dDiv, dFix } from '@/data/utils/floatingPoint';

export const getFileSize = (size = 0): string =>
	size < FILE_SIZE_THRESHOLDS.KB
		? `${size} B`
		: size < FILE_SIZE_THRESHOLDS.MB
		? `${dFix(dDiv(size, FILE_SIZE_THRESHOLDS.KB), 0)} KB`
		: size < FILE_SIZE_THRESHOLDS.GB
		? `${dFix(dDiv(size, FILE_SIZE_THRESHOLDS.MB), 0)} MB`
		: `${dFix(dDiv(size, FILE_SIZE_THRESHOLDS.GB), 0)} GB`;
