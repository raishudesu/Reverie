import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EasterEgg = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p>Reverie 2023</p>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-normal">Developed by: Barysh Bacaltos</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EasterEgg;
