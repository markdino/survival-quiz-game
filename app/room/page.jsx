"use client";
import LoginForm from "@components/LoginForm";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CreateRoomPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      const localUser = localStorage.getItem("user");

      if (session?.user || localUser) {
        setIsLoggedIn(true);
      }
    })();
  }, []);
  return (
    <div>
      {isLoggedIn ? (
        <h1 className="text-4xl font-bold">Create Room Page</h1>
      ) : (
        <LoginForm
          label="Sign in as Guest"
          placeholder="Guest username"
          onSuccess={() => setIsLoggedIn(true)}
        />
      )}
    </div>
  );
};

export default CreateRoomPage;
