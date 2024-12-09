// const tokenService = require("../services/token_service");
// module.exports = async function (req, res, next) {
//   try {
//     //cookie getting automattically in every request
//     if (! req.cookies.accessToken) {
//       // throw new Error();
//       res.status(410).json({ message:"410 code error" });
//     }
//     const { accessToken } = req.cookies;
//     const userData = await tokenService.verifyAccessToken(accessToken);
//     if (!userData) {
//       // throw new Error();
//       res.status(411).json({ message:"error no 411 boy"  });
//     }
//     req.user = userData;
//     next();
//   } catch (err) {
//     res.status(401).json({ message:accessToken });
//   }
// };
const tokenService = require("../services/token_service");
module.exports = async function (req, res, next) {
  try {
    // Token can be in cookies, headers, or body
    const accessToken = req.body.accessToken || req.cookies?.accessToken || req.headers['authorization']?.split(' ')[1];

    if (!accessToken) {
      console.error("Access token is missing");
      return res.status(401).json({ message: "Access token is missing" });
    }

    let userData;
    try {
      userData = await tokenService.verifyAccessToken(accessToken);
    } catch (e) {
      console.error("Token verification failed:", e.message);
      return res.status(401).json({ message: "Token verification failed" });
    }

    if (!userData) {
      console.error("Invalid token payload");
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = userData; // Attach user data to the request
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    console.error("Error in authentication middleware:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
