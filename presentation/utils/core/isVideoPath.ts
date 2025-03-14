/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { VIDEO_DOMAINS, VIDEO_EXTENSIONS } from '@/data/constants/video';

export const isVideoPath = (path: string) => {
	let rc = false;

	if (path) {
		try {
			// check if path is an absolute URL that potentially contains a video
			const url = new URL(path);

			// check if URL corresponds to one of our known video domains -- we shall simplistically
			//   conclude it is a video URL if it is -- we could potentially add additional checking here
			//   to validate that the rest of the path corresponds to what is the "video" on the domain,
			//   i.e., it is a link to an actual youtube video and not to a youtube channel, etc.
			rc = VIDEO_DOMAINS.some((re) => url.hostname.match(re));
		} catch (e) {}

		// check if path (relative or absolute) points to a video file
		if (!rc) {
			rc = VIDEO_EXTENSIONS.some((ext) => path.endsWith(ext));
		}
	}

	return rc;
};
