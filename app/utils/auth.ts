import axios from "axios";
import jwt from "jsonwebtoken";
import { JwtPayloadType } from "./type";
import { cookies } from "next/headers";

export const checkAuth = async (accessToken?: string, refreshToken?: string) => {
  if (!accessToken && !refreshToken) {
    return { status: "NO_TOKEN" }
  }

  try {
    const decodedToken = jwt.verify(
      accessToken!,
      process.env.JWT_SECRET!
    ) as JwtPayloadType;

    const { role } = decodedToken;

    return {
      status: "ACCESS_VALID",
      role: role
    }
  } catch {

    if (refreshToken) {
      try {
        const res = await axios.post("/api/login", {
          type: "refresh",
          refreshToken,
        });
        const newCookie = await cookies();

        newCookie.set("accessToken", res.data.accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 150
        });


        const decodedToken = jwt.verify(
          accessToken!,
          process.env.JWT_SECRET!
        ) as JwtPayloadType;

        const { role } = decodedToken;

        return { status: "ACCESS_VALID", role: role }

      } catch {

        return { status: "BOTH_EXPIRED" }
      }
    }

    return { status: "LOGIN_REQUIRED" }

  }
};
