import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../ui/button";
import { ProfileImageUploaderClient } from "./ProfileImgUploader";


const ProfilePopOver = () => {
  return (
    <div className="mt-4 md:mt-[80px]">
      <Dialog>
        <DialogTrigger>
            <Button type="button">
                Upload Avatar
            </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload your Avatar and Cover Image</DialogTitle>
            <DialogDescription>
              <ProfileImageUploaderClient />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProfilePopOver
