function LoadingProfileUser() {
	return (
		<>
			<div className="border border-gray-200 p-5 rounded-xl mb-6 dark:border-gray-700/80 animate-pulse-fast">
				<div className="skeleton-loader skeleton-base mb-6 w-40" />
				<div className="grid grid-cols-6 gap-y-6 gap-x-5">
					{[...Array(5)].map((_, index) => (
						<div className="col-span-3" key={index}>
							<div className="skeleton-loader skeleton-sm mb-3.5 w-1/2 xl:w-1/4" />
							<div className="skeleton-loader skeleton-sm w-4/5 xl:w-3/4" />
						</div>
					))}
					<div className="col-span-full">
						<div className="skeleton-loader skeleton-sm mb-3.5 w-1/4" />
						<div className="skeleton-loader skeleton-sm w-3/4" />
					</div>
				</div>
			</div>
			<div className="border border-gray-200 p-5 rounded-xl mb-6 dark:border-gray-700/80 animate-pulse-fast">
				<div className="skeleton-loader skeleton-base mb-6 w-40" />
				<div className="grid grid-cols-6 gap-y-6 gap-x-5">
					{[...Array(2)].map((_, index) => (
						<div className="col-span-3" key={index}>
							<div className="skeleton-loader skeleton-sm mb-3.5 w-1/2 xl:w-1/4" />
							<div className="skeleton-loader skeleton-sm w-4/5 xl:w-3/4" />
						</div>
					))}
					<div className="col-span-full">
						<div className="skeleton-loader skeleton-sm mb-3.5 w-1/4" />
						<div className="skeleton-loader skeleton-sm w-3/4" />
					</div>
				</div>
			</div>
		</>
	);
}

export default LoadingProfileUser;
