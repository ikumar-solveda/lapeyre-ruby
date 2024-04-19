/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { CheckoutProfilesCreateEdit } from '@/components/content/CheckoutProfiles/parts/CreateEdit';
import { CheckoutProfilesCreate } from '@/components/content/CheckoutProfiles/parts/Landing/Create';
import { CheckProfilesList } from '@/components/content/CheckoutProfiles/parts/Landing/List';
import { checkoutProfilesPaperSX } from '@/components/content/CheckoutProfiles/styles/Landing/paper';
import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';
import { useAllowablePaymentMethods } from '@/data/Content/_AllowablePaymentMethods';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useLocalization } from '@/data/Localization';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Pagination, Paper, Stack, Typography } from '@mui/material';
import { FC, useEffect } from 'react';

export const CheckoutProfiles: FC<{ id: ID }> = () => {
	const localization = useLocalization('CheckoutProfile');
	const useCheckoutProfilesValues = useCheckoutProfiles();
	const useAllowableShippingModesValues = useAllowableShippingModes();
	const useAllowablePaymentMethodsValues = useAllowablePaymentMethods();
	const {
		onCreate,
		searchTerm,
		checkoutProfileList,
		modifyState,
		setSearchTerm,
		pagination,
		totalPages,
		onPageChange,
		displayedItems,
	} = useCheckoutProfilesValues;

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
						<>
							<CheckProfilesList profiles={displayedItems} />
							{totalPages > 1 ? (
								<Pagination
									color="primary"
									count={totalPages}
									shape="rounded"
									page={pagination.pageNumber}
									onChange={onPageChange}
								/>
							) : null}
						</>
					)}
				</Stack>
			) : (
				<CheckoutProfilesCreateEdit />
			)}
		</ContentProvider>
	);
};
