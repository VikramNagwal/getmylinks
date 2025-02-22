import KeyGenerator from "@/components/Key-generator";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";
import { fireCall } from "@/lib/axios.config";
import { logger } from "@/utils/logger";
import { useState } from "react";

const LinkForm = () => {
	const [key, setKey] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const { toast } = useToast();

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> {
		setLoading(true);
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		const link = data.get("url");
		const title = data.get("title") ? data.get("title") : key;

		try {
			const response = await fireCall.post("/url/shorten", {
				url: link,
				title,
			});
			console.log(response); // eslint-disable-line
			if (response.status !== 200) {
				throw new Error("Unable to shorten link");
			}
			setLoading(false);

			toast({
				title: "Link shortened successfully",
				description: response.data.shortUrl || "you can now share your link",
			});
		} catch (error) {
			logger.logs("Unable to make api call");
			toast({
				title: "Something went wrong :(",
				description: "Please try again later",
			});
		}
	}

	return (
		<div className="p-4 rounded-md">
			<h2 className="text-2xl md:text-4xl font-bold my-3 text-center font-heading">
				Shorten your link
			</h2>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col max-w-[600px] mx-auto gap-4 mt-[30%] md:mt-12"
			>
				<input
					type="text"
					name="url"
					placeholder="example: https://getmylinks/really-long-url"
					className="w-full p-4 pl-6 rounded-full bg-slate-100 dark:bg-background border border-gray-400 text-black dark:text-white placeholder:italic"
				/>
				<div className="flex justify-between p-2 rounded-full border border-gray-400 max-w-[400px]">
					<input
						type="text"
						name="title"
						className="p-2 rounded-full dark:bg-background placeholder-black dark:placeholder-white text-black bg-slate-100 focus:outline-none dark:text-white"
						placeholder={key}
					/>
					<KeyGenerator setnames={setKey} />
				</div>
				<button
					type="submit"
					className="primary-btn rounded-full mt-6 text-center flex justify-center items-center"
					disabled={loading}
				>
					{loading ? <LoadingSpinner /> : "Shorten"}
				</button>
			</form>
		</div>
	);
};

export default LinkForm;
