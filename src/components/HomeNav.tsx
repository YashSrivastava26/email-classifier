import Image from "next/image";
import { FC } from "react";
import { Button } from "./ui/button";
import { LuLogOut } from "react-icons/lu";
import { userType } from "@/types/userType";
import { Skeleton } from "@/components/ui/skeleton";

interface HomeNavProps {
  user: userType | null;
}

const HomeNav: FC<HomeNavProps> = ({ user }) => {
  return (
    <div className="flex mt-16  w-full justify-between">
      <div className="flex">
        {user ? (
          <>
            <Image
              src={user.picture}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full object-cover w-14 h-14"
            />
            <div className="ml-8">
              <h1 className="text-xl">{user.name}</h1>
              <h2 className="text-base">{user.email}</h2>
            </div>
          </>
        ) : (
          <>
            <Skeleton className="rounded-full  w-14 h-14 bg-gray-200" />
            <div className="ml-8 flex flex-col h-14 justify-evenly">
              <Skeleton className="h-4 w-[250px] bg-gray-200" />
              <Skeleton className="h-4 w-[200px] bg-gray-200" />
            </div>
          </>
        )}
      </div>

      <Button variant="link">
        <LuLogOut className="h-6 w-6 mr-4" />
        Logout
      </Button>
    </div>
  );
};

export default HomeNav;
