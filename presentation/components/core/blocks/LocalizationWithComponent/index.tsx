/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	Children,
	FC,
	PropsWithChildren,
	ReactElement,
	ReactNode,
	cloneElement,
	createElement,
	isValidElement,
} from 'react';
import htmlParseStringify, { ASTNode, TagNode } from 'html-parse-stringify';

type Props = PropsWithChildren<{
	components?: ReactElement[];
	text: string;
}>;

const processNodeWithReactElement = (astNode: TagNode, child: ReactElement, index: number) => {
	const { children, ...childProps } = child.props;
	const renderChildren = renderContent(
		astNode.children,
		Children.toArray(children).filter((node) => isValidElement(node)) as ReactElement[]
	);
	const props = { ...astNode.attrs, ...childProps, key: `${astNode.name}-${index}` };
	return cloneElement(child, props, ...renderChildren);
};

const renderContent = (ast: ASTNode[], childrenArray: ReactElement[]): ReactNode[] => {
	const res = ast.reduce((accumulator, currentNode, currentIndex) => {
		if (currentNode.type === 'text') {
			accumulator.push(currentNode.content);
		}
		if (currentNode.type === 'tag') {
			if (currentNode.voidElement) {
				// self closed tag, <br>
				accumulator.push(
					createElement(currentNode.name, { key: `${currentNode.name}-${currentIndex}` })
				);
			} else {
				const elm = childrenArray[parseInt(currentNode.name, 10)];
				if (elm) {
					// numbered tag
					accumulator.push(processNodeWithReactElement(currentNode, elm, currentIndex));
				} else {
					// regular tag in translation, e.g. `<p>, <b>, etc.`
					const renderChildren = renderContent(currentNode.children, childrenArray);
					accumulator.push(
						createElement(
							currentNode.name,
							{ key: `${currentNode.name}-${currentIndex}` },
							renderChildren
						)
					);
				}
			}
		}
		return accumulator;
	}, [] as ReactNode[]);
	return res;
};

export const LocalizationWithComponent: FC<Props> = ({ children, components, text }) => {
	const childrenArray: ReactElement[] = (components ?? Children.toArray(children)).filter((node) =>
		isValidElement(node)
	) as ReactElement[];
	if (childrenArray.length === 0 || text.trim() === '') return <>{text}</>;
	const astNode = htmlParseStringify.parse(`<0>${text}</0>`).at(0);
	if (astNode && astNode.type === 'tag') {
		const astNodeChildren = (astNode as TagNode).children;
		return <>{renderContent(astNodeChildren, childrenArray)}</>;
	} else {
		return <>{text}</>;
	}
};
