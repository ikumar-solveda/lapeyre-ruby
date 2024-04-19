/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

'use client';
import { createEmotionCache } from '@/utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { FC, Fragment, PropsWithChildren, useState } from 'react';

// Adapted from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
export const EmotionCacheProvider: FC<PropsWithChildren> = ({ children }) => {
	const [registry] = useState(() => {
		const cache = createEmotionCache();
		cache.compat = true;
		const prevInsert = cache.insert;
		let inserted: { name: string; isGlobal: boolean }[] = [];
		cache.insert = (...args) => {
			const [selector, serialized] = args;
			if (cache.inserted[serialized.name] === undefined) {
				inserted.push({
					name: serialized.name,
					isGlobal: !selector,
				});
			}
			return prevInsert(...args);
		};
		const flush = () => {
			const prevInserted = inserted;
			inserted = [];
			return prevInserted;
		};
		return { cache, flush };
	});

	useServerInsertedHTML(() => {
		const inserted = registry.flush();
		if (inserted.length === 0) {
			return null;
		}
		let styles = '';
		let dataEmotionAttribute = registry.cache.key;

		const globals: {
			name: string;
			style: string;
		}[] = [];

		inserted.forEach(({ name, isGlobal }) => {
			const style = registry.cache.inserted[name];

			if (typeof style !== 'boolean') {
				if (isGlobal) {
					globals.push({ name, style });
				} else {
					styles += style;
					dataEmotionAttribute += ` ${name}`;
				}
			}
		});

		return (
			<Fragment>
				{globals.map(({ name, style }) => (
					<style
						key={name}
						data-emotion={`${registry.cache.key}-global ${name}`}
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{ __html: style }}
					/>
				))}
				{styles ? (
					<style
						data-emotion={dataEmotionAttribute}
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{ __html: styles }}
					/>
				) : null}
			</Fragment>
		);
	});

	return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
};
