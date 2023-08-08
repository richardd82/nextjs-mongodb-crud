import { connectDB } from "@/utils/mongoose.js";
import { NextResponse } from "next/server.js";


export const GET = () => {
    connectDB();
    return NextResponse.json("Hello World");
};
