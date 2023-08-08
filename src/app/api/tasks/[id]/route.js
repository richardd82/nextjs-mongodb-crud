const { NextResponse } = require("next/server.js");
import Task from "@/models/Task.js";
import { connectDB } from "@/utils/mongoose.js";

export const GET = async (request, { params }) => {
  try {
    connectDB();
    const taskFound = await Task.findById(params.id);
    return !taskFound
      ? NextResponse.json(
          { message: `No se encontró la tarea ${params.id}` },
          { status: 404 }
        )
      : NextResponse.json(taskFound);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const taskDeleted = await Task.findByIdAndDelete(params.id);
    return !taskDeleted
      ? NextResponse.json(
          { message: `No se encontró la tarea ${params.id}` },
          { status: 404 }
        )
      : NextResponse.json(taskDeleted);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
};

export const PUT = async (request, { params }) => {
  try {
    const data = await request.json();
    const taskUpdated = await Task.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(taskUpdated);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
};
