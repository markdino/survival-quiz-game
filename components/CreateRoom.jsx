"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateRoom = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = () => {
    if (!session?.user) {
      signIn(undefined, { callbackUrl: `/room` });
    } else {
      router.push(`/room`);
    }
  };
  return (
    <button
      onClick={handleClick}
      className="outline_btn w-full mx-auto container max-w-md"
    >
      <span className="py-1">Create a Room</span>
    </button>
  );
};

export default CreateRoom;
