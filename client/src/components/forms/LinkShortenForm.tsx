import { z } from "zod";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { ShortnSchema } from "@/schemas/authentication-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import KeyGenerator from "../Key-generator";


type shortnForm = z.infer<typeof ShortnSchema>;

const LinkShortenForm = () => {

	const [link, setLink] = useState<string[]>([""]);
	const [randomNames, setRandomNames] = useState<string>("");

	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<shortnForm>({
		resolver: zodResolver(ShortnSchema),
	});

	const onSubmit = useCallback(
		async (data: any) => {
			try {
				const res = await axios.post(
					"http://localhost:8080/api/v1/url/shorten",
					data,
					{
						withCredentials: true,
					},
				);

				if (res.data.success) {
					toast({
						title: "URL shortened successfully 🎉",
						description: link,
					});
					setLink([res.data.shortUrl]);
				}
				reset();
			} catch (error) {
				return toast({
					title: "Something went wrong on our side :(",
					variant: "destructive",
				});
			}
		},
		[reset, toast, setLink],
	);

	return (
		<section className="flex flex-col items-center justify-center md:mt-[120px]">
			<h1 className="text-2xl font-bold my-4">Shorten your URL</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-4">
				<div>
					<Label htmlFor="longUrl">Long URL</Label>
					<Input
						type="url"
						id="longUrl"
						{...register("url", { required: true })}
						placeholder="https://example.com/very/long/url"
						required
					/>
					{errors.url && (
						<span className="text-red-500">
							{errors.url?.message || "Please add a valid URL"}
						</span>
					)}
				</div>
				<div>
					<Label htmlFor="customShort">Custom Short URL (optional)</Label>
					<div className="flex items-center w-full relative">
						<span className="inline-flex items-center px-3 h-10 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 text-sm">
							getmylinks.url/
						</span>
						<Input
							type="text"
							id="customShort"
							value={randomNames}
							{...register("title")}
							placeholder={
								errors.title ? "Please add a valid URL" : "custom url"
							}
							className="h-10 rounded-l-none border-gray-300 w-full"
						/>
						<KeyGenerator setnames={setRandomNames} />
					</div>
				</div>

				<Button type="submit" className="w-full hover:bg-hcolor">
					Shorten URL
				</Button>
			</form>
		</section>
	);
};

export default LinkShortenForm;
