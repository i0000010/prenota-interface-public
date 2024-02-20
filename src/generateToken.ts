import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_SUBJECT } from "./config.js";

const generateToken = () => {
  const token = jwt.sign({ sub: JWT_SUBJECT }, JWT_SECRET);
  return token;
};

const token = generateToken();
console.log(token);
