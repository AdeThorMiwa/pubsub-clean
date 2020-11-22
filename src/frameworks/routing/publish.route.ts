import { Router } from "express"
import { publish } from "../../adapters/controllers/publish.controller";

const router = Router();

router.route("/:topic").post(publish)

export default router;