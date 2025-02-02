import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { generateRandomNames } from "@/utils/names";

const KeyGenerator = ({
	setnames,
}: { setnames: React.Dispatch<React.SetStateAction<string>> }) => {
	const handleNamesGeneration = () => {
		setnames(generateRandomNames());
	};
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						type="button"
						onClick={handleNamesGeneration}
						variant={"outline"}
						className="cursor-pointer mx-2"
					>
						<Sparkles />
					</Button>
				</TooltipTrigger>
				<TooltipContent>Generate random key</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default KeyGenerator;
