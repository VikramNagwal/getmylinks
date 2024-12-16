import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea";
import ProfilePopOver from "./ProfilePopOver";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import axios from "axios"
import { useToast } from "../../hooks/use-toast";

interface ProfileFormProps {
  name?: string;
  userId?: string;
  email?: string;
  bio?: string;
}

type Inputs = ProfileFormProps


const ProfileForm = ({name = 'john Doe', userId = "@username", email = "johndoe@self.me", bio = "Tell about yourself"}: ProfileFormProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

    const { user } = useKindeAuth();
    const { toast } = useToast();

      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        const result = await axios.post(
          "http://localhost:8080/api/v1/user/profile", data,
        );
        if(result.status > 199 && result.status < 300) {
       return toast({
          variant: "success",
          title: "Profile Updated successfully",
          description: result.data.message
        });
      }

        console.log(result)
      }

          const userData = {
            name: user?.given_name,
            email: user?.email,
          };

  return (
    <div className="mt-11">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* uploading images section/component */}
        <ProfilePopOver />
        <h2 className="my-4">Personal Information</h2>
        <div>
          <Input
            type="text"
            placeholder={userData.name || name}
            {...register("name", {
              required: true,
              minLength: 2,
            })}
            className="input-form"
          />
          {errors.name && (
            <span className="text-red-600 font-thin">
              Please Enter your Name
            </span>
          )}
          <Input
            type="text"
            placeholder={userId}
            {...register("userId")}
            className="input-form"
          />
          <Input
            type="email"
            placeholder={userData?.email || email}
            {...register("email")}
            className="input-form"
          />
          <Textarea
            typeof="text"
            placeholder={bio}
            {...register("bio")}
            className="input-form"
          />
        </div>
        <Button type="submit">Save Profile</Button>
      </form>
    </div>
  );
}

export default ProfileForm