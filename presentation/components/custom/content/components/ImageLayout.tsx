import { Skeleton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
// import { site } from "../../../_foundation/constants/site";

interface Props {
	src: string;
	alt?: string;
	className?: string;
	width?: string | number;
	height?: string | number;
	skeletonLoaderHeight?: string | number;
	transparent?: boolean;
	styles?: React.CSSProperties;
}

const ImageLayout: React.FC<Props> = ({
	src,
	alt,
	className,
	width,
	height,
	skeletonLoaderHeight,
	transparent,
	styles = {},
}) => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [imgSrc, setImgSrc] = useState(src);
	const imgRef = useRef<HTMLImageElement>(null);
	// const imgDefault = site.defaultImage;

	useEffect(() => {
		let isMounted = true;
		setLoaded(false);
		setImgSrc(src);

		// Check if image is already cached
		const img = new Image();
		img.src = src;

		const handleLoad = () => {
			if (isMounted) {
				setLoaded(true);
			}
		};

		const handleError = () => {
			if (isMounted) {
				setImgSrc(window['__isPrerender__'] ? src : '');
				setLoaded(true);
			}
		};

		// Handle the case where image is already cached
		if (img.complete) {
			handleLoad();
		}

		// Add event listeners
		img.addEventListener('load', handleLoad);
		img.addEventListener('error', handleError);

		// Cleanup
		return () => {
			isMounted = false;
			img.removeEventListener('load', handleLoad);
			img.removeEventListener('error', handleError);
		};
	}, [src]);

	// const setDefaultUrl = () => {
	//   if (imgRef.current) {
	//     imgRef.current.src = imgDefault;
	//   }
	// };

	return (
		<>
			{!loaded ? (
				<Skeleton
					variant="rectangular"
					animation="wave"
					width={width}
					height={skeletonLoaderHeight || height}
					sx={{ margin: '0 auto' }}
				>
					{width === '100%' && <div style={{ paddingTop: '100%' }}></div>}
				</Skeleton>
			) : (
				<img
					ref={imgRef}
					className={className}
					src={imgSrc}
					alt={alt}
					width={width}
					height={height}
					style={{ margin: '0 auto', display: 'block', opacity: transparent ? 0 : 1, ...styles }}
					onError={() => {
						setImgSrc(window['__isPrerender__'] ? src : '');
						setLoaded(true);
					}}
				/>
			)}
		</>
	);
};

export { ImageLayout };
