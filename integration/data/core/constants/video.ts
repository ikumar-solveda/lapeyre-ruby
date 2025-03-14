/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

/**
 * A set of regexes to potentially validate hostnames against
 *
 * Note that YouTube has several other top-level country domains, e.g., youtube.ca, which eventually
 * redirect back to youtube.com, but are still valid.
 *
 * We aren't checking for those here, but an adopter could perform the exercise of extending the
 * existing regex to include one or all of those or simply add any of those as extra domains to the
 * array.
 *
 */
export const VIDEO_DOMAINS = [/\b(youtube\.com|youtu\.be|vimeo\.com)\b/i];

export const VIDEO_EXTENSIONS = [
	'.wav',
	'.mp4',
	'.mpg',
	'.mpeg',
	'.mov',
	'.avi',
	'.qt',
	'.swf',
	'.wmv',
	'.webm',
	'.m4v',
	'.3gp',
];
