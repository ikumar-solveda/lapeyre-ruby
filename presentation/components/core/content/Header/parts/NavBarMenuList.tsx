/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { LinkWrap } from '@/components/blocks/Linkable';
import { COOKIES } from '@/data/constants/cookie';
import { CookiesSingletonContext } from '@/data/cookie/cookiesSingletonProvider';
import type { PageLink } from '@/data/Navigation';
import { getHref_Breadcrumb } from '@/utils/getHref_Breadcrumb';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { FC, MouseEvent, useCallback, useContext, useState } from 'react';

export const HeaderNavBarMenuList: FC<{
	tree?: PageLink[];
}> = ({ tree }) => {
	const { setSessionCookie } = useContext(CookiesSingletonContext);
	const [activeParentIndex, setActiveParentIndex] = useState<number | null>(null);
	const [activeChildIndex, setActiveChildIndex] = useState<number | null>(null);

	const onClick = useCallback(
		(trail?: string[]) => (_: MouseEvent<HTMLAnchorElement>) =>
			setSessionCookie(
				COOKIES.breadcrumb,
				trail?.length ? JSON.stringify(trail) : undefined
			),
		[setSessionCookie]
	);

	return (
		<Paper
			elevation={0}
			square
			sx={{
				display: 'flex',
				p: 3,
				minWidth: 1000,
				backgroundColor: 'white',
				boxShadow: 'none',
				borderLeft: 'none',
				borderRight: 'none',
				borderRadius: 0,
			}}
		>
			{/* Column 1 - Top categories */}
			<Stack spacing={1} sx={{ width: 250, pr: 2 }}>
				{tree?.map(({ label, url, trail, children }, idx) => {
					const isSelected = idx === activeParentIndex;
					return (
						<Box key={label + url}>
							<Typography
								component="button"
								onClick={() => {
									setActiveParentIndex(isSelected ? null : idx);
									setActiveChildIndex(null);
								}}
								sx={{
									fontWeight: isSelected ? 'bold' : 'normal',
									cursor: 'pointer',
									textAlign: 'left',
									textDecoration: 'none',
									border: 'none',
									background: isSelected ? '#f5f5f5' : 'none',
									color: 'text.primary',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									'&:hover': { backgroundColor: '#f0f0f0' },
									width: '100%',
									px: 1,
									py: 0.5,
								}}
							>
								{label}
								{children?.length > 0 ? <ExpandMoreIcon sx={{ transform: 'rotate(-90deg)', fontSize: 18 }} /> : null}
							</Typography>
						</Box>
					);
				})}
			</Stack>

			{/* Column 2 - Subcategories */}
			<Stack spacing={1} sx={{ width: 250, pr: 2 }}>
				{activeParentIndex !== null ? tree?.[activeParentIndex]?.children?.map((child, idx) => {
					const isSelected = idx === activeChildIndex;
					return (
						<Box key={child.label + child.url}>
							<Typography
								component="button"
								onClick={() => {
									setActiveChildIndex(isSelected ? null : idx);
								}}
								sx={{
									fontWeight: isSelected ? 'bold' : 'normal',
									cursor: 'pointer',
									textAlign: 'left',
									border: 'none',
									background: isSelected ? '#f5f5f5' : 'none',
									color: 'text.primary',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									'&:hover': { backgroundColor: '#f0f0f0' },
									width: '100%',
									px: 1,
									py: 0.5,
								}}
							>
								{child.label}
								{child.children?.length > 0 ? <ExpandMoreIcon sx={{ transform: 'rotate(-90deg)', fontSize: 18 }} /> : null}
							</Typography>
						</Box>
					);
				}) : null}
			</Stack>

			{/* Column 3 - Final children */}
			<Stack spacing={1} sx={{ width: 250 }}>
				{activeParentIndex !== null &&
					activeChildIndex !== null ? tree?.[activeParentIndex]?.children?.[activeChildIndex]?.children?.map((leaf) => (
						<LinkWrap key={leaf.label + leaf.url} href={getHref_Breadcrumb(leaf.url, leaf.trail)}>
							<Typography
								component="a"
								onClick={onClick(leaf.trail)}
								sx={{
									cursor: 'pointer',
									textDecoration: 'none',
									color: 'text.primary',
									'&:hover': { backgroundColor: '#f0f0f0' },
									px: 1,
									py: 0.5,
								}}
							>
								{leaf.label}
							</Typography>
						</LinkWrap>
					)) : null}
			</Stack>
		</Paper>
	);
};
