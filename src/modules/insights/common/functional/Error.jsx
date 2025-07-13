import { VscError } from "react-icons/vsc";

export const Error = ({ errorText = "Something went wrong" }) => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="flex gap-x-2 items-center jusfity-center bg-red-200 text-red-600 rounded-md px-4 py-2">
        <VscError size={16} />
        <p className="text-sm">{errorText}</p>
      </div>
    </div>
  );
};
