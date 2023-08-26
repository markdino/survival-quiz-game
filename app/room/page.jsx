"use client";
import Alert from "@components/Alert";
import { createRoom } from "@services/api";
import UserContext from "@store/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import mainBg from "@assets/images/main-bg.jpg";
import Glass from "@components/Glass";
import JoinField from "@components/JoinField";
import FacebookLoading from "@components/Loading/FacebookLoading";
import { useSession } from "next-auth/react";
import Link from "next/link";

const CreateRoomPage = () => {
  const mainStyle = {
    backgroundImage: `url('${mainBg.src}')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const [field, setField] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const { isLoggedIn, user, isChecking } = useContext(UserContext);
  const router = useRouter();

  const { status } = useSession();

  const handleClick = () => {
    if (!field) return;

    createRoom({
      name: field,
      creatorId: user.id,
      onSubmit: () => {
        setIsLoading(true);
      },
      onSuccess: ({ code }) => {
        setCode(code);
        setIsLoading(false);
      },
      onFailed: ({ data }) => {
        setError({ message: data });
        setIsLoading(false);
      },
    });
  };

  return (
    <main className="main h-full" style={mainStyle}>
      <section className="w-fit mx-auto">
        {!isLoggedIn && (status === "loading" || isChecking) ? (
          <section className="flex flex-col justify-center items-center h-full pb-20">
            <FacebookLoading />
            <Alert show={true} text="Checking user..." variant="light" />
          </section>
        ) : !isChecking && !isLoggedIn ? (
          <section className="flex flex-col justify-center items-center h-full pb-20">
            <Glass className="px-6 py-8">
              <Alert
                text="Unauthorized access! Please sign in"
                show={!isLoggedIn}
                variant="light"
              />
              <div className="flex gap-3 justify-end w-full pt-4">
                <section className="bg-white rounded-full">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="outline_btn"
                  >
                    Back
                  </button>
                </section>
                <Link href="/signin?redirect=/room" className="black_btn">
                  Sign In
                </Link>
              </div>
            </Glass>
          </section>
        ) : (
          isLoggedIn && (
            <Glass className="p-16 flex flex-col gap-10">
              <h1 className="text-4xl font-bold text-center">Create Room</h1>
              <div className="mx-auto container max-w-md">
                <label className="w_inherit w_font-satoshi font-semibold text-base text-gray-700 text-center flex flex-col">
                  Create a room for your quiz environment
                  <div className="flex flex-col gap-3">
                    <input
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      type="text"
                      placeholder="Room name"
                      className="form_input w-full border"
                    />
                    <Alert text="Loading..." show={isLoading} variant="light" />
                    <Alert
                      text={error?.message || "Something went wrong!"}
                      show={error}
                      variant="danger"
                    />
                    {code && (
                      <JoinField
                        readOnly={true}
                        input={code}
                        title="Room code"
                        buttonText="Visit"
                      />
                    )}
                    <button
                      onClick={handleClick}
                      className="px-5 py-3 text-sm w-full bg-yellow-400 rounded-lg text-white"
                      disabled={isLoading}
                    >
                      Create
                    </button>
                  </div>
                </label>
              </div>
            </Glass>
          )
        )}
      </section>
    </main>
  );
};

export default CreateRoomPage;
