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
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const isDev = process.env.NODE_ENV !== "production";

  console.error(`[ERROR] ${req.method} ${req.url}:`, err);

  res.status(500).render("features/error/error", {
    message:
      isDev
        ? `${err.message}\n\n${err.stack}`
        : "An error occurred",
  });
}

export default router;
