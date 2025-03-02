import KeyGenerator from "@/components/Key-generator";
import LoadingSpinner from "@/components/commons/spinners/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";
import { fireCall } from "@/lib/axiosConfig";
import { logger } from "@/utils/logger";
import { useState } from "react";

const LinkForm = () => {
	const [key, setKey] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const { toast } = useToast();

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> {
		e.preventDefault();
		setLoading(true);
		
		const data = new FormData(e.target as HTMLFormElement);
		const link = data.get("url");
		const title = data.get("title") ? data.get("title") : key;

		try {
			const response = await fireCall.post("/url/shorten", {
				url: link,
				title,
			});
			
			if (response.data.success) {
				throw new Error("Unable to shorten link");
			}
			const shortLink = `${import.meta.env.BASE_URL}/${response.data.shortUrl}`;
			toast({
				title: "Link shortened successfully",
				description: shortLink || "you can now share your link",
			});
		} catch (error) {
			logger.logs("Unable to make api call");
			toast({
				title: "Something went wrong :(",
				description: "Please try again later",
			});
		}
		 finally {
			setLoading(false);
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
				<div>
					<label htmlFor="url" className="ml-4 pb-4 font-passage">
						Enter your link
					</label>
					<input
						type="text"
						name="url"
						placeholder="example: https://getmylinks/really-long-url"
						className="w-full p-4 pl-6 rounded-full bg-slate-100 dark:bg-background border border-gray-400 text-black dark:text-white placeholder:italic"
					/>
				</div>
				<div className="flex justify-between p-2 rounded-full border border-gray-400 max-w-[450px]">
					<input
						type="text"
						name="title"
						className="p-2 pl-4 rounded-full dark:bg-background dark:placeholder-white text-black bg-slate-100 focus:outline-none dark:text-white"
						placeholder={key ? key : "custom title (optional)"}
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
