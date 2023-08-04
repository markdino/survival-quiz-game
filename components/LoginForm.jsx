import { useContext, useEffect, useState } from "react";
import Divider from "./Divider";
import { signIn, getProviders } from "next-auth/react";
import Image from "next/image";
import googleLogo from "@assets/images/google.png";
import classNames from "classnames";
import Alert from "./Alert";
import { signInUser } from "@services/api";
import UserContext from "@store/UserContext";

const LoginForm = ({
  onSubmit = () => null,
  onSuccess = () => null,
  onFailed = () => null,
  label,
  placeholder,
}) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState(null);

  const { checkLoggedUser } = useContext(UserContext);

  const handleLogin = () => {
    signInUser({
      userData: { username },
      onSubmit: () => {
        setError(null);
        setIsLoading(true);
        onSubmit();
      },
      onSuccess: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setIsLoading(false);
        checkLoggedUser()
        onSuccess(data);
      },
      onFailed: (response) => {
        setError({ message: response.data.error });
        setIsLoading(false);
        onFailed(response);
      },
    });
  };

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <div className="mx-auto container max-w-md text-center w_font-satoshi font-semibold">
      <label className="w_inherit text-base text-gray-700">{label}</label>
      <div className="flex flex-row mt-4">
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(null);
          }}
          type="text"
          placeholder={placeholder}
          className="form_input w-full border"
        />
        <button
          onClick={handleLogin}
          className={classNames(
            "px-5 ml-2 text-sm rounded-lg text-white bg-yellow-400",
            { "opacity-50": isLoading }
          )}
          disabled={isLoading}
        >
          Enter
        </button>
      </div>
      <Alert text="Loading..." show={isLoading} variant="light" />
      <Alert text={error?.message} show={error} variant="danger" />
      {providers && (
        <>
          <Divider text="or" />
          <>
            {Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id)
                    .then(() => checkLoggedUser())
                    .catch((error) => console.error(error));
                }}
                className="px-5 py-3 text-sm border rounded-lg w-full relative"
              >
                {provider.name === "Google" && (
                  <div className="absolute h-full inset-y-0 left-3.5 flex justify-start items-center">
                    <Image height={30} src={googleLogo} alt="google logo" />
                  </div>
                )}{" "}
                Sign in with {provider.name}
              </button>
            ))}
          </>
        </>
      )}
    </div>
  );
};

export default LoginForm;