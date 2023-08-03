"use client";
import { getSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { getUserById } from "@services/api";

const UserContext = createContext({
  isLoggedIn: false,
  user: null,
  checkLoggedUser: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkLoggedUser = async () => {
    const session = await getSession();
    const localUser = localStorage.getItem("user");
    let loggedUser;

    if (session?.user) {
      const { name, ...rest } = session.user;
      loggedUser = {
        username: name.replace(" ", ""),
        ...rest,
      };
    } else if (localUser) {
      const { id } = JSON.parse(localUser);
      getUserById({
        id,
        onSuccess: (data) => {
            loggedUser = data
        },
        onFailed: () => {
            localStorage.removeItem("user");
        }
      })
    }

    if (loggedUser) {
      setIsLoggedIn(true);
      setUser(loggedUser);
    }

    return loggedUser;
  };

  useEffect(() => {
    checkLoggedUser();
  }, []);

  const context = {
    isLoggedIn,
    user,
    checkLoggedUser,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserContext;
