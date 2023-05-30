/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { Paper, Stack, Typography } from '@mui/material';
import { CheckoutProfilesCreate } from '@/components/content/CheckoutProfiles/parts/Landing/Create';
import { FC, useEffect } from 'react';
import { Linkable } from '@/components/blocks/Linkable';
import { checkoutProfilesPaperSX } from '@/components/content/CheckoutProfiles/styles/Landing/paper';
import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { CheckProfilesList } from '@/components/content/CheckoutProfiles/parts/Landing/List';
import { CheckoutProfilesCreateEdit } from '@/components/content/CheckoutProfiles/parts/CreateEdit';
import { useAllowablePaymentMethods } from '@/data/Content/_AllowablePaymentMethods';

export const CheckoutProfiles: FC<{ id: ID }> = () => {
	const localization = useLocalization('CheckoutProfile');
	const useCheckoutProfilesValues = useCheckoutProfiles();
	const useAllowableShippingModesValues = useAllowableShippingModes();
	const useAllowablePaymentMethodsValues = useAllowablePaymentMethods();
	const { onCreate, searchTerm, checkoutProfileList, modifyState, setSearchTerm } =
		useCheckoutProfilesValues;

	useEffect(() => {
		setSearchTerm('');
		scrollTo(0, 0);
	}, [modifyState]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<ContentProvider
			value={{
				...useCheckoutProfilesValues,
				...useAllowableShippingModesValues,
				...useAllowablePaymentMethodsValues,
			}}
		>
			{!modifyState.state ? (
				<Stack spacing={2}>
					<Typography variant="h3">{localization.TitleCreate.t()}</Typography>
					<CheckoutProfilesCreate />
					{checkoutProfileList.length === 0 ? (
						<Paper sx={checkoutProfilesPaperSX}>
							{searchTerm ? (
								<LocalizationWithComponent
									text={localization.NoneFound.t()}
									components={[
										<Typography variant="h4" key="1" />,
										<Typography key="2" />,
										<Typography key="3">
											<Linkable
												type="inline"
												id="checkout-profile-create-new"
												data-testid="checkout-profile-create-new"
												onClick={onCreate}
											/>
										</Typography>,
									]}
								/>
							) : (
								<LocalizationWithComponent
									text={localization.NoProfiles.t()}
									components={[
										<Linkable
											type="inline"
											id="checkout-profile-create-new"
											data-testid="checkout-profile-create-new"
											onClick={onCreate}
											key="1"
										/>,
									]}
								/>
							)}
						</Paper>
					) : (
						<CheckProfilesList profiles={checkoutProfileList} />
					)}
				</Stack>
			) : (
				<CheckoutProfilesCreateEdit />
			)}
		</ContentProvider>
	);
};
