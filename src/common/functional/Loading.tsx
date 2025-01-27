import { Loader } from "../base/Loader";

import React from "react";

export interface LoadingProps {
  loaderSize?: string;
  loaderText?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  loaderSize,
  loaderText = "Please wait...",
}) => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="flex gap-x-2 items-center jusfity-center">
        <div>
          <Loader loaderSize={loaderSize ?? "h-6 w-6"} />
        </div>
        <div className="text-gray-600">{loaderText}</div>
      </div>
    </div>
  );
};
