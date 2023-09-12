/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useMemo } from 'react';
import { Swatch } from '@/components/blocks/Swatch';
import { RadioGroup, Radio, FormControl, FormControlLabel, Grid, Box } from '@mui/material';
import { ProductAttributeValue } from '@/data/types/Product';
import {
	getDefaultSelectedAttributeIds,
	getRemainingSkuAttributes,
} from '@/utils/productAttributes';
import { isEqual } from 'lodash';

type ProductAttributeElementProps = {
	attributeValues: ProductAttributeValue[];
	skuCurrentAttributeValues: ProductAttributeValue[];
	skuAttributeMap: Record<string, string>[];
	onChange: (id: string, value: string) => void;
};

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
export const ProductAttributeElement: FC<ProductAttributeElementProps> = (
	props: ProductAttributeElementProps
) => {
	const { attributeValues, skuCurrentAttributeValues, onChange, skuAttributeMap } = props;

	const { defaultSwatchId, defaultSwatchAttributeId, defaultRadioId, defaultRadioAttributeId } =
		useMemo(
			() => getDefaultSelectedAttributeIds(skuCurrentAttributeValues),
			[skuCurrentAttributeValues]
		);

	const otherRemainingAttributes: Record<string, string> = useMemo(
		() =>
			getRemainingSkuAttributes(
				attributeValues,
				defaultRadioId?.toString(),
				defaultRadioAttributeId
			),
		[attributeValues, defaultRadioAttributeId, defaultRadioId]
	);

	const skuToFind = useMemo(
		() => ({
			[defaultSwatchAttributeId]: defaultSwatchId,
			...otherRemainingAttributes,
		}),
		[otherRemainingAttributes, defaultSwatchId, defaultSwatchAttributeId]
	);

	const skuExists = useMemo(
		() => skuAttributeMap.find((sku) => isEqual(sku, skuToFind)),
		[skuAttributeMap, skuToFind]
	);
	return (
		<Box>
			<Grid container spacing={1}>
				{attributeValues.map((attributeValue) =>
					attributeValue.image1path ? (
						<Grid item key={attributeValue.identifier}>
							<Swatch
								title={attributeValue.identifier}
								onClick={() => onChange(defaultSwatchAttributeId, attributeValue.identifier)}
								selected={defaultSwatchId === attributeValue.identifier ? true : false}
								image={attributeValue.image1path}
							/>
						</Grid>
					) : (
						<Grid key={attributeValue.identifier} container item direction="column">
							<FormControl component="fieldset">
								<RadioGroup
									onChange={() => onChange(defaultRadioAttributeId, attributeValue.identifier)}
								>
									<FormControlLabel
										value={attributeValue.value}
										control={<Radio />}
										checked={defaultRadioId === attributeValue.identifier}
										disabled={
											attributeValue.identifier ===
											otherRemainingAttributes[defaultRadioAttributeId]
												? !skuExists
												: undefined
										}
										label={attributeValue.value}
									/>
								</RadioGroup>
							</FormControl>
						</Grid>
					)
				)}
			</Grid>
		</Box>
	);
};
