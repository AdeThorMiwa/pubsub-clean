import { Router } from "express"
import { subscribe } from "../../adapters/controllers/subscribe.controller"

const router = Router();

router.route("/:topic").post(subscribe)

export default router;