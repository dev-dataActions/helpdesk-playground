import { createContext, useContext } from "react";

export const WizardContext = createContext(null);

export const useWizardContext = () => useContext(WizardContext);
