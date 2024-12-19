/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { IconLabel } from '@/components/blocks/IconLabel';
import { createSX } from '@/components/content/WishLists/styles/create';
import { useWishLists } from '@/data/Content/WishLists';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import Add from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Grid,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { FC, useCallback, useContext, useState } from 'react';

/** @deprecated use `WishListsV2`*/
export const WishListCreate: FC = () => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const toggle = useCallback(() => setExpanded((prev) => !prev), []);

	const localization = useLocalization('WishList');
	const { creationData, onName, onCreate } = useContext(ContentContext) as ReturnType<
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
					sx={{ py: 1 }}
					expandIcon={<ExpandMoreIcon />}
					id="wishlist-create"
					aria-controls="wishlist-create-content"
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
								inputProps={{ maxLength: 128 }}
								onChange={onName}
								error={creationData.error}
								helperText={creationData.error ? localization.InvalidWishListName.t() : ''}
							/>
						</Grid>
						<Grid item xs={12} sm={3} md={3}>
							<Button
								data-testid="create-wishlist"
								id="create-wishlist"
								size="small"
								variant="contained"
								disabled={creationData.error}
								sx={createSX(creationData.error)}
								onClick={onCreate}
							>
								{localization.CreateList.t()}
							</Button>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</Stack>
	);
};
