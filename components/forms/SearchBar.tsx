"use client";

import { Input } from "@/components/ui/input";
import { fetchUsers } from "@/lib/actions/user.actions";
import { useState } from "react";
import UserCard from "../cards/UserCard";

export default function SearchBar({
  user,
  resultFetched,
}: {
  user: string;
  resultFetched: string;
}) {
  const [result, setResult] = useState(JSON.parse(resultFetched));
  const [searchString, setSearchString] = useState("");
  const handleSearch = async (e: any) => {
    const newResult = await fetchUsers({
      userId: JSON.parse(user).id,
      searchString: searchString,
      pageNumber: 1,
      pageSize: 25,
    });
    setResult(newResult);
    setSearchString(e.target.value);
  };
  return (
    <>
      <Input
        onChange={handleSearch}
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none text-white py-3"
      />
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No Users Found!</p>
        ) : (
          <>
            {result.users.map((user: any) => (
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
    </>
  );
}
