import { TfiClose } from "react-icons/tfi";
import { Button } from "../base/Button";
import { useModalContext } from "@/common/contexts/ModalContext";

export const ModalWrapper = () => {
  const { modalSettings, closeModal } = useModalContext();

  return (
    <div className="z-30 w-screen h-screen fixed top-0 left-0 flex justify-center items-center pointer-events-none">
      {modalSettings &&
        modalSettings.map((modal, index) => (
          <div key={index} className="fixed inset-0 flex items-center justify-center pointer-events-auto">
            <div className="absolute inset-0 bg-gray-800/50" onClick={() => closeModal()}></div>

            <div
              className={`${
                modal.size ? `${modal.size}` : "w-1/2 max-h-[60vh]"
              } bg-gray-100 shadow-md rounded-md z-40 flex flex-col relative`}
            >
              <div className="w-full p-6 overflow-auto">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-lg">{modal?.title ?? "Modal"}</h1>
                  <Button
                    label={<TfiClose size={16} />}
                    onClick={() => closeModal()}
                    className="-m-2.5 p-2.5 shadow-transparent"
                  />
                </div>
                {modal.component}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
