"use client";

import React, { createContext, ReactNode, useState } from "react";

type ProviderProps = {
  children: ReactNode;
};

interface UserContextType {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: ProviderProps) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
