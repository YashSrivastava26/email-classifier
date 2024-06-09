import { FC, useState } from "react";
import { FaRobot, FaSortDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { emailType } from "@/types/emailType";
import EmailList from "./EmailList";
import axios from "axios";
import { LuLoader2 } from "react-icons/lu";

interface HomeHeroProps {
  maxResults: number;
  setMaxResults: (value: number) => void;
  emailList: emailType[];
  setEmailList: (value: emailType[]) => void;
}

const HomeHero: FC<HomeHeroProps> = ({
  maxResults,
  setMaxResults,
  emailList,
  setEmailList,
}) => {
  const [loading, setloading] = useState<boolean>(false);
  const classifyEmails = async () => {
    setloading(true);
    try {
      const res = await axios.post("/api/classify", {
        api_key: localStorage.getItem("openAIKey"),
        mail: emailList,
      });
      const categories = res.data;
      const updatedEmailList = emailList.map((email, index) => ({
        ...email,
        category: categories[index], // Add the category to each email
      }));
      setEmailList(updatedEmailList); // Update the state with the new email list
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <div className="flex w-full  justify-between mt-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="border border-black py-2 px-4 flex rounded-lg ">
            <FaSortDown className="h-4 w-4 mr-2" />
            {maxResults}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white min-w-16">
            {Array.from({ length: 10 }, (_, i) => (
              <>
                <DropdownMenuItem
                  className=" hover:bg-gray-50"
                  key={i}
                  onClick={() => setMaxResults(i + 1)}
                >
                  {i + 1}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={() => classifyEmails()}
          className="bg-black text-white font-bold"
        >
          {loading ? (
            <LuLoader2 className="h-4 w-4 text-white animate-spin mr-2" />
          ) : (
            <FaRobot className="h-4 w-4 mr-2 text-white" />
          )}
          Classify
        </Button>
      </div>

      <EmailList emailList={emailList} />
    </>
  );
};

export default HomeHero;
