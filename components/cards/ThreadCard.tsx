import { formatDateString } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "../shared/LikeButton";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  createdAt: string;
  comments: [
    {
      author: {
        image: string;
      };
    }
  ];
  isComment?: boolean;
  likes: Number;
  isUserLiked: Boolean;
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  comments,
  isComment,
  likes,
  isUserLiked,
}: Props) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7 py-2" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex flex-col md:flex-row flex-wrap items-stretch md:start">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile Image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>
            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <LikeButton
                  threadId={JSON.stringify(id)}
                  likes={likes}
                  currentUserId={JSON.stringify(currentUserId)}
                  isUserLiked = {isUserLiked}
                />

                <div>
                  <Link href={`/thread/${id}`}>
                    <Image
                      src={"/assets/reply.svg"}
                      alt="reply"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                  </Link>
                </div>
                <Image
                  src={"/assets/repost.svg"}
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src={"/assets/share.svg"}
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>

              {!isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
        {!isComment && (
          <div className="flex justify-between">
            <p className="mt-4 md:mt-0 text-subtle-medium text-gray-1">
              {formatDateString(createdAt).formattedDate}
            </p>
            <p className="hidden text-subtle-medium text-gray-1 md:block">,</p>
            <p className="mt-4 md:mt-0 text-subtle-medium text-gray-1">
              {formatDateString(createdAt).time}
            </p>
          </div>
        )}
      </div>
    </article>
  );
};

export default ThreadCard;
