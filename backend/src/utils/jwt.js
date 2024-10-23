import jwt from "jsonwebtoken";
import _ from "lodash";
import Session from "../modules/sessionModule.js";

export const signJwt = async (object, keyName, options) => {
  const privateKey =
    keyName === "accessTokenPrivateKey"
      ? process.env.ACCESS_TOKEN_PRIVATE_KEY
      : process.env.REFRESH_TOKEN_PRIVATE_KEY;

  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = (token, keyName) => {
  try {
    const publicKey =
      keyName === "accessTokenPublicKey"
        ? process.env.ACCESS_TOKEN_PUBLIC_KEY
        : process.env.REFRESH_TOKEN_PUBLIC_KEY;
    return jwt.verify(token, publicKey);
  } catch (e) {
    return null;
  }
};

export const signRefreshToken = async (id) => {
  const session = await Session.create({ user: id });
  const refreshToken = await signJwt(
    { session: session.id },
    "refreshTokenPrivateKey",
    { expiresIn: "1y" },
  );

  return refreshToken;
};

export const signAccessToken = async (user, privateFields) => {
  const userJsonObject = _.omit(user.toJSON(), privateFields);

  const accessToken = await signJwt(userJsonObject, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });

  return accessToken;
};
