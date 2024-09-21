import { useMutation } from "react-query";

import { searchUserName } from "../requests/github.request";

export const useSearchUserName = () =>
  useMutation({
    mutationFn: searchUserName,
  });
