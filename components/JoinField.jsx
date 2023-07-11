"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const JoinField = () => {
  const [field, setField] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = () => {
    if (!field) return;
    if (!session?.user) {
      signIn(undefined, { callbackUrl: `/room/${field}` });
    } else {
      router.push(`/room/${field}`);
    }
  };
  return (
    <div className="mx-auto container max-w-md items-end">
      <label className="w_inherit w_font-satoshi font-semibold text-base text-gray-700 text-left">
        Join in a Quiz Room
        <div className="flex flex-row">
          <input
            value={field}
            onChange={(e) => setField(e.target.value)}
            type="text"
            placeholder="Room ID"
            className="form_input w-full border"
          />
          <button
            onClick={handleClick}
            className="px-5 py-2 ml-2 text-sm bg-yellow-400 rounded-lg text-white"
          >
            Join
          </button>
        </div>
      </label>
    </div>
  );
};

export default JoinField;
