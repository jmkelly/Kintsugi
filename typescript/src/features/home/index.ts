import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.render("features/home/home");
});

export default router;
