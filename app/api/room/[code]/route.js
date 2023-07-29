import Room from "@models/room";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  const { code } = params;

  try {
    await connectToDB();

    const room = await Room.findOne({ code }).populate({
      path: "creator",
      select: "-__v -email",
      model: User,
    }).select('-__v');
    if (!room) return new Response("Room Not Found", { status: 404 });

    return new Response(JSON.stringify(room), { status: 201 });
  } catch (error) {
    console.log(error.message);
    return new Response("Internal Server Error", { status: 500 });
  }
};
