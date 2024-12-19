/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import type { ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList } from 'integration/generated/transactions/data-contracts';

export type MEMBER_GROUP_QUERY_TYPE = {
	/** Indicates whether it is excluded group or now */
	exclude?: '0' | '1';
	/** Approval member groups types will be filtered. */
	typeName?: string[];
	userId?: string;
	/** Properties value based on which approval member groups will be filtered. */
	propertiesFilter?: string;
	/** The query name. */
	q: 'approvalMemberGroupTypes' | 'explicitlyIncludedOrExcluded' | 'manageable';
	/** Order by. */
	orderBy?: string;
	/**
	 *  Page number, starting at 1. Valid values include positive integers of 1 and above. The pageSize must be specified for paging to work.
	 * @format int64
	 */
	pageNumber?: number;
	/**
	 * Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The pageNumber must be specified for paging to work
	 * @format int64
	 */
	pageSize?: number;
};

export type MemberGroupType =
	ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList;

export type Approvals = Record<
	string,
	ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList
>;
