import octokit from "../github";

export const searchUserName = (userName: string) =>
  octokit.request("GET /users/{username}", {
    username: userName,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
