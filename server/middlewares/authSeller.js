import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  if (!sellerToken) {
    return res.status(401).json({
      message: "unAuthorized",
      success: false,
      error: true,
    });
  }
  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECREET_KEY);
    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      return next();
    } else {
      return res.status(400).json({
        message: "unAuthorized to",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default authSeller;
