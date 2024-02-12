import { createContext, useContext, useState } from 'react';

const AppContext = createContext(); // No arguments expected here

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [addressName, setEnteredAddress] = useState('');
  // Add more state variables as needed

  const setAddress = (addressN) => {
    setEnteredAddress(addressN);
  };
  // Add more setter functions as needed

  return <AppContext.Provider value={{ addressName, setAddress }}>{children}</AppContext.Provider>;
};
