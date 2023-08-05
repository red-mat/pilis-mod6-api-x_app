import { Router } from "express"
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/controller"


const router: Router = Router()

router.post("/product", createProduct)
router.get("/product", getProduct)
router.get("/product/:productId", getProduct)
router.put("/product/:productId", updateProduct)
router.delete("/product/:productId", deleteProduct)

export default router
