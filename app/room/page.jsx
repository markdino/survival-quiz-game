"use client";
import Alert from "@components/Alert";
import { createRoom } from "@services/api";
import UserContext from "@store/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const CreateRoomPage = () => {
  const [field, setField] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, user, isChecking } = useContext(UserContext);
  const router = useRouter();

  const handleClick = () => {
    if (!field) return;

    createRoom({
      name: field,
      creatorId: user.id,
      onSubmit: () => {
        setIsLoading(true);
      },
      onSuccess: ({ code }) => {
        router.push(`/room/${code}`);
        setIsLoading(false);
      },
      onFailed: ({ data }) => {
        setError({ message: data });
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    if (!isChecking && !isLoggedIn) {
      router.push("/signin?redirect=/room");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  console.log({ error });
  return (
    <main className="main flex-col gap-10">
      {isChecking ? (
        <Alert text="Checking user..." show={isChecking} variant="light" />
      ) : (
        <>
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
                <Alert text={error?.message} show={error} variant="danger" />
                <button
                  onClick={handleClick}
                  className="px-5 py-3 text-sm w-full bg-yellow-400 rounded-lg text-white"
                >
                  Create
                </button>
              </div>
            </label>
          </div>
        </>
      )}
    </main>
  );
};

export default CreateRoomPage;
