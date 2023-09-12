/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useAttributeFilter } from '@/data/Content/AttributeFilter';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { ProductAttribute, ProductAttributeValue } from '@/data/types/Product';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { FC, useContext } from 'react';

type Props = {
	attribute: ProductAttribute;
};
export const AttributeFilterRadioGroup: FC<Props> = ({ attribute }) => {
	const { onAttributeChange, selectedAttributes } = useContext(ContentContext) as ReturnType<
		typeof useAttributeFilter
	>;
	const productDetailNLS = useLocalization('productDetail');
	const VALUE_IS_ANY = productDetailNLS.any.t();
	const selectedValue = selectedAttributes?.[attribute.identifier] ?? VALUE_IS_ANY;

	return (
		<FormControl component="fieldset">
			<RadioGroup
				aria-label={attribute.name}
				name={attribute.name}
				value={selectedValue}
				onChange={(event) => onAttributeChange(attribute.identifier)(event)}
			>
				<FormControlLabel
					key={VALUE_IS_ANY}
					value={VALUE_IS_ANY}
					control={<Radio />}
					label={VALUE_IS_ANY}
					checked={selectedValue === VALUE_IS_ANY}
				/>
				{attribute.values.map((attrVal: ProductAttributeValue) => (
					<FormControlLabel
						key={attrVal.identifier}
						value={attrVal.identifier}
						checked={selectedValue === attrVal.identifier}
						control={<Radio />}
						label={attrVal.value}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};
