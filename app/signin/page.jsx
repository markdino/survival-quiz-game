"use client";
import LoginForm from "@components/LoginForm";
import UserContext from "@store/UserContext";
import { useContext, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Alert from "@components/Alert";
import mainBg from '@assets/images/main-bg.jpg'
import Glass from "@components/Glass";

const SignInPage = () => {
  const mainStyle = {
    backgroundImage: `url('${mainBg.src}')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };
  
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
    <section className="main min_h_occupied" style={mainStyle}>
      <section>
      {isChecking ? (
        <Alert show={isChecking} text="Checking user..." variant="light" />
      ) : (
        <Glass className="px-6 py-8">
          <LoginForm
            label="Sign in as Guest"
            placeholder="Guest username"
          />
        </Glass>
      )}
      </section>
    </section>
  );
};

export default SignInPage;
