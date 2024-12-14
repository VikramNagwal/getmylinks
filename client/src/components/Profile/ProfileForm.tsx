import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea";
import ProfileInterestSection from "./ProfileInterestSection";
import ProfilePopOver from "./ProfilePopOver";

interface ProfileFormProps {
  name?: string;
  username?: string;
  email?: string;
  bio?: string;
  interests?: string[];
}


const ProfileForm = ({name = 'john Doe', username = "Enter Username", email = "johndoe@self.me", bio = "Tell about yourself", interests = ["Enter your interests"]}: ProfileFormProps) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  return (
    <div className="mt-11">
      <form onSubmit={handleSubmit}>
        {/* uploading images section/component */}
          <ProfilePopOver />
        <h2 className="my-4">Personal Information</h2>
        <div>
          <Input type="text" placeholder={name} className="input-form" />
          <Input type="text" placeholder={username} className="input-form" />
          <Input type="email" placeholder={email} className="input-form" />
          <Textarea typeof="text" placeholder={bio} className="input-form" />
          {/* interests section */}
            <ProfileInterestSection initialInterests={interests} />
        </div>
      </form>
    </div>
  );
}

export default ProfileForm