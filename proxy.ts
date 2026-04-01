import { NextResponse } from "next/server"
import { checkAuth } from "./app/utils/auth";
import type { NextRequest } from 'next/server';
import { cookies } from "next/headers";

export async function proxy(req: NextRequest) {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const result = await checkAuth(accessToken, refreshToken);

    const path = req.nextUrl.pathname


    if (result.status === "NO_TOKEN" || result.status === "LOGIN_REQUIRED") {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    if (result.status === "ACCESS_VALID") {

        const role = result.role


        if (path.startsWith("/admin") && role !== "admin") {
            return NextResponse.redirect(new URL("/login", req.url))
        }


        if (path.startsWith("/user") && role !== "user") {
            return NextResponse.redirect(new URL("/login", req.url))
        }

        return NextResponse.next()
    }

    return NextResponse.redirect(new URL("/login", req.url))
}

export const config = {
    matcher: ["/user/:path*", "/admin/:path*"]
}



export default proxy