const { NextResponse } = require("next/server.js");
import Task from "@/models/Task.js";
import { connectDB } from "@/utils/mongoose.js";


export const GET = async () => {
    connectDB();

    const tasks = await Task.find()

    return NextResponse.json(tasks);
};
export const POST  = async(request) => {
    try {
        const data = await request.json()
        const newTask = new Task(data)
        const savedTask = await newTask.save()          
        return NextResponse.json(savedTask);
    } catch (error) {
        return NextResponse.json(error.message, {status: 400});               
    }
}