import { emailType } from "@/types/emailType";
import { FC } from "react";
import EmailTab from "./EmailTab";
import { Skeleton } from "./ui/skeleton";

interface EmailListProps {
  emailList: emailType[];
}

const EmailList: FC<EmailListProps> = ({ emailList }) => {
  return (
    <div className=" flex flex-col gap-y-4 w-full h-full mt-4 overflow-x-hidden overflow-y-auto">
      {emailList.length === 0 ? (
        <>
          <Skeleton className="h-20 w-full bg-gray-200 rounded-2xl" />
          <Skeleton className="h-20 w-full bg-gray-200 rounded-2xl mt-0.5" />
          <Skeleton className="h-20 w-full bg-gray-200 rounded-2xl mt-0.5" />
        </>
      ) : (
        <>
          {emailList.map((email) => (
            <EmailTab key={email.id} email={email} />
          ))}
        </>
      )}
    </div>
  );
};

export default EmailList;
