"use client";
import LoginForm from "@components/LoginForm";
import UserContext from "@store/UserContext";
import { useContext, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Alert from "@components/Alert";

const SignInPage = () => {
  
  const { isLoggedIn, isChecking } =
    useContext(UserContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const goRedirect = () => {
    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (!isChecking && isLoggedIn) {
      goRedirect();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isChecking]);

  return (
    <section className="main">
      {isChecking ? (
        <Alert show={isChecking} text="Checking user..." variant="light" />
      ) : (
        <LoginForm
          label="Sign in as Guest"
          placeholder="Guest username"
        />
      )}
    </section>
  );
};

export default SignInPage;
