import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const ShortnForm = () => {
	const [link, setLink] = useState<string>("");
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await axios.post(
			"http://localhost:8080/api/v1/url/shorten",
			{ url: link },
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		console.log(res);
		if (res.status === 200) {
			toast({
				title: "URL shortened successfully",
			});
			setLink(res.data.shortUrl);
		}
	};

	return (
		<section className="flex flex-col items-center justify-center">
			<form onSubmit={(e) => handleSubmit(e)} className="flex space-x-2">
				<Input
					type="url"
					onChange={(e) => setLink(e.target.value)}
					placeholder="Paste your long URL"
				/>
				<Button type="submit">Shorten</Button>
			</form>
			<div className="mt-[80px]">
				<p>
					Shortened URL: <a href="#">{link}</a>
				</p>
			</div>
		</section>
	);
};

export default ShortnForm;
