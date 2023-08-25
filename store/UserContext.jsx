"use client";
import { getSession, useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { getUserById } from "@services/api";

const UserContext = createContext({
  isLoggedIn: false,
  user: null,
  checkLoggedUser: () => {},
  isChecking: false,
  requestFetch: false,
  setRequestFetch: () => {},
  setUser: () => {},
  setIsLoggedIn: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [requestFetch, setRequestFetch] = useState(false);

  const { data: session, status } = useSession()

  console.log({session, status})

  const checkLoggedUser = () => {
    setIsChecking(true);
    // const session = await getSession();
    const localUser = localStorage.getItem("user");

    if (status === "authenticated" && session?.user) {
      const { name, ...rest } = session.user;
      setUser({
        username: name,
        ...rest,
      });
      setIsLoggedIn(true);
      setIsChecking(false);
      console.log("Success logged user with session", session.user, status);
    } else if (localUser) {
      const { id } = JSON.parse(localUser);
      getUserById({
        id,
        onSuccess: (data) => {
          setUser(data);
          setIsLoggedIn(true);
          setIsChecking(false);
          console.log("Success logged user with localStorage", JSON.parse(localUser));
        },
        onFailed: (error) => {
          localStorage.removeItem("user");
          setUser(null);
          setIsLoggedIn(false);
          setIsChecking(false);
          console.log("Failed logged user with localStorage", { error });
        },
      });
    } else {
      setUser(null);
      setIsLoggedIn(false);
      setIsChecking(false);
      console.log("Checked! No user yet", {localUser});
    }

    return user;
  };

  useEffect(() => {
    checkLoggedUser();

  }, [status]);

  const context = {
    isLoggedIn,
    user,
    checkLoggedUser,
    isChecking,
    requestFetch,
    setRequestFetch,
    setUser,
    setIsLoggedIn,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserContext;
