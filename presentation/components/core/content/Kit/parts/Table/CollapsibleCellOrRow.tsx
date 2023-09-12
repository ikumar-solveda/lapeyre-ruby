/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { kitTableCollapsibleCellOrRowInnerStack } from '@/components/content/Kit/styles/Table/collapsibleCellOrRowInnerStack';
import { kitTableCollapsibleCellOrRowTopStack } from '@/components/content/Kit/styles/Table/collapsibleCellOrRowTopStack';
import { kitTableCollapsibleIconSX } from '@/components/content/Kit/styles/Table/collapsibleIcon';
import { kitTableCollapsibleRowSX } from '@/components/content/Kit/styles/Table/collapsibleRow';
import { kitTableSelectSX } from '@/components/content/Kit/styles/Table/select';
import { useLocalization } from '@/data/Localization';
import { KitTableData } from '@/data/types/Product';
import { KeyboardArrowRight } from '@mui/icons-material';
import {
	Box,
	Button,
	Divider,
	IconButton,
	Paper,
	Stack,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { isEmpty } from 'lodash';
import { FC } from 'react';

export const KitTableCollapsibleCellOrRow: FC<
	CellContext<KitTableData, Record<string, string>>
> = ({ row, getValue }) => {
	const { showAttributes, hideAttrs, noAttrs } = useLocalization('productDetail');
	const open = row.getIsExpanded();
	const empty = isEmpty(row.original.subRows?.[0].attributes);
	const toggleOpen = row.getToggleExpandedHandler();
	const { spacing, direction } = kitTableCollapsibleCellOrRowTopStack;
	const { direction: innerDirection, spacing: innerSpacing } =
		kitTableCollapsibleCellOrRowInnerStack;
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

	return row.getCanExpand() ? (
		<TableCellResponsiveContent label={showAttributes.t()}>
			{isMobile ? (
				<Button
					data-testid={`select-attributes-${row.index}-link`}
					id={`select-attributes-${row.index}-link`}
					onClick={empty ? undefined : toggleOpen}
					sx={kitTableSelectSX}
					disabled={empty}
				>
					{empty ? noAttrs.t() : open ? hideAttrs.t() : showAttributes.t()}
				</Button>
			) : (
				<Tooltip title={empty ? noAttrs.t() : open ? hideAttrs.t() : showAttributes.t()}>
					<Box component="span">
						<IconButton
							aria-expanded="false"
							aria-label="row"
							size="large"
							color="primary"
							disabled={empty}
							onClick={empty ? undefined : toggleOpen}
						>
							<KeyboardArrowRight sx={kitTableCollapsibleIconSX(open)} />
						</IconButton>
					</Box>
				</Tooltip>
			)}
		</TableCellResponsiveContent>
	) : (
		<Paper sx={kitTableCollapsibleRowSX}>
			<Stack
				direction={direction}
				spacing={spacing}
				divider={<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />}
			>
				{Object.entries(getValue()).map(([name, value]) => (
					<Stack direction={innerDirection} key={name} spacing={innerSpacing}>
						<Typography variant="body2">{name}</Typography>
						<Typography>{value}</Typography>
					</Stack>
				))}
			</Stack>
		</Paper>
	);
};
