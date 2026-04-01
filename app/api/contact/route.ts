import { contactModel } from './../../../models/contactModel';
import connectDb from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        await connectDb();
        const data = await req.json();
        const contact = await contactModel.create(data);
        if(contact){
            return NextResponse.json({ msg: `Thank you for contacting us! ` }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json({ msg: "something goes wrong", error: (error as Error).message }, { status: 500 });
    }
}