import { transformStringPlus } from "../../../utilities/stringUtils";

import type { UserScoreProps } from "../../../types";

function UserScore({ isLoading, isLoadingGet, students }: UserScoreProps) {
	return (
		<div
			className={`bg-white p-5 rounded-xl dark:bg-gray-800 flex items-center ${
				isLoading || isLoadingGet ? "animate-pulse-fast" : ""
			}`}
		>
			{isLoading || isLoadingGet ? (
				<>
					<div className="">
						<div className="skeleton-loader skeleton-sm !size-18 !rounded-full mr-3" />
					</div>
					<div className="">
						<div className="skeleton-loader skeleton-sm w-40 mb-3" />
						<div className="skeleton-loader skeleton-sm w-58 mb-2.5" />
						<div className="skeleton-loader skeleton-sm w-58" />
					</div>
				</>
			) : (
				<>
					<figure className="mr-3 size-18 rounded-full block overflow-hidden">
						<img
							src={
								students?.data?.image?.fileLink ??
								`https://ui-avatars.com/api/?name=${transformStringPlus(
									students?.data?.name
								)}&background=6d5Acd&color=fff`
							}
							alt={`${students?.data?.name} Profile`}
							className="w-full h-full object-cover object-center block"
						/>
					</figure>
					<div className="">
						<p className="font-semibold text-lg mb-0.5">
							{students?.data?.name}
						</p>
						<p className="text-gray-700 dark:text-gray-300">
							📧 {students?.data?.email || "-"}
						</p>
						<p className="text-gray-700 dark:text-gray-300">
							💼 {students?.data?.school?.name || "-"}
						</p>
					</div>
				</>
			)}
		</div>
	);
}

export default UserScore;
