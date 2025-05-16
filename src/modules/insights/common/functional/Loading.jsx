import { Loader } from "../base/Loader";

export const Loading = ({ loaderSize, loaderText = "Please wait..." }) => {
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
