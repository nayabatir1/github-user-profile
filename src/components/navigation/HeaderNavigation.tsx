import { useRouter } from "next/router";
import Link from "next/link";
import { memo } from "react";

import { HeaderNavigationProps } from "./types";

function HeaderNavigation({ title, link }: HeaderNavigationProps) {
  const router = useRouter();

  return (
    <div
      className={`mx-5 px-5 py-3 border-blue-800 ${
        router.asPath === link ? "border-b-4" : ""
      }`}
    >
      <Link href={link}>{title}</Link>
    </div>
  );
}

export default memo(HeaderNavigation);
