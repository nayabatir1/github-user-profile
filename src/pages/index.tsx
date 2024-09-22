/* eslint-disable @next/next/no-img-element */
import { FaMagnifyingGlass } from "react-icons/fa6";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import BlockButton from "../components/button/BlockButton";
import { useSearchUserName } from "../api/queries/github.queries";
import { memo, useState } from "react";
import { searchUserName } from "../api/requests/github.request";
import Loader from "../components/loader/Loader";
import UserCard from "../components/userCard/UserCard";

type FormData = {
  userName: string;
};

const schema = yup.object({
  userName: yup.string().trim().required(),
});

function Home() {
  const [userData, setUserData] =
    useState<Awaited<ReturnType<typeof searchUserName>>>();

  const { register, handleSubmit, getValues } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const value = getValues("userName");

  const searchUsername = useSearchUserName();

  const onSubmit = handleSubmit((data) => {
    searchUsername.mutateAsync(data.userName).then((resp) => {
      const users = localStorage.getItem("github_user");

      setUserData(resp);

      const payload = { search: data.userName, resp };

      if (users) {
        const temp = JSON.parse(users) as Array<
          Awaited<ReturnType<typeof searchUserName>>
        >;
        localStorage.setItem("github_user", JSON.stringify([...temp, payload]));
      } else {
        localStorage.setItem("github_user", JSON.stringify([payload]));
      }
    });
  });

  return (
    <div className="w-full md:w-96 mt-10 px-5">
      <p className="text-center">Search Github User</p>

      <div className="flex items-center gap-2 bg-white px-3 py-1 mt-5 border rounded-sm border-gray-300 mb-5">
        <FaMagnifyingGlass color="gray" />
        <form onSubmit={onSubmit} className="grow">
          <input
            className="outline-none w-full"
            placeholder="Enter username"
            {...register("userName")}
          />
        </form>
      </div>

      <BlockButton
        title="Search"
        onClick={onSubmit}
        isLoading={searchUsername.isLoading}
      />

      <p className="mt-16 mb-2 text-gray-400">Search Results</p>

      {searchUsername.isLoading && <Loader />}

      {!searchUsername.isLoading && !userData?.data.name && value && (
        <p>No Results found</p>
      )}

      {!searchUsername.isLoading && userData?.data.name && (
        <div className="px-2 bg-white">
          <UserCard {...userData} />
        </div>
      )}
    </div>
  );
}

export default memo(Home);
