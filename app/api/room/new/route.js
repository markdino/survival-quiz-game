import Room from "@models/room";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { name, creatorId } = await req.json();

  try {
    await connectToDB();
    const newRoom = new Room({ creator: creatorId, name });
    await newRoom.save();
    const { code } = newRoom;
    
    return new Response(JSON.stringify({ code }), { status: 201 });
  } catch (error) {
    console.log(error.message);
    return new Response("Failed to create room", { status: 500 });
  }
};
