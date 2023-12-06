/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	APPROVALS_STATUS,
	END_TIME_HOURS,
	END_TIME_MINUTES,
	END_TIME_SECONDS,
} from '@/data/constants/admin_approvalsManagement';
import {
	AdminApprovalsManagementQueryParam,
	AdminBuyerOrderSearchData,
} from '@/data/types/Admin_ApprovalsManagement';
import { isDate, isEmpty, omit, omitBy } from 'lodash';

type ApprovalApiSearchType = Pick<
	AdminApprovalsManagementQueryParam,
	| 'submitterFirstName'
	| 'submitterLastName'
	| 'startSubmitTime'
	| 'endSubmitTime'
	| 'status'
	| 'entityId'
	| 'approvalStatusId'
>;

/**
 * custom method for checking "empty" values -- ideally isEmpty should be sufficient but that
 *   returns true for non-null Date objects
 * @param value value to check
 * @returns true if value is indeed empty, false otherwise
 */
const checkEmpty = (value: any) => !isDate(value) && isEmpty(value);

const fixDate = (dts?: Date) =>
	dts
		?.toISOString()
		.replace(/\.[0-9]+Z/, '')
		.replace('T', ' ');

const fixDateEndTime = (dts?: Date) => {
	if (dts) {
		const newDts = new Date(dts as Date);
		newDts.setSeconds(END_TIME_SECONDS);
		newDts.setMinutes(END_TIME_MINUTES);
		newDts.setHours(END_TIME_HOURS);
		return newDts
			.toISOString()
			.replace(/\.[0-9]+Z/, '')
			.replace('T', ' ');
	}
	return undefined;
};

export const sanitizeSearchPayload = (values: AdminBuyerOrderSearchData): ApprovalApiSearchType => {
	const clean: AdminBuyerOrderSearchData = omitBy(values, checkEmpty);
	if (clean.status === APPROVALS_STATUS.all) {
		delete clean.status;
	}
	const { startSubmitTime, endSubmitTime } = clean;

	const rc: ApprovalApiSearchType = Object.assign(
		omit(clean, 'startSubmitTime', 'endSubmitTime') as any,
		{ startSubmitTime: fixDate(startSubmitTime), endSubmitTime: fixDateEndTime(endSubmitTime) }
	);
	return rc;
};
