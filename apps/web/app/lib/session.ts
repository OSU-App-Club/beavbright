import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { Session } from "next-auth";
import { cookies } from "next/headers";
import "server-only";
import { auth } from "../auth";

const secretKey = process.env.JWT_SECRET;
// We can also use a random string as a secret key
if (!secretKey) throw new Error("No JWT secret found");
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any, expiresIn: Date) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn.getTime() / 1000)
    .sign(key);
}

export async function decrypt(token: string): Promise<JWTPayload> {
  try {
    // Decrypt the token and return the payload
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error: any) {
    return error;
  }
}

export async function createSession(userId: string, cookiesAccepted = false) {
  // 7 days
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  // Encrypt the user ID and set it as a cookie
  const session = await encrypt({ userId, cookiesAccepted }, expiresAt);
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<Session> {
  try {
    // Get the session cookies
    const session = await auth();
    if (!session) {
      throw new Error("No session found");
    }
    return session;
  } catch (error: any) {
    return error;
  }
}

//TODO: Adapt this to the new session structure (next-auth)
export async function updateSession(payload: Partial<JWTPayload>) {
  try {
    // Get the session cookies
    const session = cookies().get("session");
    if (!session) {
      throw new Error("No session found");
    }
    // Update the session with the new payload
    const newSession = await encrypt({ ...session, ...payload }, new Date());
    cookies().set("session", newSession, {
      httpOnly: true,
      secure: true,
      expires: new Date(),
      sameSite: "lax",
      path: "/",
    });
  } catch (error: any) {
    return error;
  }
}
