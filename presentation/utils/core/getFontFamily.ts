/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

type Font = {
	families: string[];
};

export const getFontFamily =
	(fonts: Font[]) =>
	(name: string): string =>
		(fonts ?? [])
			.sort((a, b) => a.families.indexOf(name) - b.families.indexOf(name))
			.at(0)
			?.families.join(',') ?? 'sans-serif';
