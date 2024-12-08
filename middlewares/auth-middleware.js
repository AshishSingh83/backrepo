const tokenService = require("../services/token_service");
module.exports = async function (req, res, next) {
  try {
    //cookie getting automattically in every request
    const { accessToken } = req.cookies;
    if (!accessToken) {
      // throw new Error();
      res.status(410).json({ message:"error no 410 boy",token:accessToken });
    }
    const userData = await tokenService.verifyAccessToken(accessToken);
    if (!userData) {
      // throw new Error();
      res.status(411).json({ message:"error no 411 boy"  });
    }
    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ message:accessToken });
  }
};
