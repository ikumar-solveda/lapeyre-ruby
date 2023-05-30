/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import fs from 'fs-extra';
import path from 'path';
import md5 from 'md5';
import { getStoryCode } from './getStoryCode';
import { getMockPaths } from './getMockPaths';

const initOutput = ({ outputDirectory }: Record<string, string>) => {
	fs.rmSync(outputDirectory, { recursive: true, force: true });
	if (!fs.existsSync(outputDirectory)) {
		fs.mkdirSync(outputDirectory);
	}
};

const generateMocksTable = ({
	outputDirectory,
	mocksDirectory,
}: Record<string, string>) => {
	fs.writeFile(
		path.resolve(outputDirectory, `mocks.ts`),
		getMockPaths(mocksDirectory)
	);
};

type PropName = string;
type PropValue = string | undefined;
type PropType = string | undefined;
type PropDescription = Partial<[PropName, PropValue, PropType]>;

type StoryDescription = {
	name: string;
	props: PropDescription[];
	childProp?: string;
	children?: string;
};

// TODO Generate a story displaying all component options, for easier visual an accessibility testing.
// TODO Generate JEST tests along side stories, testing for accessibility.
const generateStories = ({
	storiesFile,
	outputDirectory,
}: Record<string, string>) => {
	const stories: StoryDescription[] = fs.readJSONSync(storiesFile);
	stories.forEach(({ name, props, childProp, children }) => {
		const knownProps = props.filter(([_, __, type]) => !type);
		const customProps = props.filter(([_, __, type]) => !!type);
		const propsWithValues = props.filter(([_, value]) => value !== undefined);
		return fs.writeFile(
			path.resolve(outputDirectory, `${name}.stories.tsx`),
			getStoryCode({
				name,
				knownProps,
				customProps,
				propsWithValues,
				childProp,
				children,
			})
		);
	});
};

export class SetupStories {
	stories: string;
	output: string;
	mocks: string;
	md5Previous: string | null;
	fsWait: boolean | NodeJS.Timeout;
	constructor(options: Record<string, string> = {}) {
		this.stories = options.muiStories;
		this.output = options.output;
		this.mocks = options.mocks;
		this.md5Previous = null;
		this.fsWait = false;
	}
	apply() {
		if (this.stories) {
			const onFileChange = (_: unknown, filename: string | boolean) => {
				if (filename) {
					if (this.fsWait) return;
					this.fsWait = setTimeout(() => {
						this.fsWait = false;
					}, 100);
					const md5Current = md5(fs.readFileSync(this.stories));
					if (md5Current === this.md5Previous) {
						return;
					}
					this.md5Previous = md5Current;
					try {
						initOutput({ outputDirectory: this.output });
						generateMocksTable({
							outputDirectory: this.output,
							mocksDirectory: this.mocks,
						});
						generateStories({
							outputDirectory: this.output,
							storiesFile: this.stories,
						});
					} catch (error) {
						console.log(error);
					}
				}
			};
			onFileChange(undefined, true);
			fs.watch(this.stories, onFileChange);
		}
	}
}
