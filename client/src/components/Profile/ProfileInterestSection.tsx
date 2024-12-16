import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

interface InterestManagerClientProps {
  initialInterests: string[];
}

const ProfileInterestSection = ({
  initialInterests,
}: InterestManagerClientProps) => {

  const [interests, setInterests] = useState<string[]>(initialInterests);
  const [newInterest, setNewInterest] = useState("");

  const addInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  return (
    <div className="max-w-md dark:bg-background rounded-lg shadow-sm my-4">
      <form className="flex gap-2 mb-4">
        <div className="flex items-center px-2 py-0 w-[400px] rounded-lg">
          <Input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Add an interest"
            className="input-form border-none mx-3 dark:text-white focus:outline-none outline-none"
          />
          <Button type="button" onClick={addInterest}>
            Add
          </Button>
        </div>
      </form>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700"
          >
            {interest}
            <button
              onClick={() => removeInterest(interest)}
              className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInterestSection;
