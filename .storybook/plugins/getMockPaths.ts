/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import fs from 'fs-extra';
import path from 'path';

type MocksTable = {
	[key: string]: string | undefined;
};

const makeKey = ({ filename, startAt }: Record<string, string>): string =>
	filename.replaceAll('\\', '/').split(startAt).at(-1)?.toString() || '';

const fromDir = (startPath: string, filter: string, startAt: string): any =>
	fs.existsSync(startPath)
		? fs
				.readdirSync(startPath)
				.map((file) => {
					const filename = path.join(startPath, file);
					return fs.lstatSync(filename).isDirectory()
						? fromDir(filename, filter, startAt)
						: filename.endsWith(filter)
						? {
								[makeKey({ filename, startAt })]: fs
									.readFileSync(filename)
									?.toString()
									?.match(/#import "(.+)"/)
									?.at(1),
						  }
						: false;
				})
				.filter((x) => !!x)
				.flat(1)
		: [];

export const getMockPaths = (mocksDirectory: string) => {
	return `export const mockPaths: Record<string, string> = ${JSON.stringify(
		fromDir(mocksDirectory, '.mock', '/mocks').reduce(
			(mocks: MocksTable, mock: MocksTable) => ({ ...mocks, ...mock }),
			{}
		),
		undefined,
		2
	)};`;
};
