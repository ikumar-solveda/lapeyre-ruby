/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { storeInventoryDialogDetailsPanelListControlSX } from '@/components/blocks/StoreInventoryDialog/styles/details/panelListControl';
import { ExpandMore } from '@mui/icons-material';
import {
	Collapse,
	List,
	ListItemButton,
	ListItemText,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useCallback, useState } from 'react';

export const StoreInventoryDialogPanel: FC<{
	children: JSX.Element | JSX.Element[] | undefined;
	label: string;
}> = ({ children, label }) => {
	const small = useMediaQuery(useTheme().breakpoints.down('md'));
	const [display, setDisplay] = useState<boolean>(true);
	const onClick = useCallback(() => setDisplay((prev) => !prev), []);

	return small ? (
		<List disablePadding>
			<ListItemButton onClick={onClick}>
				<ListItemText>
					<Typography variant="h6" color="primary">
						{label}
					</Typography>
				</ListItemText>
				<ExpandMore sx={storeInventoryDialogDetailsPanelListControlSX(display)} />
			</ListItemButton>
			<Collapse in={display} unmountOnExit>
				{children}
			</Collapse>
		</List>
	) : (
		<>{children}</>
	);
};
