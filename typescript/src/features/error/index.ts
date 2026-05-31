import { Router } from "express";
import type { Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.status(404).render("features/error/error", {
    message: "Page not found",
  });
});

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err.stack);
  res.status(500).render("features/error/error", {
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "An error occurred",
  });
}

export default router;
