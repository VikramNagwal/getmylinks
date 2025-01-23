import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { z } from "zod";
import { ShortnSchema } from "@/schemas/authentication-schema";
import { zodResolver } from "@hookform/resolvers/zod";


type shortnForm = z.infer<typeof ShortnSchema>;

const ShortnForm = () => {
	const [link, setLink] = useState<string>("");
	const { toast } = useToast();

	const {
		register, 
		handleSubmit,
		formState: { errors },
	} = useForm<shortnForm>({
    resolver: zodResolver(ShortnSchema),
  });

	const onSubmit = async (data: any) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/url/shorten",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.status > 199 && res.status < 300) {
        toast({
          title: "URL shortened successfully",
        });
        setLink(res.data.shortUrl);
      }
    } catch (error) {
      return toast({
        title: "Something went wrong on our side 😢",
        description: "Please try again",
        variant: "destructive",
      })
    }
	}

	return (
    <section className="flex flex-col items-center justify-center">
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
              short.url/
            </span>
            <Input
              type="text"
              id="customShort"
              {...register("title")}
              placeholder={errors.title ? "Please add a valid URL" : "custom url"}
              className="h-10 rounded-l-none border-gray-300 w-full"
            />     
          </div>
        </div>

        <Button type="submit" className="w-full">
          Shorten URL
        </Button>
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
