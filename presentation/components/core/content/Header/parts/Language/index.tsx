/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { HeaderLanguageConfirmationDialog } from '@/components/content/Header/parts/Language/ConfirmationDialog';
import { headerLinkSX } from '@/components/content/Header/styles/link';
import { headerPopperSX } from '@/components/content/Header/styles/popper';
import { useLanguage } from '@/data/Content/Language';
import { touchMoveListener } from '@/utils/touchMoveListener';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ClickAwayListener, MenuItem, Paper, Popper, Stack, Typography } from '@mui/material';
import { FC, useEffect } from 'react';

export const HeaderLanguage: FC = () => {
	const {
		promptForSwitch,
		settings,
		anchorEl,
		localization,
		languageTitle,
		selectLanguage,
		handleClick,
		handleClose,
		yesAction,
		noAction,
	} = useLanguage();

	useEffect(() => touchMoveListener(handleClose), []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<Linkable
				id="header-language-button"
				data-testid="header-language-button"
				type="button"
				sx={headerLinkSX}
				onClick={handleClick}
			>
				<Stack alignItems="center" direction="row" spacing={1}>
					<Typography>{languageTitle}</Typography>
					<ExpandMoreIcon />
				</Stack>
			</Linkable>
			{settings && settings.supportedLanguages ? (
				<Popper
					id="header-language-menu"
					data-testid="header-language-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					sx={headerPopperSX}
				>
					<ClickAwayListener onClickAway={handleClose}>
						<Paper>
							{settings.supportedLanguages.map((languageId: string) => (
								<MenuItem key={languageId} onClick={selectLanguage(languageId)}>
									{localization[languageId as keyof typeof localization].t()}
								</MenuItem>
							))}
						</Paper>
					</ClickAwayListener>
				</Popper>
			) : null}
			<HeaderLanguageConfirmationDialog {...{ promptForSwitch, yesAction, noAction }} />
		</>
	);
};
