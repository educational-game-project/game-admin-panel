import { useState } from "react";
import ReactDOM from "react-dom";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";

import type { GalleryPortalProps, ImageGalleryProps } from "../types";

function GalleryPortal({
	images,
	currentSlide,
	handleClose,
	prevSlide,
	nextSlide,
}: GalleryPortalProps) {
	return ReactDOM.createPortal(
		<div className="inset-0 bg-gray-900/20 z-[9999] fixed overflow-hidden backdrop-blur-sm">
			<div className="w-full min-h-screen relative px-24 flex items-center justify-center">
				<div className="absolute left-5 top-5">
					<p className="size-10 rounded-lg flex items-center justify-center bg-indigo-500 transition dark:bg-indigo-700 shadow-md text-gray-100">
						{currentSlide + 1}/{images?.length}
					</p>
				</div>
				<div className="absolute top-5 right-5">
					<button
						type="button"
						className="group/close-slide size-10 rounded-full flex items-center justify-center bg-gray-50 transition hover:bg-red-500 dark:bg-gray-950 dark:hover:bg-red-700 shadow-md"
						onClick={handleClose}
					>
						<XIcon
							size={20}
							className="stroke-gray-800 dark:stroke-gray-300 group-hover/close-slide:stroke-gray-100"
						/>
					</button>
				</div>
				<div className="absolute right-5 top-1/2 transform -translate-y-1/2">
					<button
						type="button"
						className="group/next-slide size-10 rounded-full flex items-center justify-center bg-gray-50 transition hover:bg-indigo-500 dark:bg-gray-950 dark:hover:bg-indigo-700 shadow-md"
						onClick={nextSlide}
					>
						<ChevronRightIcon
							size={20}
							className="stroke-gray-800 dark:stroke-gray-300 group-hover/next-slide:stroke-gray-300"
						/>
					</button>
				</div>
				<div className="absolute left-5 top-1/2 transform -translate-y-1/2">
					<button
						type="button"
						className="group/next-slide size-10 rounded-full flex items-center justify-center bg-gray-50 transition hover:bg-indigo-500 dark:bg-gray-950 dark:hover:bg-indigo-700 shadow-md"
						onClick={prevSlide}
					>
						<ChevronLeftIcon
							size={20}
							className="stroke-gray-800 dark:stroke-gray-300 group-hover/next-slide:stroke-gray-300"
						/>
					</button>
				</div>
				<div>
					<img
						className="h-[75dvh] w-auto object-center object-contain max-w-full max-h-full mb-5"
						src={images?.[currentSlide]?.fileLink}
						alt={images?.[currentSlide]?.fileName}
					/>
					<div className="flex justify-center">
						<p className="text-center px-2 py-1 rounded-md bg-gray-800 text-gray-200">
							{images?.[currentSlide]?.fileName}
						</p>
					</div>
				</div>
			</div>
		</div>,
		document.getElementById("root-gallery") as HTMLElement
	);
}

function ImageGallery({ images, height }: ImageGalleryProps) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [openImage, setOpenImage] = useState(false);

	const handleOpenImage = (index: number) => {
		setCurrentSlide(index);
		setOpenImage(true);
		document.body.style.overflow = "hidden";
	};

	const handleCloseImage = () => {
		setOpenImage(false);
		document.body.style.overflow = "auto";
	};

	const prevSlide = () => {
		if (images === undefined || images.length === 0) return;
		currentSlide === 0
			? setCurrentSlide(images.length - 1)
			: setCurrentSlide(currentSlide - 1);
	};

	const nextSlide = () => {
		if (images === undefined || images.length === 0) return;
		currentSlide + 1 === images.length
			? setCurrentSlide(0)
			: setCurrentSlide(currentSlide + 1);
	};

	return (
		<div>
			<div className="grid grid-cols-12 xl:grid-cols-10 gap-4">
				{images?.map((image, index) => (
					<div className="col-span-4 lg:col-span-3 xl:col-span-2" key={index}>
						<figure
							onClick={() => handleOpenImage(index)}
							className="group/image-gallery overflow-hidden w-full rounded-md mr-3 cursor-zoom-in"
							style={{ height: `${height}px` }}
						>
							<img
								src={image?.fileLink}
								alt={image?.fileName}
								className="w-full h-full object-cover object-center group-hover/image-gallery:scale-105 transition-transform duration-300 ease-in-out"
							/>
						</figure>
					</div>
				))}
			</div>

			{openImage && (
				<GalleryPortal
					images={images}
					currentSlide={currentSlide}
					handleClose={handleCloseImage}
					prevSlide={prevSlide}
					nextSlide={nextSlide}
				/>
			)}
		</div>
	);
}

export default ImageGallery;
