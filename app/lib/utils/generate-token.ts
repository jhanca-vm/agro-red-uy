import { type JWTPayload, SignJWT } from 'jose'

export default async function generateToken(payload: JWTPayload) {
  const secret = new TextEncoder().encode(process.env.SECRET)
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(secret)

  return token
}
