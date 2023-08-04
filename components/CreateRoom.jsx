"use client";
import Link from "next/link";

const CreateRoom = () => {
  return (
    <Link
      href="/room"
      className="outline_btn w-full mx-auto container max-w-md"
    >
      <span className="py-1">Create a Room</span>
    </Link>
  );
};

export default CreateRoom;
