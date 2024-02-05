import { createContext, useContext, useState } from 'react';

const AppContext = createContext(); // No arguments expected here

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [enteredAddress, setEnteredAddress] = useState('');
  // Add more state variables as needed

  const setAddress = (address) => {
    setEnteredAddress(address);
  };
  // Add more setter functions as needed

  return (
    <AppContext.Provider value={{ enteredAddress, setAddress }}>{children}</AppContext.Provider>
  );
};
