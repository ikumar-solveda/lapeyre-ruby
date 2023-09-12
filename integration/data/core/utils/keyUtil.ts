/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

type BaseValue = string | number | boolean | undefined;
type KeyComponentValue = BaseValue | Record<string, BaseValue>;
type Key = Record<string, KeyComponentValue | KeyComponentValue[]>;
type Mapper = Record<string, string>;
type OmitMapper = Record<string, boolean>;

const originals: Mapper = {
	_a: 'catalogId',
	_b: 'categoryId',
	_c: 'ceId',
	_d: 'contractId',
	_e: 'csrSession',
	_f: 'currency',
	_g: 'defaultCatalogId',
	_h: 'defaultCurrency',
	_i: 'defaultLanguage',
	_j: 'defaultLanguageId',
	_k: 'depthAndLimit',
	_l: 'DM_FilterResults',
	_m: 'DM_ReqCmd',
	_n: 'DM_ReturnCatalogGroupId',
	_o: 'emsName',
	_p: 'identifier',
	_q: 'inPreview',
	_r: 'isLoggedIn',
	_s: 'langId',
	_t: 'locale',
	_u: 'localeId',
	_v: 'params',
	_w: 'partNumber',
	_x: 'path',
	_y: 'profileName',
	_z: 'section',
	_A: 'sessionError',
	_B: 'sortOrder',
	_C: 'storeId',
	_D: 'storeToken',
	_E: 'storeTokenCandidate',
	_F: 'storeType',
	_G: 'tokenExternalValue',
	_H: 'tokenName',
	_I: 'tokenValue',
	_J: 'user',
};
const replacements = Object.entries(originals).reduce((agg, [name, value]) => {
	agg[value] = name;
	return agg;
}, {} as Mapper);

const valueFn = (mapper: Mapper, omit: OmitMapper | undefined, value: KeyComponentValue) =>
	value && typeof value === 'object' ? (mapperFn(mapper, omit, value) as KeyComponentValue) : value;

const mapperFn = (mapper: Mapper, omit: OmitMapper | undefined, key: Key) => {
	const mappedValueFn = valueFn.bind(null, mapper, omit);
	const entries = Object.entries(key);
	const ofInterest = omit ? entries.filter(([name]) => !omit[name]) : entries;
	return ofInterest.reduce((agg, [name, value]) => {
		const newName = mapper[name] ?? name;
		const newValue = Array.isArray(value) ? value.map(mappedValueFn) : mappedValueFn(value);
		agg[newName] = newValue;
		return agg;
	}, {} as Key);
};

export const shrink = (key: Key, omit?: OmitMapper) => mapperFn(replacements, omit, key);
export const expand = <T>(key: Key) => mapperFn(originals, undefined, key) as T;
