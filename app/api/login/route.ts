"use server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDb from "@/dbConfig/dbConfig";
import { userModel } from "@/models/userModel";
import { comparePassword, encryptPassword } from "@/app/utils/encryption";
import { cookies } from "next/headers";
interface DecodedToken {
  id: string;
  role: string;
}

export async function POST(req: Request) {

  const { email, password, refreshToken, type } = await req.json();
  await connectDb();
  if (type === "login") {

    const user = await userModel.findOne({ email });
    if (!user) return NextResponse.json({ success: false, msg: "USER NOT FOUND" }, { status: 404 });
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return NextResponse.json({ success: false, msg: "PASSWORD INVALID" }, { status: 401 });

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET!,
      { expiresIn: "3h" }
    );

    const newRefreshToken = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );
    const newCookie = await cookies();

    newCookie.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 150
    });

    newCookie.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return NextResponse.json({
      user: {
        role: user.role,
      },
      accessToken,
      refreshToken: newRefreshToken,
      success: true
    });
  }


  if (type === "refresh") {

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      );

      const newAccessToken = jwt.sign(
        {
          id: (decoded as DecodedToken).id,
          role: (decoded as DecodedToken).role
        },
        process.env.JWT_SECRET!,
        { expiresIn: "3h" }
      );

      return NextResponse.json({ accessToken: newAccessToken, error: "something went wrong", success: true });

    } catch (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }
  }

  return NextResponse.json({ success: false }, { status: 401 });
}



export async function PUT(req: Request) {
  const { email, new_password } = await req.json();

  try {
    await connectDb();
    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    const hashedPassword = await encryptPassword(new_password);
    user.password = hashedPassword;
    await user.save();
    return NextResponse.json({ msg: 'Password updated successfully', success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}





