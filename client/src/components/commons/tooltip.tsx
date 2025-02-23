import React from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

interface TooltipProps {
    children: React.ReactNode;
    description: string;
}

export default function Peekaboo({ children, description}: TooltipProps): React.ReactElement {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}