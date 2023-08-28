import { Router } from "express"
import { create, destroy, get, update } from "../controller/controller"


const router: Router = Router();

router.post("/product", create);
router.get("/product", get);
router.get("/product/:productId", get);
router.put("/product/:productId", update);
router.delete("/product/:productId", destroy);

export default router;
