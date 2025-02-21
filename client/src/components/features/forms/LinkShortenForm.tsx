import KeyGenerator from "@/components/Key-generator";
import { useState } from "react";

const LinkForm = () => {
	const [key, setKey] = useState<string>("");
	// const [url, setUrl] = useState<string>("");

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		const link = data.get("url")
		const title = data.get("title")
		console.log("Form submitted", link, title);
	}

	return (
    <div className="p-4 rounded-md">
      <h2 className="text-2xl md:text-4xl font-bold my-3 text-center font-heading">
        Shorten your link
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full mx-auto gap-4 mt-[30%] md:mt-12">
        <input
          type="text"
		  name="url"
          placeholder="https://getmylinks/really-long-url"
          className="w-full p-4 pl-6 rounded-full border border-gray-400 text-black dark:text-white bg-background"
        />
        <div className="flex justify-between p-2 rounded-full border border-gray-400 max-w-[400px]">
          <input
            type="text"
			name="title"
            className="p-2 text-black bg-background focus:outline-none dark:text-white"
            placeholder={key}
          />
          <KeyGenerator setnames={setKey} />
        </div>
        <button type="submit" className="primary-btn rounded-full">Shorten</button>
      </form>
    </div>
  );
}

export default LinkForm;