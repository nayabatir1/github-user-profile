/* eslint-disable @next/next/no-img-element */
import { memo } from "react";
import { searchUserName } from "../../api/requests/github.request";

function UserCard({ data }: Awaited<ReturnType<typeof searchUserName>>) {
  if (!data.name)
    return <p className="py-5 text-gray-400">Search result not found</p>;

  return (
    <div className=" py-3 flex gap-3 ">
      <div className="grow">
        <p className="text-gray-400">User Image</p>

        <div className="mt-2 ">
          <img
            src={data.avatar_url}
            height="auto"
            width={100}
            alt="user avatar"
            className="object-contain"
          />
        </div>
      </div>
      <div className="grow ">
        <p className="text-gray-400">Github User Name</p>
        <p>{data.name}</p>
      </div>
    </div>
  );
}

export default memo(
  UserCard,
  (prev, next) =>
    prev.data.name !== next.data.name &&
    prev.data.avatar_url !== prev.data.avatar_url
);
