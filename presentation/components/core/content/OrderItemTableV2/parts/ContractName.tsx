/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useLocalization } from '@/data/Localization';
import { Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
	contractId: string | string[] | undefined;
	contracts: Record<string, string>;
};

export const OrderItemTableV2ContractName: FC<Props> = ({ contractId, contracts }) => {
	const localization = useLocalization('OrderItemTable');
	const contractIdString = Array.isArray(contractId) ? contractId[0] : contractId;
	return !contractId ||
		Object.keys(contracts).length === 0 ||
		!contractIdString ||
		!contracts[contractIdString] ? null : (
		<Typography data-testid="contract-name" id="contract-name">
			{localization.Labels.Contract.t({
				contractName: contracts[contractIdString],
			})}
		</Typography>
	);
};
