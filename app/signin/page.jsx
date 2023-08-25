"use client";
import LoginForm from "@components/LoginForm";
import UserContext from "@store/UserContext";
import { useContext, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Alert from "@components/Alert";
import mainBg from "@assets/images/main-bg.jpg";
import Glass from "@components/Glass";
import FacebookLoading from "@components/Loading/FacebookLoading";

const SignInPage = () => {
  const mainStyle = {
    backgroundImage: `url('${mainBg.src}')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const { isLoggedIn, isChecking } = useContext(UserContext);
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
  }, [isLoggedIn, isChecking]);

  return (
    <section className="main min_h_occupied" style={mainStyle}>
      <section>
        {isChecking ? (
          <section className="flex flex-col justify-center items-center h-full pb-20">
            <FacebookLoading />
            <Alert show={isChecking} text="Checking user..." variant="light" />
          </section>
        ) : (
          <Glass className="px-6 py-8">
            <LoginForm
              label="Sign in as Guest"
              placeholder="Guest username"
              providerCallbackUrl={redirect}
            />
          </Glass>
        )}
      </section>
    </section>
  );
};

export default SignInPage;
