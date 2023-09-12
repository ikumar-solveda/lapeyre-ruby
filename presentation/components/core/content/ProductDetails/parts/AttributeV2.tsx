/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Swatch } from '@/components/blocks/Swatch';
import { SWATCH } from '@/data/constants/catalog';
import { ProductAttribute, Selection } from '@/data/types/Product';
import { getAttributeType } from '@/utils/productAttributes';
import { FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { isEqual } from 'lodash';
import { FC } from 'react';

type WithFormControlConditionalProps = {
	isSwatch: boolean;
	children: JSX.Element | JSX.Element[];
	onAttributeChange: (attrId: string, valueId: string) => void;
	attrIdentifier: string;
};
const WithFormControlConditional: FC<WithFormControlConditionalProps> = ({
	isSwatch,
	onAttributeChange,
	attrIdentifier,
	children,
}) => (
	<Stack spacing={1} direction={isSwatch ? 'row' : 'column'}>
		{isSwatch ? (
			children
		) : (
			<FormControl component="fieldset">
				<RadioGroup onChange={(_e, value) => onAttributeChange(attrIdentifier, value)}>
					{children}
				</RadioGroup>
			</FormControl>
		)}
	</Stack>
);

type ProductAttributeV2Props = {
	attribute: ProductAttribute;
	skusAsAttrsList: Record<string, string>[];
	onAttributeChange: (attrId: string, valueId: string) => void;
	selection: Selection;
	isPivot?: boolean; // the pivot attribute can never be disabled, i.e., the selection alternator
};
export const ProductAttributeV2: FC<ProductAttributeV2Props> = ({
	attribute,
	skusAsAttrsList,
	onAttributeChange,
	selection,
	isPivot = false,
}) => {
	const { name, values, identifier: attrIdentifier } = attribute;
	const { attrsByIdentifier: currentlySelected = {} } = selection;
	const isSwatch = SWATCH === getAttributeType(values);
	const valueId = isSwatch ? currentlySelected[attrIdentifier] : null;
	const swatchValue = isSwatch ? values.find(({ identifier: id }) => id === valueId)?.value : null;

	// render attribute
	return (
		<Stack spacing={1}>
			<Typography variant="body2">
				{name}
				<Typography component="span">{isSwatch ? ': ' + swatchValue : null}</Typography>
			</Typography>

			{/**
			 * render values of the attribute -- if the attribute is swatch, render the array, otherwise
			 *   surround the array with a radio-group and render the array as radios
			 */}
			<WithFormControlConditional {...{ isSwatch, onAttributeChange, attrIdentifier }}>
				{values.map(({ identifier, value, image1path }) => {
					// this value is selected if the current SKU has its identifier as the value of the
					//   attribute's identifier
					const selected = currentlySelected[attrIdentifier] === identifier;

					// if this isn't part of the current sku's selection, check if such a SKU exists by
					//   replacing the current selection's value for the attribute
					const asSku = selected ? null : { ...currentlySelected, [attrIdentifier]: identifier };

					// mark this value disabled if selecting it would yield no SKU -- but only if not pivot
					const disabled =
						!selected && !skusAsAttrsList.find((sku) => isEqual(sku, asSku)) && !isPivot;

					return isSwatch ? (
						<Swatch
							key={identifier}
							title={value}
							onClick={() => onAttributeChange(attrIdentifier, identifier)}
							selected={selected}
							image={image1path}
							data-testid={`swatch-attribute-${identifier.toLowerCase()}`}
							id={`swatch-attribute-${identifier.toLowerCase()}`}
						/>
					) : (
						<FormControlLabel
							key={identifier}
							value={identifier}
							control={<Radio />}
							checked={selected}
							disabled={disabled}
							label={value}
						/>
					);
				})}
			</WithFormControlConditional>
		</Stack>
	);
};
