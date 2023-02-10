import { Router } from "express";

import urlRouter from "./urlRouter";

const router = Router();

//all the routes here will use previs /api e.g /url will be /api/url

router.use("/url", urlRouter);

export default router;
