/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useLocalization } from '@/data/Localization';
import { parseHTML } from '@/utils/parseHTML';
import { Fragment } from 'react';

type Props = {
	translated: ReturnType<typeof useLocalization>;
	html: Array<string | undefined>;
};

/**
 * Translates a non-(string parameter) object with one or more HTML tags and returns the JSX
 * @param translated translation object
 * @param html array of strings with HTML tags
 * @returns JSX of the translated string with HTML tags
 */
export const generateHTMLMessage = ({ translated, html }: Props) => ({
	text: (
		<LocalizationWithComponent
			text={(translated as any).t()}
			components={html.map((text = EMPTY_STRING, index) => (
				<Fragment key={index}>{parseHTML(text)}</Fragment>
			))}
		/>
	),
});
