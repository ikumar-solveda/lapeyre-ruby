/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

type OptionalString = string | undefined;
type Props = [OptionalString?, OptionalString?, OptionalString?][];
type StoryCodeInput = {
	name: string;
	knownProps: Props;
	customProps: Props;
	propsWithValues: Props;
	childProp?: string;
	children?: string;
};

export const getStoryCode = ({
	name,
	knownProps,
	customProps,
	propsWithValues,
	childProp,
	children,
}: StoryCodeInput) => `
import React from "react";
import { ComponentMeta } from '@storybook/react';
${
	!childProp && children ? `import { parseHTML } from '@/utils/parseHTML';` : ''
}
import {
  ${name} as Mui${name},
  ${name}Props as Mui${name}Props,
} from "@mui/material";

type ${name}BaseProps = Pick<Mui${name}Props, ${knownProps
	.map(([prop]) => `"${prop}"`)
	.join(' | ')}>;

export interface ${name}Props extends ${name}BaseProps {
    ${customProps.map(([prop, _, type]) => `${prop}: ${type};`).join(`
    `)}
}

${
	childProp
		? `
export const ${name} = ({ ${childProp}, ...rest }: ${name}Props) => (
  <Mui${name} {...rest}>{${childProp}}</Mui${name}>
);
`
		: children
		? `
export const ${name} = (props: ${name}Props) => (
  <Mui${name} {...props}>{parseHTML(\`${children}\`)}</Mui${name}>
);
`
		: `
export const ${name} = (props: ${name}Props) => (
    <Mui${name} {...props} />
  );
`
}

${name}.args = {
    ${propsWithValues.map(([name, value]) => `${name}: '${value}',`).join(`
    `)}
};

export default {
    title: 'UI Components/${name}',
    component: ${name},
} as ComponentMeta<typeof ${name}>;
`;
