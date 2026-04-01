import { userModel } from "@/models/userModel";
import connectDb from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { encryptPassword } from "@/app/utils/encryption";
import mongoose,{Types} from "mongoose";
interface UserFilter {
    _id: Types.ObjectId,
}
export const POST = async (req: NextRequest) => {
    try {
        await connectDb();
        const data = await req.json();
        const existingUser = await userModel.findOne({ email: data.email });
        if (existingUser) {
            return NextResponse.json({ msg: "User with this email already exists" }, { status: 409 });
        }
        data.password = await encryptPassword(data.password);
        const newUser = await userModel.create(data);
        return NextResponse.json({ msg: `${newUser.firstName} , You are registered successfully` }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ msg: "fail to register new user", error: (error as Error).message }, { status: 500 });
    }
}

export const GET = async (req: NextRequest) => {
    try {

        await connectDb();
        const filter: Partial<UserFilter> = {};
        const userID = req.nextUrl.searchParams.get('userID');
        if (userID) {
            { filter._id = new mongoose.Types.ObjectId(userID) }
        }
    
        const data = await userModel.find(filter);
        const countPromise = userModel.countDocuments({});
        const [users, totalCount] = await Promise.all([data, countPromise]);
        return NextResponse.json({ msg: users, totalUsers: totalCount }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: "fail to fetch user", error: (error as Error).message }, { status: 500 });
    }
}

export const PUT = async (req: NextRequest) => {
    try {
        await connectDb();
        const userID = req.nextUrl.searchParams.get('userID');
        const data = await req.json();
        const user = await userModel.findByIdAndUpdate({ _id: userID }, data, { new: true });
        return NextResponse.json({ msg: `${user.firstName} , Your profile  updated successfully` }, { status: 200 });;

    } catch (error) {
        return NextResponse.json({ msg: "fail to fetch user", error: (error as Error).message }, { status: 500 });
    }
}
