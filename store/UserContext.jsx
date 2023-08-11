"use client";
import { getSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { getUserById } from "@services/api";

const UserContext = createContext({
  isLoggedIn: false,
  user: null,
  checkLoggedUser: () => {},
  isChecking: false,
  requestFetch: false,
  setRequestFetch: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [requestFetch, setRequestFetch] = useState(false);

  const checkLoggedUser = async () => {
    setIsChecking(true);
    const session = await getSession();
    const localUser = localStorage.getItem("user");

    if (session?.user) {
      const { name, ...rest } = session.user;
      setUser({
        username: name.replace(" ", ""),
        ...rest,
      });
      setIsLoggedIn(true);
      setIsChecking(false);
    } else if (localUser) {
      const { id } = JSON.parse(localUser);
      getUserById({
        id,
        onSuccess: (data) => {
          setUser(data);
          setIsLoggedIn(true);
          setIsChecking(false);
        },
        onFailed: () => {
          localStorage.removeItem("user");
          setUser(null);
          setIsLoggedIn(false);
          setIsChecking(false);
        },
      });
    } else {
      setUser(null);
      setIsLoggedIn(false);
      setIsChecking(false);
    }

    return user;
  };

  useEffect(() => {
    checkLoggedUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context = {
    isLoggedIn,
    user,
    checkLoggedUser,
    isChecking,
    requestFetch,
    setRequestFetch,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserContext;
