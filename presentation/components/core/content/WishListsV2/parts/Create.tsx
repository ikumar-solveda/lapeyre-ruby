/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IconLabel } from '@/components/blocks/IconLabel';
import { OneClick } from '@/components/blocks/OneClick';
import { wishListsV2CreateButtonSX } from '@/components/content/WishListsV2/styles/createButton';
import { wishListsV2CreateSummarySX } from '@/components/content/WishListsV2/styles/createSummary';
import { WISHLIST_NAME_INPUT_MAX_LENGTH } from '@/data/constants/wishlist';
import { useWishLists } from '@/data/Content/WishLists';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import Add from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { FC, useCallback, useContext, useState } from 'react';

export const WishListsV2Create: FC = () => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const toggle = useCallback(() => setExpanded((prev) => !prev), []);

	const localization = useLocalization('WishList');
	const { creationData, onNameV2, onCreate } = useContext(ContentContext) as ReturnType<
		typeof useWishLists
	>;
	return (
		<Stack>
			<Accordion
				data-testid="create-wish-list"
				id="create-wish-list"
				expanded={expanded}
				onClick={toggle}
			>
				<AccordionSummary
					sx={wishListsV2CreateSummarySX}
					expandIcon={<ExpandMoreIcon />}
					id="wish-list-create"
					aria-controls="wish-list-create-content"
				>
					<IconLabel
						icon={<Add color="primary" />}
						label={
							<Typography variant="subtitle1">{localization.CreateWishListTitle.t()}</Typography>
						}
					/>
				</AccordionSummary>
				<AccordionDetails
					data-testid="create-wish-list-accordion-details"
					id="create-wish-list-accordion-details"
					onClick={toggle}
				>
					<Grid container spacing={1} alignItems="flex-end">
						<Grid item xs={12} sm={6} md={5}>
							<TextField
								fullWidth
								required
								size="small"
								data-testid="create-wish-list-name"
								id="create-wish-list-name"
								name="wishListName"
								placeholder={localization.WishListName.t()}
								value={creationData.name}
								inputProps={{ maxLength: WISHLIST_NAME_INPUT_MAX_LENGTH }}
								onChange={onNameV2}
								error={creationData.error}
								helperText={creationData.error ? localization.InvalidWishListName.t() : ''}
							/>
						</Grid>
						<Grid item xs={12} sm={3} md={3}>
							<OneClick
								data-testid="create-wishlist"
								id="create-wishlist"
								variant="contained"
								disabled={creationData.error}
								sx={wishListsV2CreateButtonSX(creationData.error)}
								onClick={onCreate}
							>
								{localization.CreateList.t()}
							</OneClick>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</Stack>
	);
};
