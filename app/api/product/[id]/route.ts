import { ProductModel } from "@/models/productModel";
import connectDb from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectDb();
        const { id } = await params;
        const data = await ProductModel.findOne({ _id: id });
        return NextResponse.json({ msg: data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: "fail to fetch data", error: (error as Error).message }, { status: 500 });
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectDb();
        const { id } = await params;
        const data = await ProductModel.findByIdAndDelete({ _id: id });
        if (data) {
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ msg: "product not remove " }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ msg: "fail to delete product", error: (error as Error).message }, { status: 500 });
    }
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectDb();
        const { id } = await params;
        const data = await req.json();
         await ProductModel.findByIdAndUpdate(id,data,{new:true});
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: "fail to update product", error: (error as Error).message }, { status: 500 });
    }
}