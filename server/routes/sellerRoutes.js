import express from "express";

import {
  sellerLogin,
  isSellerAuth,
  sellerlogout,
} from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";

const SellerRouter = express.Router();

SellerRouter.post("/login", sellerLogin);
SellerRouter.get("/is-auth", authSeller, isSellerAuth);
SellerRouter.post("/logout", sellerlogout);

export default SellerRouter;
