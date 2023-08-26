import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Timestamp } from "firebase/firestore";

const PostDateTooltip = ({
  memoStr,
  date,
}: {
  memoStr: string;
  date: Timestamp;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>Posted {memoStr}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Posted on {date.toDate().toLocaleString()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PostDateTooltip;
