import { TfiClose } from "react-icons/tfi";
import { useModalContext } from "../contexts/ModalContext";
import { Button } from "./Button";

export const ModalWrapper = () => {
  const { modalSettings, closeModal } = useModalContext();

  return (
    <div className="z-30 w-screen h-screen fixed top-0 left-0 flex justify-center items-center pointer-events-none">
      {modalSettings &&
        modalSettings.map((modal, index) => (
          <div
            key={index}
            className="fixed inset-0 flex items-center justify-center pointer-events-auto"
          >
            <div
              className="absolute inset-0 bg-gray-800/50"
              onClick={() => closeModal()}
            ></div>

            <div
              className={`${
                modal.size ? `${modal.size}` : "w-1/2"
              } bg-gray-100 shadow-md rounded-md overflow-auto z-40 max-h-[70%] p-6`}
            >
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-lg">{modal?.title ?? "Modal"}</h1>
                <Button
                  label={<TfiClose size={16} />}
                  onClick={() => closeModal()}
                  className="-m-2.5 p-2.5 shadow-transparent !w-auto"
                />
              </div>
              {modal.component}
            </div>
          </div>
        ))}
    </div>
  );
};
