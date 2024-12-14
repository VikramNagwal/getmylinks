interface ImageSectionProps {
  avatarImage: string;
  coverImage?: string;
}


const ImageSection = ({
  avatarImage,
  coverImage = "https://source.unsplash.com/random/800x400",

}: ImageSectionProps) => {
  return (
   <section>
    <div className="relative">
      <img src={coverImage} alt="cover-image"  className="relative w-full max-h-[400px] aspect-[16/9] rounded-md object-cover"/>
      <img 
      src={avatarImage} 
      alt="avatar-image" 
      className="absolute left-6 -bottom-8 w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-opacity-90 border-green-500 object-cover"/>
    </div>
   </section>
  );
};

export default ImageSection;
