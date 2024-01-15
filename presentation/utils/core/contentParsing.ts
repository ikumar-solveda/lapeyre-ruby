/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Settings, dFix } from '@/data/Settings';
import { STRING_TRUE } from '@/data/constants/catalog';
import {
	MP_ENABLED,
	MP_SELLER_REG_ENABLED,
	MP_SELLER_REG_OFF,
	MP_SELLER_REG_ON,
} from '@/data/constants/environment';
import { AnyObject, AttributesObject } from '@/data/types/HTMLParse';
import { ThemeManifestTheme } from '@/styles/manifest';
import { combineSX } from '@/utils/combineSX';
import { SxProps, Theme } from '@mui/material';
import { camelCase, keyBy, partition } from 'lodash';
import { MouseEvent } from 'react';

export const getTagByKnownClass = (attribs: { [name: string]: string }) => {
	const classAttr = attribs.class ?? attribs.className;
	let rc = '';
	if (classAttr?.match(/^MuiGrid-/)) {
		rc = 'Grid';
	} else if (classAttr?.match(/^MuiContainer-/)) {
		rc = 'Container';
	} else if (classAttr?.match(/^MuiTypography-/)) {
		const classes = classAttr
			.split(' ')
			.filter(Boolean)
			.filter((c) => c.match(/^MuiTypography-/) && c !== 'MuiTypography-root');
		rc = classes.at(0)?.replace(/^MuiTypography-(.+)$/, '$1') ?? '';
	}
	return rc;
};

export const getGridAttrs = ({ classes }: { classes: string[] }) => {
	const grid = classes
		.filter((c) => c !== 'MuiGrid-root')
		.map((c) => c.replace('MuiGrid-', ''))
		.map((c) => c.replace(/^grid-([^-]+?)$/, '$1'))
		.map((c) => c.replace(/^grid-(.+?)-(\d+)$/, '$1=$2'))
		.reduce((gridAttrs, attr) => {
			const [key, value] = attr.split('=');
			return { ...gridAttrs, [key]: value ? Number(value) : true };
		}, {});

	return grid;
};

const getSxEquivalentMarginPadding = ({ classes }: { classes: string[] }): SxProps => {
	const REGEX = /^(vertical|horizontal|top|left|right|bottom)-(margin|padding)-(\d+)/;
	const REPLACE_MAP = { horizontal: 'x', vertical: 'y' };

	// e.g., convert vertical-margin-2 to my=2 and then turn that into SxProps
	const sx = classes
		.filter((c) => c.match(REGEX))
		.map((c) =>
			c.replace(
				REGEX,
				(match, g1: keyof typeof REPLACE_MAP, g2: string, g3: string) =>
					`${g2.replace(/(\w).+/, '$1')}${REPLACE_MAP[g1] ?? g1.replace(/(\w).+/, '$1')}=${g3}`
			)
		)
		.reduce((sx, pair) => {
			const [key, value] = pair.split('=');
			return { ...sx, [key]: Number(value) };
		}, {});

	return sx;
};

const MP_SX = { display: 'none !important' };
const EMPTY_SX = {};

const getSxEquivalentMarketplace = ({
	classes,
	settings,
}: {
	classes: string[];
	settings: Settings;
}): SxProps => {
	const userData = settings.userData;
	const mpSellerReg =
		STRING_TRUE === userData[MP_ENABLED] && STRING_TRUE === userData[MP_SELLER_REG_ENABLED];
	const asMap = keyBy(classes);
	return (mpSellerReg && asMap[MP_SELLER_REG_OFF]) || (!mpSellerReg && asMap[MP_SELLER_REG_ON])
		? MP_SX
		: EMPTY_SX;
};

export const getSxEquivalent = ({
	classes,
	settings,
}: {
	classes: string[];
	settings: Settings;
}): SxProps => {
	const spacing = getSxEquivalentMarginPadding({ classes });
	const mp = getSxEquivalentMarketplace({ classes, settings });
	return { ...spacing, ...mp } as SxProps;
};

export const getFixedAttribute = (attr: string) => {
	const REPLACE_MAP = {
		class: 'className',
		tabindex: 'tabIndex',
		srcset: 'srcSet',
	};
	const rc = REPLACE_MAP[attr as keyof typeof REPLACE_MAP] ?? attr;
	return rc;
};

export const convertStyleToSx = ({ style = '' }: { style: string }): SxProps => {
	const sx: Record<string, string> = {};
	style
		.split(/\s*;\s*/)
		.filter(Boolean)
		.forEach((s) => {
			const sl = s.split(/\s*:\s*/).filter(Boolean);
			if (sl.length === 2) {
				const [key, value] = sl;
				sx[camelCase(key)] = value;
			}
		});
	return sx as SxProps;
};

const makeObject = (item: any, ...args: any[]): AnyObject =>
	typeof item === 'function'
		? makeObject(item(...args), ...args)
		: item instanceof Object
		? item
		: {};

export const parseProcessAdditives = (
	{ add, className, style: _style, sx, ...rest }: AttributesObject,
	additives?: ThemeManifestTheme['additives'],
	theme?: Theme,
	settings?: Settings
): AttributesObject => {
	const _additives = makeObject(additives || {});
	const classes = ((className as string) ?? '').split(' ').filter(Boolean);
	const [gridClasses, nonGridClasses] = partition(classes, (name) => name.match(/^MuiGrid-/));
	const gridAttrs = getGridAttrs({ classes: gridClasses });
	const sxEquivalent = getSxEquivalent({ classes: nonGridClasses, settings: settings as Settings });
	const convertedStyles = convertStyleToSx({ style: `${_style}` });
	const all = [
		...nonGridClasses.map(camelCase),
		...((add as string) ?? '')
			.split(',')
			.map((a) => a.trim())
			.filter(Boolean),
	];
	const _sx: SxProps<Theme>[] = [
		...(Array.isArray(sx) ? sx : [makeObject(sx)]),
		sxEquivalent,
		convertedStyles,
	];

	const processed = {
		sx: all.reduce(
			(sx, addKey) => combineSX([...sx, makeObject(_additives[addKey], theme)]) as SxProps<Theme>[],
			_sx
		) as AnyObject[],
		className: nonGridClasses.join(' '),
		...gridAttrs,
		...rest,
	};
	return processed;
};

const isValidJSON = (string: string) => {
	try {
		JSON.parse(string);
		return true;
	} catch (e) {
		return false;
	}
};
export const mapAttributes = (
	attribs: Record<string, string>,
	additives?: ThemeManifestTheme['additives'],
	theme?: Theme,
	settings?: Settings,
	onClick?: (e: MouseEvent) => Promise<void>
): AttributesObject =>
	Object.entries(attribs).reduce(
		(attribs, [key, value]) => {
			const valueJSON = value.replaceAll(`'`, `"`);
			return parseProcessAdditives(
				{
					...attribs,
					[getFixedAttribute(key)]:
						value === ''
							? true
							: parseInt(value).toString() === value
							? dFix(value, 0)
							: isValidJSON(valueJSON)
							? JSON.parse(valueJSON)
							: value,
				},
				additives,
				theme,
				settings
			);
		},
		{ ...(attribs.href && { onClick }) } as AttributesObject
	);
