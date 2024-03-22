import { extractNameParts } from "../../../utilities/stringUtils";

import type { ProfileUserProps } from "../../../types";

function ProfileUser({ user }: ProfileUserProps) {
	const { firstName, lastName } = extractNameParts(user?.name);

	return (
		<>
			<div className="border border-gray-200 p-5 rounded-xl mb-6 dark:border-gray-600/80">
				<h5 className="font-semibold text-base mb-4.5 text-violet-600 dark:text-violet-500">
					Informasi Personal
				</h5>
				<div className="grid grid-cols-6 gap-4">
					<div className="col-span-3">
						<p className="mb-1.5 text-gray-400 dark:text-gray-500">
							Nama Depan
						</p>
						<p className="font-medium dark:text-gray-300">{firstName}</p>
					</div>
					<div className="col-span-3">
						<p className="mb-1.5 text-gray-400 dark:text-gray-500">
							Nama Belakang
						</p>
						<p className="font-medium dark:text-gray-300">{lastName}</p>
					</div>
					<div className="col-span-3">
						<p className="mb-1.5 text-gray-400 dark:text-gray-500">
							Alamat Email
						</p>
						<p className="font-medium dark:text-gray-300">{user?.email}</p>
					</div>
					<div className="col-span-3">
						<p className="mb-1.5 text-gray-400 dark:text-gray-500">
							Nomor Telepon
						</p>
						<p className="font-medium dark:text-gray-300">
							{user?.phoneNumber}
						</p>
					</div>
					<div className="col-span-full">
						<p className="mb-1.5 text-gray-400 dark:text-gray-500">Alamat</p>
						<p className="font-medium dark:text-gray-300">
							Semarang, Indonesia
						</p>
					</div>
				</div>
			</div>
			{user?.role !== "Super Admin" && (
				<div className="border border-gray-200 p-5 rounded-xl mb-6 dark:border-gray-600/80">
					<h5 className="font-semibold text-base mb-4.5 text-violet-600 dark:text-violet-500">
						Informasi Sekolah
					</h5>
					<div className="grid grid-cols-6 gap-4">
						<div className="col-span-3">
							<p className="mb-1.5 text-gray-400 dark:text-gray-500">
								Nama Sekolah
							</p>
							<p className="font-medium dark:text-gray-300">
								{user?.school?.name}
							</p>
						</div>
						<div className="col-span-3">
							<p className="mb-1.5 text-gray-400 dark:text-gray-500">
								Jumlah Siswa
							</p>
							<p className="font-medium dark:text-gray-300">
								{user?.school?.studentsCount}
							</p>
						</div>
						<div className="col-span-full">
							<p className="mb-1.5 text-gray-400 dark:text-gray-500">Alamat</p>
							<p className="font-medium dark:text-gray-300">
								{user?.school?.address}
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ProfileUser;
