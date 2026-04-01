import categoryModel from "@/models/categoryModel";
import connectDb from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connectDb();
        const data = await categoryModel.find();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: "fail to fetch data" , error: (error as Error).message }, { status: 500 });
    }
}