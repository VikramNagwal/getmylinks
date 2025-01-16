import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { profileSchema } from "@/schemas/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const BioForm = () => {
	const form = useForm({
		resolver: zodResolver(profileSchema),
	});
	return (
		<section className="max-w-[580px] mx-auto p-4 bg-white/5 rounded-lg">
			<Form {...form}>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="bio">Bio</FormLabel>
							<Input
								{...field}
								id="bio"
								placeholder="Tell us about yourself..."
							/>
						</FormItem>
					)}
				/>
				<div className="flex justify-end space-x-4 p-3">
					<Button variant="outline">later</Button>
					<Button type="submit" variant="secondary">
						Save
					</Button>
				</div>
			</Form>
		</section>
	);
};

export default BioForm;
