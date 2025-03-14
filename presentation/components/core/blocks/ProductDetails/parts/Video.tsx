/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { Img } from '@/components/blocks/MaterialImage';
import { productDetailsPlayerSX } from '@/components/blocks/ProductDetails/styles/player';
import { productDetailsPlayerBoxSX } from '@/components/blocks/ProductDetails/styles/playerBox';
import { useNotifications } from '@/data/Content/Notifications';
import { ErrorType } from '@/data/types/Error';
import { Box, CircularProgress, styled } from '@mui/material';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';

const StyledReactPlayer = styled(ReactPlayer)({});

type Props = {
	videoUrl: string;
	posterImage: string;
	name: string;
};

export const ProductDetailsVideo: FC<Props> = ({ videoUrl, posterImage, name }) => {
	const { notifyError } = useNotifications();
	const [isClient, setIsClient] = useState(false);
	const videoRef = useRef<ReactPlayer>(null);
	useEffect(() => {
		setIsClient(true);
	}, []);

	const onPlayerError = useCallback(() => {
		const msg = { type: 'common-error', messageKey: '_ERR_VIDEO_NOT_SUPPORT' } as ErrorType;
		notifyError(msg);
	}, [notifyError]);

	const onVideoEnded = useCallback(() => {
		videoRef.current?.showPreview();
	}, []);

	return isClient ? (
		<Box sx={productDetailsPlayerBoxSX}>
			<StyledReactPlayer
				ref={videoRef}
				sx={productDetailsPlayerSX}
				width="100%"
				height="100%"
				playing={true}
				url={videoUrl}
				light={<Img src={posterImage} alt={name} />}
				controls
				config={{
					file: {
						attributes: {
							controlsList: 'nodownload noplaybackrate',
							disablePictureInPicture: true,
						},
					},
				}}
				onError={onPlayerError}
				fallback={<Img src={posterImage} alt={name} />}
				onEnded={onVideoEnded}
			/>
		</Box>
	) : (
		<CircularProgress size={30} />
	);
};
