import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { profileSchema } from "@/schemas/profile-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


const Profile = () => {
    const form = useForm({
        resolver: zodResolver(profileSchema),
    })
  return (
    <main>
        <div>
           <Form {...form}>
            <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="bio">Bio</FormLabel>
                        <Input {...field} id="bio" />
                    </FormItem>
                )}
                />
           </Form>
        </div>
    </main>
  )
}

export default Profile