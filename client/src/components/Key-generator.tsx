import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { generateRandomNames } from "@/utils/names";
import Peekaboo from "./commons/tooltip";

const KeyGenerator = ({
	setnames,
}: { setnames: React.Dispatch<React.SetStateAction<string>> }) => {
	const handleNamesGeneration = () => {
		setnames(generateRandomNames());
	};
	return (
		<Peekaboo
			children={
				<div>
					<Button
						type="button"
						onClick={handleNamesGeneration}
						variant="ghost"
						className="cursor-pointer hover:bg-background border-none"
					>
						Generate titles
						<Sparkles />
					</Button>
				</div>
			}
			description="Generate randon names"
		/>
	);
};

export default KeyGenerator;
