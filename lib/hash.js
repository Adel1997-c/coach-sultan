// lib/hash.js
import bcrypt from "bcryptjs";

export const hashPassword = async (plainText) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainText, salt);
};

export const verifyPassword = async (plainText, hash) => {
  return await bcrypt.compare(plainText, hash);
};
