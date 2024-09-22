import BlockButton from "../components/button/BlockButton";
import { memo, useCallback, useEffect, useState } from "react";
import { searchUserName } from "../api/requests/github.request";
import UserCard from "../components/userCard/UserCard";

function History() {
  const [usersData, setUsersData] = useState<
    Array<{
      search: string;
      resp: Awaited<ReturnType<typeof searchUserName>>;
    }>
  >();

  useEffect(() => {
    if (!typeof window) return;

    const users = localStorage.getItem("github_user");

    if (users) setUsersData(JSON.parse(users));
  }, []);

  const clearStorage = useCallback(() => {
    localStorage.removeItem("github_user");
    setUsersData(undefined);
  }, []);

  console.log(usersData);

  return (
    <div className="md:w-[40rem] mt-10">
      <p className="text-center text-gray-700">Your Search History</p>

      <div className=" mt-5 border rounded-md overflow-auto h-[calc(100dvh-250px)] min-h-[200px] bg-white">
        <div className="bg-gray-300">
          <p className="pl-4 py-2 inline-block w-1/2">Search Term</p>
          <p className="inline-block w-1/2">Search Results</p>
        </div>
        {usersData?.map((userData) => (
          <div key={userData.resp.data.id} className="border">
            <div className="w-1/2 inline-block pl-5">{userData.search}</div>
            <div className="w-1/2  inline-block">
              <UserCard {...userData.resp} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="w-60 mt-10">
          <BlockButton title="Clear Search History" onClick={clearStorage} />
        </div>
      </div>
    </div>
  );
}

export default memo(History);
