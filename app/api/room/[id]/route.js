import Quiz from "@models/quiz";
import Room from "@models/room";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDB();

    const room = await Room.findOne({ code: id })
      .populate({
        path: "creator",
        select: "-__v -email",
        model: User,
      })
      .populate({
        path: "participants.user",
        select: "-__v -email",
        model: User,
      })
      .populate({
        path: "currentQuiz",
        select: "-__v -answer",
        model: Quiz,
      })
      .select("-__v");
    if (!room) return new Response("Room Not Found", { status: 404 });

    return new Response(JSON.stringify(room), { status: 201 });
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

export const PATCH = async (req, { params }) => {
  const updateData = await req.json();
  console.log(updateData);
  try {
    await connectToDB();

    const room = await Room.findByIdAndUpdate(params.id, updateData, {
      new: true,
    })
      .populate({
        path: "creator",
        select: "-__v -email",
        model: User,
      })
      .populate({
        path: "participants.user",
        select: "-__v -email",
        model: User,
      })
      .populate({
        path: "currentQuiz",
        select: "-__v -answer",
        model: Quiz,
      })
      .select("-__v");
    if (!room) return new Response("Room Not Found", { status: 404 });

    return new Response(JSON.stringify(room), { status: 200 });
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
