import Room from "@models/room";
import { connectToDB } from "@utils/database";

export const PATCH = async (req, { params }) => {
  const payload = await req.json();

  try {
    await connectToDB();

    const room = await Room.findById(params.id);
    if (!room) return new Response("Room Not Found", { status: 404 });

    // Remove participant old data
    const restParticipants = room.participants?.filter(
      (participant) => participant.user?.toString() !== payload.user?.toString()
    );

    // Update participants with the updated data
    room.participants = [...restParticipants, payload];
    await room.save();

    return new Response(
      JSON.stringify({ message: "Submitted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error.message);
    if (error.name === "CastError" && error.path === "_id") {
      return new Response(
        JSON.stringify({ error: "Invalid room id provided" }),
        {
          status: 400,
        }
      );
    }
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
