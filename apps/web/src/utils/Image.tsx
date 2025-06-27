import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & { fallback: string };

export const Image = ({ src, loading, alt, fallback, ...props }: Props) => {
	const handleBrokenImage = (event: React.SyntheticEvent<HTMLImageElement>) => {
		const target = event.target as HTMLImageElement;
		target.src = fallback;
	};

	if (!src) return null;

	return (
		// biome-ignore lint/performance/noImgElement: custom fallback handling needed
		<img
			src={src}
			loading={loading}
			alt={alt}
			onError={handleBrokenImage}
			{...props}
		/>
	);
};
