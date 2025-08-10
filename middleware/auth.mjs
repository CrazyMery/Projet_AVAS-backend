import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "Waffels happy customer";

export function decryptPasswordToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload.password; // this is the plaintext password
  } catch {
    return null;
  }
}

export async function comparePasswords(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}
