import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any, expiresIn: Date) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn.getTime() / 1000)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  if (payload.exp * 1000 < Date.now()) {
    throw new Error("Session expired");
  }

  return payload;
}

export async function refreshSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) {
    return;
  }

  const sessionDetails = await decrypt(session);

  sessionDetails.expiryDate = new Date(Date.now() + 60 * 1000);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);

  parsed.expires = new Date(Date.now() + 30 * 60 * 1000);

  const res = NextResponse.next();

  res.cookies.set({
    name: "session",
    value: await encrypt(parsed, parsed.expires),
    httpOnly: true,
    secure: true,
    expires: parsed.expires,
  });
  return res;
}

export async function getSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function logout(response: NextResponse) {
  response.cookies.set("session", "", { expires: new Date(0) });
}
