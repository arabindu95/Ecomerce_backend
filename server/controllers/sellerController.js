import jwt from "jsonwebtoken";

// seller Login : /api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECREET_KEY, {
        expiresIn: "7d",
      });

      const cookieOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("sellerToken", token, cookieOption);
      return res.status(200).json({
        message: "login successfully",
        success: true,
        error: false,
      });
    } else {
      return res.json({
        message: " invalid credintials",
        success: false,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//--------- Seller auth : /api/seller/is_auth--------
export const isSellerAuth = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//--------- Seller LogOut : /api/seller/logout--------
export const sellerlogout = async (req, res) => {
  try {
    const cookieOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      samesite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    res.clearCookie("sellerToken", cookieOption);

    return res.status(200).json({
      message: "you are successfully logout",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
