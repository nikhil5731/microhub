"use client";

import { fetchNoOfLikes, updateLikes } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { EventHandler, useEffect, useState } from "react";

const LikeButton = ({
  threadId,
  likes,
  currentUserId,
  isUserLiked,
}: {
  threadId: string;
  likes: Number;
  currentUserId: string;
  isUserLiked: Boolean;
}) => {
  const [like, setLike] = useState(likes);
  const [isLiked, setIsLiked] = useState(isUserLiked);

  const handleLike = async (e: any) => {
    e.preventDefault();

    const thread = await updateLikes(
      JSON.parse(threadId),
      JSON.parse(currentUserId)
    );
    setLike(thread.likes);
    setIsLiked(thread.status);
    console.log(thread);
  };

  return (
    <div
      className="flex items-center justify-center gap-1"
      onClick={handleLike}
    >
      <Image
        src={`/assets/heart-${isLiked ? "filled" : "gray"}.svg`}
        alt="like"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
      />
      <p className="mt-1 text-subtle-medium text-gray-1">{`${like}`}</p>
    </div>
  );
};

export default LikeButton;
