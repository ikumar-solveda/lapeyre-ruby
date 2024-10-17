/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { get } from 'lodash';
import { FC, useContext } from 'react';

import { SelectWithResize } from '@/components/blocks/SelectWithResize';
import { bundleTableDetailPanelInputLabelSX } from '@/components/content/Bundle/styles/Table/detailPanelInputLabel';
import { bundleTableDetailPanelStack } from '@/components/content/Bundle/styles/Table/detailPanelStack';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { BundleDetailsTableAuxiliaryContextValue } from '@/data/types/BundleDetailsTable';
import { BundleTableRowData, ResponseProductAttribute } from '@/data/types/Product';
import { Row } from '@tanstack/react-table';

const EMPTY_ARRAY: ResponseProductAttribute[] = [];

type Props = {
	row: Row<BundleTableRowData>;
};
export const BundleTableDetailPanel: FC<Props> = ({ row }) => {
	const { onAttributeSelect } = useContext(
		ContentContext
	) as BundleDetailsTableAuxiliaryContextValue;
	const { SelectAnOption } = useLocalization('productDetail');
	const { attrStates, definingAttributes = EMPTY_ARRAY, partNumber, isOneSku } = row.original;
	const isXS = useMediaQuery(useTheme().breakpoints.down('sm'));
	const { direction, spacing, sx } = bundleTableDetailPanelStack;
	return (
		<Paper>
			<Stack
				direction={direction}
				spacing={spacing}
				sx={sx}
				useFlexGap
				flexWrap="wrap"
				divider={<Divider orientation={isXS ? 'horizontal' : 'vertical'} flexItem />}
			>
				{definingAttributes.map((dAtt) => (
					<Stack key={dAtt.identifier} spacing={1}>
						<FormControl variant="outlined">
							<InputLabel
								disableAnimation={true}
								id="select-an-option"
								sx={bundleTableDetailPanelInputLabelSX}
							>
								<Typography variant="h6" component="p">
									{dAtt.name}
								</Typography>
							</InputLabel>
							<SelectWithResize
								labelId="select-an-option"
								data-testid={`${partNumber}-${dAtt.identifier}`}
								id={`${partNumber}-${dAtt.identifier}`}
								value={get(attrStates, dAtt.identifier, '')}
								size="small"
								displayEmpty
								disabled={!!isOneSku}
								required
								fullWidth
								onChange={onAttributeSelect(dAtt.identifier, row.original)}
							>
								<MenuItem hidden disabled value="">
									{SelectAnOption.t()}
								</MenuItem>
								{dAtt.values?.map((value, key) => (
									<MenuItem value={value.identifier} key={key}>
										{value.value}
									</MenuItem>
								))}
							</SelectWithResize>
						</FormControl>
					</Stack>
				))}
			</Stack>
		</Paper>
	);
};
