import { Router } from "express"
import { get, create, update } from "../controller/orderController"

const router: Router = Router()

router.get("/order", get)
router.get("/order/:orderId", get)
router.post("/order", create)
router.put("/order/:orderId", update)

export default router
