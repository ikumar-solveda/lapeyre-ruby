/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

declare function mockserver(any): any;
declare namespace mockserver {
	export var headers: string[];
}

declare module 'mockserver' {
	export = mockserver;
}
