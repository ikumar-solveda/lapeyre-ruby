/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { useLocalization } from '@/data/Localization';
import { Paper, Typography } from '@mui/material';
import { FC } from 'react';

export const NotAvailable: FC<{ message: string }> = ({ message }) => {
	const { navHomeWithMessage } = useLocalization('Common');

	return (
		<Paper>
			<LocalizationWithComponent
				text={navHomeWithMessage.t({ message })}
				components={[
					<Typography p={2} variant="h5" key={0}>
						<Linkable id="not-available" data-testid="not-available" href="/" />
					</Typography>,
				]}
			/>
		</Paper>
	);
};
