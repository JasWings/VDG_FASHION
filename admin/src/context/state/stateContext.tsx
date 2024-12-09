import React, { createContext, useContext, ReactNode, useState} from "react";

type ToastObject = {
  show: boolean;
  position: string;
  title: string;
  status: string;
};

type ObjectContextType = {
  toastObject: ToastObject;
  updateToastObject: (newObject: ToastObject) => void;
};

const ObjectContext = createContext<ObjectContextType | undefined>(undefined);

export const ObjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toastObject, setToastObject] = useState<ToastObject>({
    show: false,
    title: "",
    position: "",
    status: "",
  });

  const updateToastObject = (newObject: ToastObject) => {
    setToastObject(newObject);
  };

  const contextValue = {
    toastObject,
    updateToastObject,
  };

  return (
    <ObjectContext.Provider value={contextValue}>
      {children}
    </ObjectContext.Provider>
  );
};

export const useObject = () => {
  const context = useContext(ObjectContext);
  if (!context) {
    throw new Error("useToast must be used within an ObjectProvider");
  }
  return context;
};
