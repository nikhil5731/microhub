import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  console.log(userInfo.followers);

  return (
    <section>
      <h1 className="head-text mb-10">Followers</h1>

      <div className="mt-14 flex flex-col gap-9">
        {userInfo.followers.length === 0 ? (
          <p className="no-result">No Followers Found!</p>
        ) : (
          <>
            {userInfo.followers.map((user: any) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                imgUrl={user.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
