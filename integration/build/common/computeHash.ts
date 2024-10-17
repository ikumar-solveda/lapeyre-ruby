/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { Hash, createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

/**
 * Recursively compute hash of directory
 */
const computeHashRecurse = (hash: Hash, relativeParentName: string, ...paths: string[]) =>
	paths.sort().forEach((path) => {
		const fd = statSync(path);
		const relName = [relativeParentName, basename(path)].join('/');
		if (fd.isDirectory()) {
			const fds = readdirSync(path, { withFileTypes: true }).map(({ name }) => join(path, name));

			// non-empty dirs only
			if (fds.length) {
				hash.update(`${relName}-${fds.length}`);
				computeHashRecurse(hash, relName, ...fds);
			}
		} else {
			const content = readFileSync(path, 'utf-8');
			hash.update(`${relName}-${content}`);
		}
	});

export const computeHash = (...paths: string[]) => {
	const hash = createHash('sha256');
	computeHashRecurse(hash, '', ...paths);
	return hash.digest().toString('hex');
};
