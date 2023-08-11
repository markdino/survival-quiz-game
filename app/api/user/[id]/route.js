import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDB();

    const user = await User.findById(id).select("-__v");
    if (!user)
      return new Response(JSON.stringify({ error: "User Not Found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error(error.message);
    if (error.name === "CastError" && error.path === "_id") {
      return new Response(
        JSON.stringify({ error: "Invalid user id provided" }),
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

  try {
    await connectToDB();

    const user = await User.findByIdAndUpdate(params.id, updateData, {
      new: true,
    }).select("-__v");

    if (!user)
      return new Response(JSON.stringify({ error: "User Not Found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error.message);
    if (error.name === "CastError" && error.path === "_id") {
      return new Response(
        JSON.stringify({ error: "Invalid user id provided" }),
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

export const PUT = async (req, { params }) => {
  const updateData = await req.json();

  try {
    await connectToDB();

    const user = await User.findByIdAndUpdate(params.id, updateData, {
      new: true,
    }).select("-__v");

    if (!user)
      return new Response(JSON.stringify({ error: "User Not Found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error.message);
    if (error.name === "CastError" && error.path === "_id") {
      return new Response(
        JSON.stringify({ error: "Invalid user id provided" }),
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
