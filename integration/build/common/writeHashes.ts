/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import fs from 'fs-extra';

type Props = Record<string, string> & {
	hashPath: string;
};

export const writeHashes = ({ hashPath, ...rest }: Props) => {
	const comment = 'this file is generated -- do not edit unless you know what you are doing';
	fs.writeJSONSync(hashPath, { comment, ...rest }, { spaces: 2 });
};
