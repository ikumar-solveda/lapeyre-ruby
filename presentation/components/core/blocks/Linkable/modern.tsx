/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { MaterialImage } from '@/components/blocks/MaterialImage';
import { constructNextUrl, getAsPath, useSettings } from '@/data/Settings';
import { Switch } from '@/utils/switch';
import { Button, Link, SxProps, Theme } from '@mui/material';
import { ImageProps } from 'next/image';
import NextLink, { LinkProps } from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ComponentProps, FC, forwardRef, useMemo } from 'react';
import { UrlObject } from 'url';

type LinkablePropsCommon = {
	href?: LinkProps['href'];
	sx?: SxProps<Theme>;
	[key: string]: unknown;
};

type LinkablePropsText = {
	type?: 'link' | 'button' | 'inline';
	children?: JSX.Element | JSX.Element[] | string;
} & LinkablePropsCommon;

type LinkablePropsImage = {
	type: 'image';
} & LinkablePropsCommon &
	ImageProps;

type LinkableProps = LinkablePropsText | LinkablePropsImage;

/**
 * Used to make any component linkable.
 * `legacyBehavior` will potentially be removed in future release. Try to use with
 * `legacyBehavior={false}`
 */
export const LinkWrap: FC<
	Omit<ComponentProps<typeof NextLink>, 'href'> & { href?: string | UrlObject }
> = ({ href, children, ...props }) => {
	const path = usePathname();
	const query = useSearchParams();
	const asPath = useMemo(() => getAsPath(path, query), [path, query]);
	const {
		settings: { storeToken },
	} = useSettings();
	const _href = constructNextUrl(asPath, href, storeToken);

	return _href ? (
		<NextLink href={_href} passHref legacyBehavior {...props}>
			{children}
		</NextLink>
	) : (
		<>{children}</>
	);
};

/**
 * Used for general linking, where children can be a simple string label.
 */
export const Linkable: FC<LinkableProps> = forwardRef<HTMLAnchorElement, any>(
	({ type = 'link', href, children, sx, alt = '', ...props }, ref) =>
		Switch(type)
			.case('link', () => (
				<LinkWrap href={href}>
					{href ? (
						<Link ref={ref} {...props} sx={sx}>
							{children}
						</Link>
					) : (
						children
					)}
				</LinkWrap>
			))
			.case('button', () => (
				<LinkWrap href={href}>
					<Button ref={ref} component="a" {...props} sx={sx}>
						{children}
					</Button>
				</LinkWrap>
			))
			.case('inline', () => (
				<LinkWrap href={href}>
					<Button ref={ref} component="a" {...props} sx={sx} variant="inline">
						{children}
					</Button>
				</LinkWrap>
			))
			.case('image', () => (
				<LinkWrap href={href}>
					<Link sx={sx} ref={ref}>
						<MaterialImage alt={alt} {...props} />
					</Link>
				</LinkWrap>
			))
			.defaultTo(() => null)
);
