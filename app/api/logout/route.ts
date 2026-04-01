import { NextResponse } from "next/server"
import { cookies } from 'next/headers';
export async function POST() {

  const res = NextResponse.json({ success: true })

  res.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0 
  })

  res.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0
  })

  return res
}

export async function GET() {
    const cookieStore = await cookies();
  const token = cookieStore.get('refreshToken');
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ token: token.value });
}

