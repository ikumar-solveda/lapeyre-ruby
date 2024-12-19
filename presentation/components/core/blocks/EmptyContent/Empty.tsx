/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CSSProperties, FC } from 'react';

const MASK_STYLE = { maskType: 'luminance' } as CSSProperties;
export const Empty: FC<{ alt?: string; altId?: string }> = ({ altId = '', alt = '' }) => (
	<svg
		width="140"
		height="119"
		viewBox="0 0 140 119"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		role="img"
		aria-labelledby={`alt-${altId}`}
	>
		<title id={`alt-${altId}`}>{alt}</title>
		<rect x="0.000488281" y="0.5" width="134" height="118" rx="6" fill="#DDCFCF" />
		<g filter="url(#filter0_ddd_13416_8294)">
			<rect x="16.0005" y="12.5" width="102" height="26" rx="6" fill="white" />
			<mask
				id="mask0_13416_8294"
				style={MASK_STYLE}
				maskUnits="userSpaceOnUse"
				x="33"
				y="22"
				width="7"
				height="7"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M33.8755 22.125H39.1255C39.5417 22.125 39.8755 22.4625 39.8755 22.875V28.125C39.8755 28.5375 39.5417 28.875 39.1255 28.875H33.8755C33.4592 28.875 33.1255 28.5375 33.1255 28.125V22.875C33.1255 22.4625 33.4592 22.125 33.8755 22.125ZM33.8755 25.5L35.7505 27.375L39.1255 24L38.5967 23.4675L35.7505 26.3138L34.4042 24.9713L33.8755 25.5Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask0_13416_8294)">
				<rect x="32.0005" y="21" width="9" height="9" fill="#926B6F" />
			</g>
			<rect x="49.0005" y="22.5" width="53" height="6" rx="2" fill="#DDCFCF" />
		</g>
		<g filter="url(#filter1_ddd_13416_8294)">
			<rect x="16.0005" y="46.5" width="102" height="26" rx="6" fill="white" />
			<mask
				id="mask1_13416_8294"
				style={MASK_STYLE}
				maskUnits="userSpaceOnUse"
				x="33"
				y="56"
				width="7"
				height="7"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M33.8755 56.125H39.1255C39.5417 56.125 39.8755 56.4625 39.8755 56.875V62.125C39.8755 62.5375 39.5417 62.875 39.1255 62.875H33.8755C33.4592 62.875 33.1255 62.5375 33.1255 62.125V56.875C33.1255 56.4625 33.4592 56.125 33.8755 56.125ZM33.8755 59.5L35.7505 61.375L39.1255 58L38.5967 57.4675L35.7505 60.3138L34.4042 58.9713L33.8755 59.5Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask1_13416_8294)">
				<rect x="32.0005" y="55" width="9" height="9" fill="#926B6F" />
			</g>
			<rect x="49.0005" y="56.5" width="53" height="6" rx="2" fill="#DDCFCF" />
		</g>
		<g filter="url(#filter2_ddd_13416_8294)">
			<rect x="16.0005" y="80.5" width="102" height="26" rx="6" fill="white" />
			<mask
				id="mask2_13416_8294"
				style={MASK_STYLE}
				maskUnits="userSpaceOnUse"
				x="33"
				y="90"
				width="7"
				height="7"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M33.8755 90.125H39.1255C39.5417 90.125 39.8755 90.4625 39.8755 90.875V96.125C39.8755 96.5375 39.5417 96.875 39.1255 96.875H33.8755C33.4592 96.875 33.1255 96.5375 33.1255 96.125V90.875C33.1255 90.4625 33.4592 90.125 33.8755 90.125ZM33.8755 93.5L35.7505 95.375L39.1255 92L38.5967 91.4675L35.7505 94.3138L34.4042 92.9713L33.8755 93.5Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask2_13416_8294)">
				<rect x="32.0005" y="89" width="9" height="9" fill="#926B6F" />
			</g>
			<rect x="49.0005" y="90.5" width="53" height="6" rx="2" fill="#DDCFCF" />
		</g>
		<path
			d="M109.844 90.8341C123.351 90.8341 134.301 79.8843 134.301 66.377C134.301 52.8697 123.351 41.9199 109.844 41.9199C96.3365 41.9199 85.3867 52.8697 85.3867 66.377C85.3867 79.8843 96.3365 90.8341 109.844 90.8341Z"
			fill="#EEE6E6"
		/>
		<path d="M115.778 69.1035H84.3442V73.9147H115.778V69.1035Z" fill="#DDCFCF" />
		<path d="M115.778 53.9473H87.5518V58.7585H115.778V53.9473Z" fill="#93101C" />
		<path
			opacity="0.5"
			d="M134.3 65.3772C134.3 64.4952 134.3 63.6933 134.22 62.8112C131.815 55.5089 126.625 49.4506 119.778 45.9524C112.932 42.4541 104.982 41.7984 97.6549 44.1276C93.9311 46.2682 90.8367 49.3516 88.683 53.0678C86.5293 56.784 85.3922 61.0019 85.3862 65.297C86.2135 62.4796 87.5931 59.855 89.4448 57.576C91.2964 55.2971 93.5831 53.4094 96.1715 52.0229C98.7599 50.6365 101.598 49.7789 104.521 49.5003C107.445 49.2217 110.394 49.5276 113.198 50.4001C116.001 51.2726 118.603 52.6943 120.852 54.5824C123.101 56.4705 124.952 58.7872 126.296 61.3976C127.641 64.0081 128.453 66.8599 128.684 69.7871C128.916 72.7144 128.562 75.6584 127.645 78.4477C126.871 80.8661 125.706 83.1415 124.197 85.1834C127.326 82.9152 129.873 79.9376 131.629 76.4949C133.386 73.0521 134.301 69.2421 134.3 65.3772Z"
			fill="#43484C"
		/>
		<path
			d="M109.844 93.239C104.531 93.239 99.3371 91.6636 94.9195 88.7119C90.502 85.7602 87.0589 81.5648 85.0258 76.6563C82.9926 71.7478 82.4606 66.3466 83.4971 61.1357C84.5336 55.9249 87.0921 51.1384 90.8489 47.3816C94.6057 43.6248 99.3922 41.0663 104.603 40.0298C109.814 38.9933 115.215 39.5253 120.124 41.5585C125.032 43.5917 129.227 47.0347 132.179 51.4523C135.131 55.8698 136.706 61.0634 136.706 66.3764C136.706 73.5008 133.876 80.3334 128.838 85.3711C123.801 90.4089 116.968 93.239 109.844 93.239ZM109.844 44.3249C105.482 44.3249 101.219 45.6182 97.5925 48.0412C93.9662 50.4643 91.1398 53.9083 89.4708 57.9376C87.8017 61.967 87.3651 66.4008 88.2159 70.6784C89.0668 74.956 91.167 78.8851 94.2509 81.9691C97.3349 85.053 101.264 87.1532 105.542 88.0041C109.819 88.855 114.253 88.4183 118.282 86.7492C122.312 85.0802 125.756 82.2538 128.179 78.6275C130.602 75.0012 131.895 70.7377 131.895 66.3764C131.895 60.528 129.572 54.9191 125.436 50.7836C121.301 46.6482 115.692 44.3249 109.844 44.3249Z"
			fill="#660B13"
		/>
		<path
			d="M128.115 82.5042L124.713 85.9062L136.598 97.7907L140 94.3887L128.115 82.5042Z"
			fill="#660B13"
		/>
		<defs>
			<filter
				id="filter0_ddd_13416_8294"
				x="8.00049"
				y="5.5"
				width="118"
				height="42"
				filterUnits="userSpaceOnUse"
				colorInterpolationFilters="sRGB"
			>
				<feFlood floodOpacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="1" />
				<feGaussianBlur stdDeviation="4" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13416_8294" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="3" />
				<feGaussianBlur stdDeviation="2" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
				<feBlend
					mode="normal"
					in2="effect1_dropShadow_13416_8294"
					result="effect2_dropShadow_13416_8294"
				/>
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="3" />
				<feGaussianBlur stdDeviation="1.5" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
				<feBlend
					mode="normal"
					in2="effect2_dropShadow_13416_8294"
					result="effect3_dropShadow_13416_8294"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect3_dropShadow_13416_8294"
					result="shape"
				/>
			</filter>
			<filter
				id="filter1_ddd_13416_8294"
				x="8.00049"
				y="39.5"
				width="118"
				height="42"
				filterUnits="userSpaceOnUse"
				colorInterpolationFilters="sRGB"
			>
				<feFlood floodOpacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="1" />
				<feGaussianBlur stdDeviation="4" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13416_8294" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="3" />
				<feGaussianBlur stdDeviation="2" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
				<feBlend
					mode="normal"
					in2="effect1_dropShadow_13416_8294"
					result="effect2_dropShadow_13416_8294"
				/>
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="3" />
				<feGaussianBlur stdDeviation="1.5" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
				<feBlend
					mode="normal"
					in2="effect2_dropShadow_13416_8294"
					result="effect3_dropShadow_13416_8294"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect3_dropShadow_13416_8294"
					result="shape"
				/>
			</filter>
			<filter
				id="filter2_ddd_13416_8294"
				x="8.00049"
				y="73.5"
				width="118"
				height="42"
				filterUnits="userSpaceOnUse"
				colorInterpolationFilters="sRGB"
			>
				<feFlood floodOpacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="1" />
				<feGaussianBlur stdDeviation="4" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13416_8294" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="3" />
				<feGaussianBlur stdDeviation="2" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
				<feBlend
					mode="normal"
					in2="effect1_dropShadow_13416_8294"
					result="effect2_dropShadow_13416_8294"
				/>
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="3" />
				<feGaussianBlur stdDeviation="1.5" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
				<feBlend
					mode="normal"
					in2="effect2_dropShadow_13416_8294"
					result="effect3_dropShadow_13416_8294"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect3_dropShadow_13416_8294"
					result="shape"
				/>
			</filter>
		</defs>
	</svg>
);
