import { wishListModel } from './../../../models/wishListModel';

import connectDb from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        await connectDb();
        const { user, itemID } = await req.json();

        const wishListData = await wishListModel.findOne({user : user });

        if (wishListData?.wishListItems.includes(itemID)) {
            await wishListModel.updateOne(
                { user: user },
                {
                    $pull: {
                        wishListItems: itemID
                    },
                }
            );
        } else {
            await wishListModel.updateOne(
                { user: user },
                {
                    $addToSet: {
                        wishListItems: itemID
                    },
                },
                { upsert: true }
            );
        }
        
            return NextResponse.json({ msg: `Product added in your wishList! ` }, { status: 201 });
        
    } catch (error) {
        return NextResponse.json({ msg: "something goes wrong", error: (error as Error).message }, { status: 500 });
    }
}



export const GET = async (req: NextRequest) => {
    try {
        await connectDb();
        const userID = req.nextUrl.searchParams.get('userID');
        if (!userID) {
            return NextResponse.json({ error: "UserID is required" }, { status: 400 });
        }
        const data = await wishListModel.find({ user: userID }).populate("wishListItems");
        return NextResponse.json({ msg: data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: "fail to fetch data", error: (error as Error).message }, { status: 500 });
    }
}


