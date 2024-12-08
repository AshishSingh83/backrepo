const tokenService = require("../services/token_service");
module.exports = async function (req, res, next) {
  // try {
  //   //cookie getting automattically in every request
  //   const { accessToken } = req.cookies;
  //   if (!accessToken) {
  //     throw new Error();
  //   }
  //   const userData = await tokenService.verifyAccessToken(accessToken);
  //   if (!userData) {
  //     throw new Error();
  //   }
  //   req.user = userData;
  //   next();
  // } catch (err) {
  //   res.status(401).json({ message: "yahi dikkat hai bhaiya Invalid token" });
  // }
  try {
  const userData = await tokenService.verifyAccessToken(accessToken);
  if (!userData) {
    throw new Error("Token verification failed.");
  }
  req.user = userData;
  next();
} catch (err) {
  if (err.message === "jwt expired") {
    return res.status(401).json({ message: "Token expired. Please log in again." });
  }
  console.error("Token validation error:", err.message);
  res.status(401).json({ message: "Invalid token." });
}
};
