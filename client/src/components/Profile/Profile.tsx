import ProfileForm from "./ProfileForm";
import ImageSection from "./ProfileImageSection";


let avtimg = 'https://images.unsplash.com/photo-1732254721629-bf8275f694e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D'
let cover =
  "https://images.unsplash.com/photo-1726068449701-4e11c5d64b11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8";


const Profile = () => {
  return (
    <main className="max-w-[1280px] mx-auto px-4 py-3 md:mt-4">
      <ImageSection avatarImage={avtimg} coverImage={cover} />
      <ProfileForm />
    </main>
  );
};

export default Profile;
