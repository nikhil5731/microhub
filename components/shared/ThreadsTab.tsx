import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
  currentUserInfo_id: String;
}

const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
  currentUserInfo_id,
}: Props) => {
  // FetchUserPost
  const result = await fetchUserPosts(accountId);

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread.id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : thread.author
          }
          createdAt={thread.createdAt}
          comments={thread.children}
          likes={thread.likes.length}
          isUserLiked={thread.likes.includes(currentUserInfo_id)}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
