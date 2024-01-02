import { verify } from "jsonwebtoken";

export function jwtExtract(token, secretKey) {
  const payload = verify(token, secretKey);
  return payload;
}
