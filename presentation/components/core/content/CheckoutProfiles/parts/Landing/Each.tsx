/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import {
	Accordion,
	AccordionActions,
	AccordionSummary,
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
	Delete,
	EditOutlined,
	ErrorOutlineOutlined as ErrorOutlinedIcon,
} from '@mui/icons-material';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { CheckoutProfileData } from '@/data/types/CheckoutProfiles';
import { FC } from 'react';
import { checkoutProfileAccordionSummarySX } from '@/components/content/CheckoutProfiles/styles/Landing/accordionSummary';
import { ConfirmationOverlay } from '@/components/blocks/ConfirmationOverlay';
import { checkoutProfilesEachActionsSX } from '@/components/content/CheckoutProfiles/styles/Landing/eachActions';
import { CheckoutProfilesAddressDisplay } from '@/components/content/CheckoutProfiles/parts/Landing/AddressDisplay';
import { NON_CREDIT_CARD_PAYMENTS } from '@/data/constants/nonCreditCardPayment';

type Props = {
	profile: CheckoutProfileData;
	expanded: boolean;
	toggleExpanded: (event: React.SyntheticEvent, isExpanded: boolean) => void;
};

const EMPTY_MODES: ReturnType<typeof useAllowableShippingModes>['allowableShippingModes'] = {};
export const CheckoutProfilesEach: FC<Props> = ({ profile: p, expanded, toggleExpanded }) => {
	const localization = useLocalization('CheckoutProfile');
	const {
		allowableShippingModes = EMPTY_MODES,
		deleteCheckoutProfile,
		onEdit,
	} = useContext(ContentContext) as ReturnType<typeof useCheckoutProfiles> &
		ReturnType<typeof useAllowableShippingModes>;
	const [showOverlay, setShowOverlay] = useState<boolean>(false);
	const toggleOverlay = useCallback(() => setShowOverlay((pre) => !pre), []);

	useEffect(() => {
		!expanded && setShowOverlay(false);
	}, [expanded]);

	return (
		<Box>
			<Accordion
				id={`checkout-profile-${p.xchkout_ProfileName}`}
				expanded={expanded}
				onChange={toggleExpanded}
			>
				<AccordionSummary sx={checkoutProfileAccordionSummarySX}>
					<Stack flex={1}>
						<Stack direction="row" alignItems="center">
							<Typography variant="h6">{p.xchkout_ProfileName}</Typography>
							{!p.isValid ? (
								<Tooltip title={localization.invalidProfile.t()}>
									<IconButton size="small" color="warning">
										<ErrorOutlinedIcon />
									</IconButton>
								</Tooltip>
							) : null}
						</Stack>
						<Grid container spacing={4} alignItems="flex-start" flexWrap="wrap">
							<Grid item xs={6} md={3}>
								<Typography variant="overline">{localization.ShippingAddr.t()}</Typography>
								<CheckoutProfilesAddressDisplay address={p.shippingAddress} />
							</Grid>

							<Grid item xs={6} md={3}>
								<Typography variant="overline">{localization.ShippingMethodDisp.t()}</Typography>
								<Typography>
									{p.shipping_modeId
										? allowableShippingModes[p.shipping_modeId]?.shipModeDescription
										: null}
								</Typography>
							</Grid>

							<Grid item xs={6} md={3}>
								<Typography variant="overline">{localization.BillingAddr.t()}</Typography>
								<CheckoutProfilesAddressDisplay address={p.billingAddress} />
							</Grid>

							<Grid item xs={6} md={3}>
								<Typography variant="overline">{localization.BillingMethod.t()}</Typography>
								<Typography>
									{localization.payMethods[
										p.billingData.payment_method.value as keyof typeof localization.payMethods
									].t()}
								</Typography>

								{!NON_CREDIT_CARD_PAYMENTS.includes(p.billingData.payment_method.value) ? (
									<Typography>{p.billingData.account.value}</Typography>
								) : null}
							</Grid>
						</Grid>
					</Stack>
				</AccordionSummary>
				<Divider />
				<AccordionActions sx={checkoutProfilesEachActionsSX}>
					<Stack spacing={1} direction="row">
						<Button
							id={`checkout-profile-${p.xchkout_ProfileName}-edit`}
							variant="text"
							onClick={onEdit.bind(null, p)}
							startIcon={<EditOutlined />}
						>
							{localization.Edit.t()}
						</Button>
						<Button
							id={`checkout-profile-${p.xchkout_ProfileName}-delete`}
							color="secondary"
							variant="text"
							onClick={toggleOverlay}
							startIcon={<Delete />}
						>
							{localization.Delete.t()}
						</Button>
					</Stack>
					<ConfirmationOverlay
						{...{
							show: showOverlay,
							confirm: deleteCheckoutProfile.bind(null, p),
							cancel: toggleOverlay,
							confirmLabel: localization.confirmDelete.t(),
							cancelLabel: localization.Cancel.t(),
						}}
					/>
				</AccordionActions>
			</Accordion>
		</Box>
	);
};
