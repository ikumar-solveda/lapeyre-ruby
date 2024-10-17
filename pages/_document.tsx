/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getRequestId } from '@/data/utils/getRequestId';
import { initializeCookiesAtServer } from '@/data/utils/initializeCookiesAtServer';
import { traceWithId } from '@/data/utils/loggerUtil';
import { createEmotionCache } from '@/utils/createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import * as React from 'react';

// eslint-disable-next-line functional/no-class
export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="referrer" content="strict-origin-when-cross-origin" />
				</Head>
				<body>
					<Main />
					<NextScript />
					<Script
						id="fetch-wrapper"
						strategy="beforeInteractive"
						src="/interceptedFetch.js" // script placed in file to avoid CSP violations
					></Script>
				</body>
			</Html>
		);
	}
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
	traceWithId(getRequestId(ctx as any), 'Document: start');

	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	const originalRenderPage = ctx.renderPage;

	// You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
	// However, be aware that it can have global side effects.
	const cache = createEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	/* eslint-disable */
	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App: any) => (props) =>
				(
					<App
						emotionCache={cache}
						cookies={initializeCookiesAtServer(ctx, props as any)}
						{...props}
					/>
				),
		});
	/* eslint-enable */

	const initialProps = await Document.getInitialProps(ctx);
	// This is important. It prevents emotion to render invalid HTML.
	// See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));

	const rc = {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
	};

	traceWithId(getRequestId(ctx as any), 'Document: end');
	return rc;
};
