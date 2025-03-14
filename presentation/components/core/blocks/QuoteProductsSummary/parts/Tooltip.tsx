/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ClickAwayListener, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { FC, useCallback, useState } from 'react';

const TOOLTIP_STATES = { open: true, close: false };
const SLOT_PROPS = { popper: { disablePortal: true } };

type Props = {
	title: string;
};

export const QuoteProductsSummaryTooltip: FC<Props> = ({ title }) => {
	const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const handleToolTip = useCallback(
		(action?: string) => () =>
			setTooltipOpen((open) => TOOLTIP_STATES[action as keyof typeof TOOLTIP_STATES] ?? !open),
		[]
	);

	return isMobile ? (
		<ClickAwayListener onClickAway={handleToolTip('close')}>
			<Tooltip
				onClose={handleToolTip('close')}
				open={tooltipOpen}
				disableFocusListener
				disableTouchListener
				disableHoverListener
				title={title}
				slotProps={SLOT_PROPS}
				id="quote-products-summary-tooltip"
				data-testid="quote-products-summary-tooltip"
			>
				<IconButton
					id="quote-products-summary-info-button"
					data-testid="quote-products-summary-info-button"
					onClick={handleToolTip('open')}
				>
					<InfoOutlinedIcon />
				</IconButton>
			</Tooltip>
		</ClickAwayListener>
	) : (
		<Tooltip
			id="quote-products-summary-tooltip"
			data-testid="quote-products-summary-tooltip"
			disableFocusListener
			disableTouchListener
			title={title}
		>
			<IconButton
				id="quote-products-summary-info-button"
				data-testid="quote-products-summary-info-button"
			>
				<InfoOutlinedIcon />
			</IconButton>
		</Tooltip>
	);
};
