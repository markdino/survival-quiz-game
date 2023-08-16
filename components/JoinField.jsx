"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const JoinField = ({
  input = "",
  title = "Join in a Quiz Room",
  buttonText = "Join",
  readOnly = false,
}) => {
  const [field, setField] = useState(input);

  const router = useRouter();

  const handleClick = () => {
    if (!field) return;
    router.push(`/room/${field}`);
  };

  useEffect(() => {
    setField(input)
  }, [input])
  return (
    <div className="mx-auto container max-w-md items-end">
      <label className="w_inherit w_font-satoshi font-semibold text-base text-gray-700 text-left">
        {title}
        <div className="flex flex-row">
          <input
            value={field}
            onChange={(e) => setField(e.target.value)}
            type="text"
            placeholder="Room ID"
            className="form_input w-full border"
            readOnly={readOnly}
          />
          <button
            onClick={handleClick}
            className="px-5 py-2 ml-2 text-sm bg-yellow-400 rounded-lg text-white"
          >
            {buttonText}
          </button>
        </div>
      </label>
    </div>
  );
};

export default JoinField;
