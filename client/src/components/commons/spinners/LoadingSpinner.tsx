// import { motion } from "motion/react"
import { Loader } from "lucide-react";

interface SpinnerProps {
	size?: number;
	color?: string;
}

const LoadingSpinner = ({ size = 28, color }: SpinnerProps) => {
	return <Loader size={size} color={color} className="mx-1 animate-spin" />;
};

export default LoadingSpinner;
