/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EmptyContent } from '@/components/blocks/EmptyContent';
import { CouponsConfirmationDialog } from '@/components/content/Coupons/parts/ConfirmationDialog';
import { CouponsTable } from '@/components/content/Coupons/parts/Table';
import { couponsPaperStack } from '@/components/content/Coupons/styles/paperStack';
import { couponsStack } from '@/components/content/Coupons/styles/stack';
import { useCoupons } from '@/data/Content/Coupons';
import { useLocalization } from '@/data/Localization';
import { NO_COUPONS_ALT_ID } from '@/data/constants/coupons';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import isEmpty from 'lodash/isEmpty';
import { type FC, useCallback, useMemo, useState } from 'react';

type CouponProps = {
	id: ID;
	variant?: 'full' | 'compact' | 'auto';
};

const NO_OP = async () => false;

export const Coupons: FC<CouponProps> = ({ variant = 'auto' }) => {
	const localization = useLocalization('Coupons');
	const couponsData = useCoupons();
	const { couponsList } = couponsData;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = variant === 'auto' ? (isMobile ? 'compact' : 'full') : variant;
	const [dialogOpen, setDialogOpen] = useState(false);
	const [onConfirm, setOnConfirm] = useState<() => Promise<unknown>>(() => NO_OP);
	const onToggle = useCallback(
		(callback: () => Promise<unknown> = NO_OP) =>
			() => {
				setOnConfirm(() => callback);
				setDialogOpen((prev) => !prev);
			},
		[]
	);
	const contextValue = useMemo(
		() => ({ view, onToggle, ...couponsData }),
		[view, onToggle, couponsData]
	);

	return (
		<Stack {...couponsStack}>
			<Typography variant="pageTitle">{localization.Title.t()}</Typography>
			<Paper>
				<Stack {...couponsPaperStack}>
					{isEmpty(couponsList) ? (
						<EmptyContent altId={NO_COUPONS_ALT_ID} title={localization.NoCouponsAvailable.t()} />
					) : (
						<ContentProvider value={contextValue}>
							<CouponsTable />
						</ContentProvider>
					)}
				</Stack>
			</Paper>
			<CouponsConfirmationDialog open={dialogOpen} onToggle={onToggle} onConfirm={onConfirm} />
		</Stack>
	);
};
