// generateToken.js
import jwt from "jsonwebtoken";

const JWT_SECRET = "Waffels happy customer";
const plainPassword = "123456"; // your test password

const token = jwt.sign({ password: plainPassword }, JWT_SECRET);

console.log(token);
