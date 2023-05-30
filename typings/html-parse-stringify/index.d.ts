/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

declare var htmlParseStringify: htmlParseStringify.htmlParseStringify;

declare module htmlParseStringify {
	export interface htmlParseStringify {
		new (): htmlParseStringify;
		parse_tag(tag: string): IDoc;
		parse(html: string, options?: IOptions): Array<ASTNode>;
		stringify(doc: IDoc): string;
	}

	export interface IDoc {
		type: string;
		content?: string;
		voidElement: boolean;
		name: string;
		attrs: {};
		children: IDoc[];
	}

	export interface IOptions {
		components: string[];
	}

	export type ASTNode = TagNode | TextNode;

	export interface TagNode {
		type: 'tag';
		name: string;
		attrs: any;
		voidElement: boolean;
		children: ASTNode[];
	}

	export interface TextNode {
		type: 'text';
		content: string;
	}
}

declare module 'html-parse-stringify' {
	export = htmlParseStringify;
}
