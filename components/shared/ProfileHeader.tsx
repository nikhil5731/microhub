"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { addFollowers } from "@/lib/actions/user.actions";
import { useState } from "react";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  followers: Number;
  isFollowed: Boolean;
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  followers,
  isFollowed,
}: Props) => {
  const [noOfFollowers, setNoOfFollowers] = useState(followers);
  const [isFollowedUser, setIsFollowedUser] = useState(isFollowed);

  const handleClick = async (e: any) => {
    e.preventDefault();
    const result = await addFollowers({
      userId: accountId,
      currentUserId: authUserId,
    });
    setNoOfFollowers(result.followers);
    setIsFollowedUser(result.status);
  };
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full gap-3 justify-between">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="profile-img"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
          <Button
            className={`${
              !isFollowedUser ? "user-card_btn" : "user-card_btn2"
            }`}
            onClick={handleClick}
          >
            {!isFollowedUser ? "Follow" : "Following"}
          </Button>
        </div>
      </div>
      <p className="mt-4 text-base-semibold text-gray-1">
        {`${noOfFollowers}`} Followers
      </p>
      <p className="mt-1 max-w-lg text-base-regular text-light-2">{bio}</p>
      <div className="mt-12 h-0.5 w-full bg-dark-3"></div>
    </div>
  );
};

export default ProfileHeader;
