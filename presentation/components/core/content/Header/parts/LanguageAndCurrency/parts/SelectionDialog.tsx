/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { SelectWithResize } from '@/components/blocks/SelectWithResize';
import type { useLanguageAndCurrency } from '@/data/Content/LanguageAndCurrency';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import { FormControl, InputLabel, MenuItem, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type FC, useContext, useMemo } from 'react';

export const LanguageAndCurrencySelectionDialog: FC = () => {
	const {
		dialogOpen,
		handleSelectChange,
		selectedCurrency,
		selectedLocale,
		handleClose,
		supportedLanguages,
		supportedCurrencies,
		onSubmit,
	} = useContext(ContentContext) as ReturnType<typeof useLanguageAndCurrency>;
	const { settings } = useSettings();
	const localization = useLocalization('LanguageAndCurrency');
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const props = useMemo(
		() => (settings.csrSession ? { fullScreen: true } : { fullWidth: true }),
		[settings]
	);
	return (
		<Dialog
			open={dialogOpen}
			onClose={handleClose}
			props={props}
			title={
				<Stack direction="row" alignItems="center" gap={1}>
					<LanguageIcon />
					{localization.Title.t()}
				</Stack>
			}
			content={
				<Stack gap={contentSpacing}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>
							<Typography variant="body2">{localization.Language.t()}</Typography>
						</InputLabel>
						<SelectWithResize
							required
							data-testid="language"
							id="language"
							name="locale"
							fullWidth
							value={selectedLocale}
							onChange={handleSelectChange}
						>
							{supportedLanguages.map((language) => (
								<MenuItem value={language.localeName} key={language.languageId}>
									{language.languageDescription}
								</MenuItem>
							))}
						</SelectWithResize>
					</FormControl>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>
							<Typography variant="body2">{localization.Currency.t()}</Typography>
						</InputLabel>
						<SelectWithResize
							required
							data-testid="currency"
							id="currency"
							name="currency"
							fullWidth
							value={selectedCurrency}
							onChange={handleSelectChange}
						>
							{supportedCurrencies.map((currency) => (
								<MenuItem value={currency.currencyCode} key={currency.currencyCode}>
									{currency.currencyDescription}
								</MenuItem>
							))}
						</SelectWithResize>
					</FormControl>
				</Stack>
			}
			actions={
				<OneClick
					variant="contained"
					id="language-currency-button-confirmation-dialog-submit"
					data-testid="language-currency-button-confirmation-dialog-submit"
					onClick={onSubmit}
				>
					{localization.Apply.t()}
				</OneClick>
			}
		/>
	);
};
