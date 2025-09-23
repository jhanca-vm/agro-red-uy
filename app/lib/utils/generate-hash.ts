import { type BinaryLike, randomBytes, scrypt } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify<BinaryLike, BinaryLike, number, Buffer>(scrypt)

export default async function generateHash(password: string) {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = await scryptAsync(password, salt, 64)

  return `${salt}:${derivedKey.toString('hex')}`
}
