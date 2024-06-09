import { emailType } from "@/types/emailType";
import { FC, useState } from "react";
import { Badge } from "./ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface EmailTabProps {
  email: emailType;
}

const EmailTab: FC<EmailTabProps> = ({ email }) => {
  const [open, setopen] = useState<boolean>(false);
  return (
    <Drawer open={open} onOpenChange={setopen} direction="right">
      <DrawerTrigger className="text-left">
        <div className="w-full border border-slate-600/70 bg-gray-100 rounded-xl py-2 px-3 overflow-hidden text-sm ">
          <div className="flex  justify-between">
            <div className="font-bold">{email.from}</div>
            {email.category && (
              <Badge
                className={cn("text-white bg-gray-500", {
                  "bg-green-600": email.category === "Important",
                  "bg-orange-600": email.category === "Promotional",
                  "bg-blue-600": email.category === "Social",
                  "bg-yellow-600": email.category === "Marketing",
                  "bg-red-600": email.category === "Spam",
                })}
              >
                {email.category}
              </Badge>
            )}
          </div>
          <div className="flex">{email.snippet}</div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-white h-full w-1/2 left-1/2" dir="right">
        <DrawerHeader>
          <DrawerTitle>
            <div className="flex justify-between w-full items-center">
              <h1 className="text-xl font-bold">{email.from}</h1>
              {email.category && (
                <Badge className="bg-green-600 text-white h-6">
                  {email.category}
                </Badge>
              )}
            </div>
          </DrawerTitle>
          <DrawerDescription className="text-base my-3 underline">
            Subject: {email.subject}
          </DrawerDescription>
          <DrawerDescription className="text-sm my-3">
            {email.snippet}
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default EmailTab;
