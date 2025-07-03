import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Container, IconButton } from '@mui/material';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

interface HeroItem {
	imageDesktop: string;
	imageMobile: string;
	link: {
		url: string;
		type: 'internal' | 'external';
	};
	dateStart: string; // Expected format: ISO 8601 or similar
	dateEnd: string;
}

interface Props {
	data: HeroItem[];
}

const HeroBannerHome: FC<Props> = ({ data }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	console.log('###heroData123', data);
	const now = new Date();

	const filteredData = useMemo(() => {
		if (!data || !Array.isArray(data)) return [];

		return data.filter((item) => {
			const start = new Date(item.dateStart);
			const end = new Date(item.dateEnd);
			return now >= start && now <= end;
		});
	}, [data]);

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		loop: true,
		slides: { perView: 1 },
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
	});

	// ✅ Autoplay
	useEffect(() => {
		const slider = instanceRef.current;
		if (!slider || filteredData.length <= 1) return;

		timerRef.current = setInterval(() => {
			slider.next();
		}, 4000); // 4 seconds

		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [instanceRef, filteredData]);

	if (filteredData.length === 0) return null; // ❌ No valid slides, show nothing

	const handlePrev = () => instanceRef.current?.prev();
	const handleNext = () => instanceRef.current?.next();
	console.log('###filteredData', filteredData);
	return (
		<Container disableGutters maxWidth="xl" sx={{ position: 'relative' }}>
			<div ref={sliderRef} className="keen-slider">
				{filteredData.map((item, index) => (
					<div key={index} className="keen-slider__slide">
						<a
							href={item.link.url}
							target={item.link.type === 'external' ? '_blank' : '_self'}
							rel="noopener noreferrer"
						>
							<picture>
								<source
									media="(max-width: 768px)"
									srcSet={`https://www.statics-lapeyre.fr${item.imageMobile}`}
								/>
								<img
									src={`https://www.statics-lapeyre.fr${item.imageDesktop}`}
									alt={`hero-${index}`}
									style={{ width: '100%', display: 'block' }}
								/>
							</picture>
						</a>
					</div>
				))}
			</div>

			{/* Arrows */}
			<IconButton
				onClick={handlePrev}
				sx={{
					position: 'absolute',
					top: '50%',
					left: 8,
					transform: 'translateY(-50%)',
					zIndex: 10,
					backgroundColor: 'rgba(255,255,255,0.7)',
				}}
			>
				<ArrowBackIos />
			</IconButton>
			<IconButton
				onClick={handleNext}
				sx={{
					position: 'absolute',
					top: '50%',
					right: 8,
					transform: 'translateY(-50%)',
					zIndex: 10,
					backgroundColor: 'rgba(255,255,255,0.7)',
				}}
			>
				<ArrowForwardIos />
			</IconButton>

			{/* Dots */}
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
				{filteredData.map((_, index) => (
					<button
						key={index}
						onClick={() => instanceRef.current?.moveToIdx(index)}
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							margin: '0 4px',
							border: 'none',
							background: currentSlide === index ? '#000' : '#ccc',
							cursor: 'pointer',
						}}
					/>
				))}
			</div>

			<style jsx global>{`
				.keen-slider {
					display: flex;
					overflow: hidden;
					position: relative;
				}

				.keen-slider__slide {
					min-width: 100%;
				}
			`}</style>
		</Container>
	);
};

export default HeroBannerHome;
