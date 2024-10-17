/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SelectWithResize } from '@/components/blocks/SelectWithResize';
import { headerLanguageAndCurrencyDialogActionsSX } from '@/components/content/Header/styles/languageAndCurrency/dialogActions';
import { headerLanguageAndCurrencyDialogCloseIconSX } from '@/components/content/Header/styles/languageAndCurrency/dialogCloseIcon';
import { headerLanguageAndCurrencyDialogTitleSX } from '@/components/content/Header/styles/languageAndCurrency/dialogTitle';
import { useLanguageAndCurrency } from '@/data/Content/LanguageAndCurrency';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Theme, useTheme } from '@mui/material/styles';
import { useContext, useMemo } from 'react';

export const LanguageAndCurrencySelectionDialog = () => {
	const {
		dialogOpen,
		handleSelectChange,
		selectedCurrency,
		selectedLocale,
		handleClose,
		supportedLanguages,
		supportedCurrencies,
		handleSubmit,
	} = useContext(ContentContext) as ReturnType<typeof useLanguageAndCurrency>;
	const localization = useLocalization('LanguageAndCurrency');
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const { settings } = useSettings();
	const { csrSession } = settings;
	const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
	const dialogProps = useMemo(
		() => (isMobile || csrSession ? { fullScreen: true } : { fullWidth: true }),
		[isMobile, csrSession]
	);
	return (
		<Dialog open={dialogOpen} onClose={handleClose} {...dialogProps}>
			<DialogTitle sx={headerLanguageAndCurrencyDialogTitleSX}>
				<Stack direction="row" gap={1}>
					<LanguageIcon />
					{localization.Title.t()}
				</Stack>
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={headerLanguageAndCurrencyDialogCloseIconSX}
			>
				<CloseIcon />
			</IconButton>
			<Divider />
			<Stack component="form" onSubmit={handleSubmit}>
				<DialogContent>
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
				</DialogContent>
				<DialogActions sx={headerLanguageAndCurrencyDialogActionsSX}>
					<Button
						variant="contained"
						id="language-currency-button-confirmation-dialog-submit"
						data-testid="language-currency-button-confirmation-dialog-submit"
						type="submit"
					>
						{localization.Apply.t()}
					</Button>
				</DialogActions>
			</Stack>
		</Dialog>
	);
};
