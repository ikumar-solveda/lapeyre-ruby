/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

/**
 * absolute url or a url that starts with `data:image`
 */
export const ABSOLUTE_OR_DATA_RE = /^([a-z]+:\/\/|data:image\/([a-z]+?);base64,).*$/i;

/**
 * relative url that starts at the root, e.g., `/path/to/file/from/root` but not `path/to/file`
 */
export const RELATIVE_ROOT_RE = /^\//;

/**
 * either of the above two REs
 */
export const REL_ROOT_OR_ABS_OR_DATA_RE = /^(\/|[a-z]+:\/\/|data:image\/([a-z]+?);base64,).*$/i;
