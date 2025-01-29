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
// import { LinkIcon } from "lucide-react";

type shortnForm = z.infer<typeof ShortnSchema>;

const LinkShortenForm = () => {
	const [link, setLink] = useState<string[]>([""]);
	console.log(link);
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
					<div className="flex items-center w-full">
						<span className="inline-flex items-center px-3 h-10 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 text-sm">
							getmylinks.url/
						</span>
						<Input
							type="text"
							id="customShort"
							{...register("title")}
							placeholder={
								errors.title ? "Please add a valid URL" : "custom url"
							}
							className="h-10 rounded-l-none border-gray-300 w-full"
						/>
					</div>
				</div>

				<Button type="submit" className="w-full hover:bg-hcolor">
					Shorten URL
				</Button>
			</form>
			{/* <div className="mt-6 p-4 rounded-md bg-gray-900 w-96">
        <p className="text-start my-3 font-light text-xl tetx-white">links:</p>
        <div className="flex flex-col gap-3 space-y-3 text-green-500">
          {link.map((l, index) => (
            <a
              key={index}
              href={l}
              target="_blank"
              rel="noreferrer"
              className="text-center hover:text-green-400 p-2 rounded-md bg-gray-800"
            >
              <LinkIcon />
              {l}
            </a>
          ))}
        </div>
      </div> */}
		</section>
	);
};

export default LinkShortenForm;
