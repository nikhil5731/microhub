import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPost } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  const result = await fetchPost(1, 30);
  return (
    <div>
      <h1 className="text-left head-text">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => {
              return (
                <ThreadCard
                  key={post.id}
                  id={post._id}
                  currentUserId={user?.id || ""}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              );
            })}
          </>
        )}
      </section>
    </div>
  );
}
