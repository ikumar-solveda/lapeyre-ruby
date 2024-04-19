/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ThemeOptions } from '@mui/material/styles';

export const CssBaseline: ThemeOptions = {
	components: {
		MuiCssBaseline: {
			styleOverrides: (theme) => `
			${theme.fonts
				.map(
					({ family, style, display, weight, src, unicodeRange }) => `
						@font-face {
							font-family: ${family};
							font-style: ${style};
							font-display: ${display};
							font-weight: ${weight};
							src: ${src};
							unicodeRange: ${unicodeRange};
						}
						`
				)
				.join(``)}
			html, body, #__next { max-width: 100vw; min-height: 100vh; display: flex; flex: 1; }
			#__next { flex-direction: column; }
			#__next > main {flex: 1;}
			img { max-width: 100%; }
            `,
		},
	},
};
