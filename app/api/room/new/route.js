import Room from "@models/room";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import nanoId from "nano-id";

export const POST = async (req) => {
  const { name, creatorId } = await req.json();

  try {
    await connectToDB();

    //   Authenticate if user exist
    const creator = await User.findById(creatorId);
    if (!creator) {
      return new Response(JSON.stringify({ error: "Unauthorized user" }), {
        status: 401,
      });
    }

    // Create new room environment
    const newRoom = new Room({ creator: creatorId, name, code: nanoId(13) });
    await newRoom.save();
    const { code } = newRoom;

    // Return the code of newly created room
    return new Response(JSON.stringify({ code }), { status: 201 });
  } catch (error) {
    console.log(error.message);
    return new Response(
      JSON.stringify({ error: "Server error! Failed to create room" }),
      {
        status: 500,
      }
    );
  }
};
