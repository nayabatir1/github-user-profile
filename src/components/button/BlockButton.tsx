import { memo } from "react";
import { BlockButtonProps } from "./types";

function BlockButton({ title, onClick, isLoading }: BlockButtonProps) {
  return (
    <button
      className="w-full bg-green-600 py-2 rounded-md shadow-md hover:cursor-pointer"
      onClick={onClick}
      disabled={isLoading}
    >
      <span className="text-center text-white">{title}</span>
    </button>
  );
}

export default memo(BlockButton);
