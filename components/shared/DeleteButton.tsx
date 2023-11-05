"use client";

import { deleteThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { usePathname,useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";

const DeleteButton = ({ id, authorId }: { id: string; authorId: string }) => {
  const pathName = usePathname();
  const router = useRouter();
  const handleClick = (e: any) => {
    e.preventDefault();
    deleteThread(id, pathName);
  };
  console.log(pathName)
  return (
    <div onClick={handleClick}>
      <Image
        src={"/assets/delete.svg"}
        alt="repost"
        width={22}
        height={22}
        className="cursor-pointer object-contain"
      />
    </div>
  );
};

export default DeleteButton;
