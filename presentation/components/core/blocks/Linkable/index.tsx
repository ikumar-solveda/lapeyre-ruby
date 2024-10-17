/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { MaterialImage } from '@/components/blocks/MaterialImage';
import { BC_COOKIE, HC_PREFIX } from '@/data/constants/cookie';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useCookieState } from '@/data/cookie/useCookieState';
import { constructNextUrl, useSettings } from '@/data/Settings';
import { hasBreadcrumbTrail } from '@/utils/hasBreadcrumbTrail';
import { stripBreadcrumbQuery } from '@/utils/stripBreadcrumbQuery';
import { Switch } from '@/utils/switch';
import { Button, Link, SxProps, Theme } from '@mui/material';
import { ImageProps } from 'next/image';
import NextLink, { LinkProps } from 'next/link'; // eslint-disable-line no-restricted-imports
import {
	ComponentProps,
	FC,
	forwardRef,
	MouseEvent,
	MouseEventHandler,
	useCallback,
	useMemo,
} from 'react';
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

const EMPTY = {};

/**
 * Used to make any component linkable.
 * `legacyBehavior` will potentially be removed in future release. Try to use with
 * `legacyBehavior={false}`
 */

export const LinkWrap: FC<
	Omit<ComponentProps<typeof NextLink>, 'href'> & { href?: string | UrlObject }
> = forwardRef<HTMLAnchorElement, any>(
	({ href, children, legacyBehavior = true, ..._props }, ref) => {
		const router = useNextRouter();
		const {
			settings: { storeToken },
		} = useSettings();
		const _href = useMemo(() => {
			let rc = constructNextUrl(router.asPath, href, storeToken);
			rc = hasBreadcrumbTrail(rc) ? stripBreadcrumbQuery(rc) : rc;
			return rc;
		}, [router, href, storeToken]);

		return _href ? (
			<NextLink
				href={_href}
				passHref={legacyBehavior}
				legacyBehavior={legacyBehavior}
				{..._props}
				ref={ref}
			>
				{children}
			</NextLink>
		) : (
			<>{children}</>
		);
	}
);

/**
 * Used for general linking, where children can be a simple string label.
 */
export const Linkable: FC<LinkableProps> = forwardRef<HTMLAnchorElement, any>(
	(
		{
			type = 'link',
			href,
			shallow = false,
			as,
			children,
			sx,
			alt = '',
			legacyBehavior = true,
			..._props
		},
		ref
	) => {
		const [_, setTrail] = useCookieState(BC_COOKIE, true, HC_PREFIX);
		const { onClick: _onClick, ...props } = _props;
		const onClick = useCallback(
			(event: MouseEvent<any>) => {
				setTrail(hasBreadcrumbTrail(href) ? JSON.stringify(href.query.trail) : undefined);
				if (_onClick) {
					(_onClick as MouseEventHandler)(event);
				}
			},
			[_onClick, href, setTrail]
		);

		const linkWrapProps = useMemo(
			() => (legacyBehavior ? { shallow } : { ref, legacyBehavior, shallow, sx, alt, ..._props }),
			[_props, alt, legacyBehavior, ref, shallow, sx]
		);

		const componentProps = useMemo(
			() => (legacyBehavior ? { component: 'a', ref } : EMPTY),
			[legacyBehavior, ref]
		);

		return Switch(type)
			.case('link', () => (
				<LinkWrap href={href} as={as} {...linkWrapProps}>
					{href && legacyBehavior ? (
						<Link ref={ref} onClick={onClick} {...props} sx={sx}>
							{children}
						</Link>
					) : (
						children
					)}
				</LinkWrap>
			))
			.case('button', () => (
				<LinkWrap href={href} as={as} {...linkWrapProps}>
					<Button onClick={onClick} {...props} sx={sx} {...componentProps}>
						{children}
					</Button>
				</LinkWrap>
			))
			.case('inline', () => (
				<LinkWrap href={href} as={as} {...linkWrapProps}>
					<Button onClick={onClick} {...props} sx={sx} variant="inline" {...componentProps}>
						{children}
					</Button>
				</LinkWrap>
			))
			.case('image', () => (
				<LinkWrap href={href} as={as} {...linkWrapProps}>
					{legacyBehavior ? (
						<Link sx={sx} ref={ref}>
							<MaterialImage alt={alt} onClick={onClick} {...props} />
						</Link>
					) : (
						<MaterialImage alt={alt} onClick={onClick} {...props} />
					)}
				</LinkWrap>
			))
			.defaultTo(() => null);
	}
);
