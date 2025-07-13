import { useState, createContext, useContext } from "react";

const ModalContext = createContext({});

export const ModalContextProvider = ({ children }) => {
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
      document.body.style.overflow = "unset";
    }
  };
  const currentModalSettings = Array.isArray(modalStack) ? modalStack : [];

  return (
    <ModalContext.Provider value={{ modalSettings: currentModalSettings, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
