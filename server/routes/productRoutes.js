import express from "express";
import { upload } from "../config/multer.js";
import authSeller from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from "../controllers/productController.js";
const productRoutes = express.Router();

productRoutes.post("/add", upload.array(["images"]), authSeller, addProduct);
productRoutes.get("/list", productList);
productRoutes.get("/id", productById);
productRoutes.post("/stock", authSeller, changeStock);

export default productRoutes;
