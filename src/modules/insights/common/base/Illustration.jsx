import { BsInfoCircle } from "react-icons/bs";

export const Illustration = ({ imgSrc, imgWidth = "50%", text, noMargin }) => {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-4 ${
        noMargin ? "mt-0" : "mt-20 "
      }`}
    >
      <img src={imgSrc} width={imgWidth} />
      <p className="bg-indigo-500 rounded-md px-6 py-2 text-sm text-white flex gap-2 items-center">
        <BsInfoCircle size={16} />
        {text}
      </p>
    </div>
  );
};
