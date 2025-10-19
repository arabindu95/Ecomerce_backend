import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      message: "unAuthorized",
      error: true,
      success: false,
    });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECREET_KEY);
    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
    } else {
      return res.status(400).json({
        message: "unAuthorized to",
        success: false,
        error: true,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default authUser;
