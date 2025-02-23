import { LuMousePointerClick } from "react-icons/lu";
import { IoMdCopy, IoMdLink } from "react-icons/io";
import { IoReturnDownForward } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";

import { ReactElement } from "react";
import Peekaboo from "./tooltip";

interface LinkCardProps {
	shortLink: string;
	destination: string;
	clicks: number;
}

export default function LinkCard({
	shortLink,
	destination,
	clicks,
}: LinkCardProps): ReactElement {
	// const copyBtn = useRef<HTMLDivElement>(null);

	const getTitlefromLink = (link: string) => {
		const url = new URL(link);
		return url.hostname + url.pathname;
	};
	const host = getTitlefromLink(shortLink);
	const source = destination.split("//")[1].replace("www.", "");

	return (
		<div className="flex justify-between items-center px-4 py-2 md:px-6 m-2 max-w-[1280px] mx-auto text-sm border border-gray-200 dark:border-none rounded-xl shadow-md dark:bg-[#212020]">
			<div>
				<div className="flex items-center">
					<div>
						<a
							href={shortLink}
							target="_blank"
							className="text-blue-700 font-semibold flex items-center"
						>
							<IoMdLink
								size={24}
								className="mr-1 mt-1 p-1 rotate-45"
								fill="blue"
							/>
							{host}
						</a>
					</div>

					<div className="flex items-center space-x-2 ml-3">
						<Peekaboo
							children={
								<div>
									<IoMdCopy
										size={30}
										className="p-[3px] cursor-pointer border box-border border-gray-300 rounded-full opacity-80 hover:opacity-100"
									/>
								</div>
							}
							description="Copy to clipboard"
						/>
						<Peekaboo
							children={
								<div>
									<PiShareFat
										size={30}
										className="p-[3px] cursor-pointer border box-border border-gray-300 rounded-full opacity-80"
									/>
								</div>
							}
							description="Share"
						/>
					</div>
				</div>

				<div className="ml-3">
					<a
						href={destination}
						target="_blank"
						className="flex items-center text-balance text-base opacity-80"
					>
						<IoReturnDownForward size={32} className="mr-2 opacity-40" />
						{source}
					</a>
				</div>
			</div>

			<button className="px-2 py-1 hidden border border-gray-400/80 box-border rounded-md md:flex items-center font-thin text-sm">
				<LuMousePointerClick size={24} className="mr-2 p-1" />
				{clicks} clicks
			</button>
		</div>
	);
}
