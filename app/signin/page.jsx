"use client";
import LoginForm from "@components/LoginForm";
import UserContext from "@store/UserContext";
import { useContext, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const SignInPage = () => {
  const { isLoggedIn, checkLoggedUser, user } = useContext(UserContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect")

  const goRedirect = () => {
    if(redirect){
        router.push(redirect);
    }else{
        router.push("/");
    }
  }

  useEffect(() => {
    console.log({isLoggedIn, user })
    if (isLoggedIn) {
        goRedirect()
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <section className="main">
        <LoginForm
          label="Sign in as Guest"
          placeholder="Guest username"
          onSuccess={() => {
            goRedirect()
        }}
        />
    </section>
  );
};

export default SignInPage;
