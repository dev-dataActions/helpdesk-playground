import { createContext, useContext, useState } from "react";

const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [modalStack, setModalStack] = useState([]);

  const openModal = (modalSettings) => {
    setModalStack((prevStack) => [...prevStack, modalSettings]);
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setModalStack((prevStack) => prevStack.slice(0, -1));
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "auto";
    }
  };
  const currentModalSettings = Array.isArray(modalStack) ? modalStack : [];

  return (
    <ModalContext.Provider
      value={{
        modalStack,
        openModal,
        closeModal,
        modalSettings: currentModalSettings,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
