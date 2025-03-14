/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { LanguagePromptType } from '@/data/Content/Language';
import { useLocalization } from '@/data/Localization';
import { Button } from '@mui/material';
import { FC } from 'react';

type Props = {
	promptForSwitch: LanguagePromptType;
	yesAction: () => void;
	noAction: () => void;
};

export const HeaderLanguageConfirmationDialog: FC<Props> = ({
	promptForSwitch,
	yesAction,
	noAction,
}) => {
	const localization = useLocalization('CommerceEnvironment');

	return (
		<Dialog
			open={promptForSwitch.open}
			onClose={noAction}
			title={localization.languagePopUp.Title.t()}
			content={localization.languagePopUp.Message.t({
				language:
					localization.language[promptForSwitch.langId as keyof typeof localization.language].t(),
			})}
			actions={
				<>
					<Button
						data-testid="view-wishlist-confirm-delete"
						id="view-wishlist-confirm-delete"
						variant="contained"
						fullWidth
						onClick={yesAction}
					>
						{localization.languagePopUp.Yes.t()}
					</Button>
					<Button
						data-testid="view-wishlist-cancel-delete"
						id="view-wishlist-cancel-delete"
						variant="outlined"
						fullWidth
						onClick={noAction}
					>
						{localization.languagePopUp.No.t()}
					</Button>
				</>
			}
		/>
	);
};
