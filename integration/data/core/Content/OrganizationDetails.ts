/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { usePersonInfo } from '@/data/Content/PersonInfo';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { orgFetcher } from '@/data/Content/_Organization';
import { getActiveOrganizationId, isB2BStore, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_ORGANIZATION_DETAILS } from '@/data/constants/dataKey';
import {
	OrganizationAddress,
	OrganizationResponse,
	OrganizationResponseAddress,
	OrganizationType,
} from '@/data/types/Organization';
import { pick } from 'lodash';
import { useMemo } from 'react';
import useSWR from 'swr';
export { orgFetcher };

const PICK = [
	'addressId',
	'addressType',
	'city',
	'country',
	'email1',
	'email2',
	'firstName',
	'lastName',
	'middleName',
	'mobilePhone1',
	'nickName',
	'organizationName',
	'phone1',
	'phone2',
	'state',
	'zipCode',
];
const EMPTY_ADDRESSES: OrganizationResponseAddress[] = [];
const EMPTY_ORG = { addresses: [] as OrganizationAddress[] } as OrganizationType;

const mapSingleAddress = (source?: OrganizationResponseAddress) => {
	if (source) {
		const { address1, address2, address3 } = source;
		const addressLine = [address1, address2, address3].filter(Boolean);
		return { ...pick(source, ...PICK), addressLine, isOrgAddress: true } as OrganizationAddress;
	}
	return undefined;
};

const dataMap = (org?: OrganizationResponse) => {
	let rc = EMPTY_ORG;
	if (org) {
		const { contactInfo: orgAddress, addressBook = EMPTY_ADDRESSES } = org;
		const contactInfo = Array.isArray(orgAddress) ? orgAddress : [orgAddress];
		const merged = [...contactInfo.map(mapSingleAddress), ...addressBook.map(mapSingleAddress)];
		rc = { ...org, addresses: merged.filter(Boolean) } as OrganizationType;
	}
	return rc;
};

export const useOrganizationDetails = () => {
	const { settings } = useSettings();
	const { user } = useUser();
	const { personInfo } = usePersonInfo();
	const params = useExtraRequestParameters();
	const organizationId = getActiveOrganizationId(user?.context)?.organizationId ?? '';
	const { data } = useSWR(
		isB2BStore(settings) && organizationId
			? [{ storeId: settings.storeId, organizationId }, DATA_KEY_ORGANIZATION_DETAILS]
			: null,
		async ([props]) => orgFetcher(true)({ ...props, params })
	);
	const { data: parentOrgData } = useSWR(
		isB2BStore(settings) && personInfo.parentOrgId && personInfo.parentOrgId !== organizationId
			? [
					{ storeId: settings.storeId, organizationId: personInfo.parentOrgId as string },
					DATA_KEY_ORGANIZATION_DETAILS,
			  ]
			: null,
		async ([props]) => orgFetcher(true)({ ...props, params })
	);
	const org = useMemo(() => dataMap(data), [data]);
	const parentOrg = useMemo(() => dataMap(parentOrgData), [parentOrgData]);

	return { org, parentOrg };
};
